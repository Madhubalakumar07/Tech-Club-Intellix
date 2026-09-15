const fs = require('fs');
const path = require('path');

/**
 * Extracts plain text from an uploaded file based on its extension.
 * Supported: .pdf, .docx, .doc, .txt, .pptx, .ppt
 */
async function extractText(filePath, originalName) {
  const ext = path.extname(originalName).toLowerCase();

  switch (ext) {
    case '.pdf':
      return await extractPDF(filePath);
    case '.docx':
    case '.doc':
      return await extractDOCX(filePath);
    case '.txt':
      return await extractTXT(filePath);
    case '.pptx':
    case '.ppt':
      return await extractPPT(filePath);
    default:
      throw new Error(`Unsupported file type: ${ext}. Supported: pdf, docx, doc, txt, pptx, ppt`);
  }
}

async function extractPDF(filePath) {
  const pdfParse = require('pdf-parse');
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return {
    text: data.text,
    pages: data.numpages,
    info: data.info
  };
}

async function extractDOCX(filePath) {
  const mammoth = require('mammoth');
  const result = await mammoth.extractRawText({ path: filePath });
  // Estimate page count: ~350 words per page
  const wordCount = result.value.split(/\s+/).filter(Boolean).length;
  const pages = Math.max(1, Math.round(wordCount / 350));
  return {
    text: result.value,
    pages,
    info: { format: 'DOCX' }
  };
}

async function extractTXT(filePath) {
  const text = fs.readFileSync(filePath, 'utf-8');
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const pages = Math.max(1, Math.round(wordCount / 350));
  return {
    text,
    pages,
    info: { format: 'TXT' }
  };
}

async function extractPPT(filePath) {
  // Basic PPT text extraction — reads the raw file looking for text segments
  // For full PPT support, replace with 'node-pptx' or similar
  try {
    const raw = fs.readFileSync(filePath, 'latin1');
    // Extract readable ASCII strings (very basic heuristic)
    const text = raw
      .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
      .replace(/\s{3,}/g, '\n')
      .trim();
    return {
      text: text || '[PowerPoint content extracted — limited text support for .ppt/.pptx]',
      pages: 10,
      info: { format: 'PPT' }
    };
  } catch {
    return {
      text: '[Could not extract text from PowerPoint. Please convert to PDF for best results.]',
      pages: 1,
      info: { format: 'PPT' }
    };
  }
}

module.exports = { extractText };
