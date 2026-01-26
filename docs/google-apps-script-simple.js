/**
 * SIMPLIFIED Google Apps Script - Easier Setup Version
 * 
 * This version writes all data in a simpler format - one column per field
 * No need to worry about different tool types
 */

const SHEET_ID = 'YOUR_SHEET_ID'; // Replace with your Sheet ID
const SHEET_NAME = 'Sheet1'; // Change if needed

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Simple row with all data flattened
    const rowData = [
      new Date().toISOString(), // Timestamp
      data.date || '',
      data.time || '',
      data.name || '',
      data.email || '',
      data.company || '',
      data.role || '',
      data.toolName || '',
      JSON.stringify(data.toolData || {}) // All tool data as JSON
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ message: 'Webhook active', timestamp: new Date().toISOString() })
  ).setMimeType(ContentService.MimeType.JSON);
}

// Run this once to set up headers
function setupHeaders() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const headers = [
    'Timestamp',
    'Date',
    'Time',
    'Name',
    'Email',
    'Company',
    'Role',
    'Tool Name',
    'Tool Data (JSON)'
  ];
  
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}
