/**
 * Intellix API Service Client
 * Handles communication with backend server for document analysis and health checks.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Upload a business plan document and run AI diagnostic audit
 * @param {File} file - Browser File object
 * @param {Function} onProgress - Optional callback for simulated/actual progress
 * @returns {Promise<Object>} The parsed audit plan matching sample schema
 */
export async function uploadAndAnalyzePlan(file, onProgress) {
  const formData = new FormData();
  formData.append('file', file);

  if (onProgress) onProgress(20, "Uploading document to diagnostic core...");

  try {
    const response = await fetch(`${API_BASE_URL}/audit`, {
      method: 'POST',
      body: formData,
    });

    if (onProgress) onProgress(75, "Structuring institutional scorecard...");

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.error || `Server responded with status ${response.status}`);
    }

    if (onProgress) onProgress(100, "Audit completed successfully!");
    return json.data;
  } catch (error) {
    console.error('[API uploadAndAnalyzePlan error]:', error);
    throw error;
  }
}

/**
 * Check backend health & Ollama connection status
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (res.ok) {
      return await res.json();
    }
    return { status: 'offline', error: `HTTP ${res.status}` };
  } catch (err) {
    return { status: 'offline', error: err.message };
  }
}
