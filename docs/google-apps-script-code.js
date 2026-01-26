/**
 * Google Apps Script Webhook Handler for LuxCity Tool Submissions
 * 
 * This script receives POST requests from the tool submission API
 * and writes the data to a Google Sheet.
 * 
 * Setup Instructions:
 * 1. Create a Google Sheet with headers in Row 1
 * 2. Copy this script to Apps Script (Extensions → Apps Script)
 * 3. Replace 'YOUR_SHEET_ID' with your actual Sheet ID
 * 4. Deploy as Web App with "Anyone" access
 * 5. Copy the Web App URL to Vercel environment variable TOOL_WEBHOOK_URL
 */

// Replace this with your Google Sheet ID (found in the URL)
const SHEET_ID = 'YOUR_SHEET_ID';
const SHEET_NAME = 'Sheet1'; // Change if your sheet has a different name

/**
 * Main function to handle POST requests
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.date || new Date().toLocaleDateString('en-GB'),
      data.time || new Date().toLocaleTimeString('en-GB'),
      data.name || '',
      data.email || '',
      data.company || '',
      data.role || '',
      data.toolName || '',
    ];
    
    // Add tool-specific data based on tool name
    if (data.toolName === 'AI Readiness Assessment' && data.toolData) {
      const td = data.toolData;
      rowData.push(
        td.growthStage || '',
        td.capabilities?.technology || '',
        td.capabilities?.data || '',
        td.capabilities?.team || '',
        td.capabilities?.budget || '',
        td.avgScore || '',
        td.readinessLevel || ''
      );
      // Add empty cells for other tool columns
      rowData.push('', '', '', '', '');
    } else if (data.toolName === 'Regulatory Compliance Checker' && data.toolData) {
      const td = data.toolData;
      // Add empty cells for AI Readiness columns
      rowData.push('', '', '', '', '', '', '');
      rowData.push(
        td.propertyType || '',
        td.complianceScore || '',
        td.mustHavesCompleted || '',
        td.mustHavesTotal || ''
      );
      // Add empty cells for ROI columns
      rowData.push('', '');
    } else if (data.toolName === 'ROI Calculator Suite' && data.toolData) {
      const td = data.toolData;
      // Add empty cells for AI Readiness columns
      rowData.push('', '', '', '', '', '', '');
      // Add empty cells for Compliance columns
      rowData.push('', '', '', '');
      rowData.push(
        td.selectedScenarios?.join(', ') || '',
        td.topScenario?.name || ''
      );
    } else {
      // Unknown tool - add empty cells for all tool-specific columns
      rowData.push('', '', '', '', '', '', '', '', '', '', '');
    }
    
    // Add the raw tool data as JSON (useful for debugging and detailed analysis)
    rowData.push(JSON.stringify(data.toolData || {}));
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Data saved successfully' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error and return error response
    console.error('Error processing webhook:', error);
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString(),
        message: 'Failed to save data'
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Function to handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ 
      message: 'LuxCity Tool Submissions Webhook is active',
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional: Function to set up the sheet headers (run once)
 * Uncomment and run this function once to set up your sheet headers
 */
/*
function setupSheetHeaders() {
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
    'Growth Stage',
    'Technology Score',
    'Data Score',
    'Team Score',
    'Budget Score',
    'Avg Score',
    'Readiness Level',
    'Property Type',
    'Compliance Score',
    'Must Haves Completed',
    'Must Haves Total',
    'Selected Scenarios',
    'Top Scenario',
    'Tool Data (JSON)'
  ];
  
  // Clear existing headers and set new ones
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  Logger.log('Sheet headers set up successfully!');
}
*/
