const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { extractText } = require('../services/fileParser');
const { analyzeBusinessPlan } = require('../services/auditEngine');
const { buildAuditResponse } = require('../services/schemaBuilder');

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// File filter for supported file types
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt', '.pptx', '.ppt'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type "${ext}". Supported formats: PDF, DOCX, DOC, TXT, PPT, PPTX`));
  }
};

const maxSizeBytes = (parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 25) * 1024 * 1024;

const upload = multer({
  storage,
  limits: { fileSize: maxSizeBytes },
  fileFilter
});

/**
 * POST /api/audit
 * Receives file upload, parses text, analyzes across 8 pillars, returns schema-compliant response
 */
router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded. Please upload a business plan document (PDF, DOCX, TXT, PPT).'
      });
    }

    const { path: filePath, originalname: originalName, size } = req.file;
    const sizeMB = (size / (1024 * 1024)).toFixed(1);

    console.log(`[Audit API] Processing file: ${originalName} (${sizeMB} MB)`);

    // 1. Extract text from uploaded document
    const extraction = await extractText(filePath, originalName);
    console.log(`[Audit API] Extracted ${extraction.text?.length || 0} characters across ~${extraction.pages || 1} pages`);

    // 2. Perform business plan analysis (Audit Engine with stub for Ollama qwen3.2)
    const rawAnalysis = await analyzeBusinessPlan(extraction.text || '', originalName, extraction.pages || 1);
    rawAnalysis.fileSize = `${sizeMB} MB`;

    // 3. Normalize into frontend-compatible schema
    const responseData = buildAuditResponse(rawAnalysis);

    // Clean up uploaded file asynchronously
    fs.unlink(filePath, (err) => {
      if (err) console.warn(`[Audit API] Failed to delete temp file: ${filePath}`, err);
    });

    return res.status(200).json({
      success: true,
      message: 'Business plan audit completed successfully.',
      data: responseData
    });
  } catch (error) {
    // If file exists and failed, clean it up
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, () => {});
    }
    console.error('[Audit API Error]:', error);
    next(error);
  }
});

module.exports = router;
