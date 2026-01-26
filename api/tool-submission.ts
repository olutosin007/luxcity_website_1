import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      company,
      role,
      toolName,
      toolData, // Additional data from the tool (e.g., scores, selections)
    } = request.body;

    // Validate required fields
    if (!name || !email || !company || !role || !toolName) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({ error: 'Invalid email format' });
    }

    // Prepare submission data
    const submissionData = {
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-GB'),
      time: new Date().toLocaleTimeString('en-GB'),
      name,
      email,
      company,
      role,
      toolName,
      toolData: toolData || {}, // Additional tool-specific data
    };

    // Log submission data (always log for visibility in Vercel logs)
    console.log('=== NEW TOOL SUBMISSION ===');
    console.log(JSON.stringify(submissionData, null, 2));
    console.log('===========================');

    // Try to send email if SMTP is configured
    let emailSent = false;
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    if (smtpConfig.auth.user && smtpConfig.auth.pass) {
      try {
        const transporter = nodemailer.createTransport(smtpConfig);

        const emailSubject = `Tool Submission: ${toolName} - ${name}`;
        
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #DC5F12;">New Tool Submission</h2>
            
            <div style="background-color: #f6f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2F7DB0; margin-top: 0;">Tool Information</h3>
              <p><strong>Tool Name:</strong> ${toolName}</p>
              <p><strong>Submitted:</strong> ${submissionData.date} at ${submissionData.time}</p>
            </div>
            
            <div style="background-color: #f6f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2F7DB0; margin-top: 0;">Contact Information</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Role:</strong> ${role}</p>
            </div>

            ${toolData && Object.keys(toolData).length > 0 ? `
            <div style="background-color: #f6f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2F7DB0; margin-top: 0;">Tool Results</h3>
              <pre style="background: white; padding: 10px; border-radius: 4px; overflow-x: auto;">${JSON.stringify(toolData, null, 2)}</pre>
            </div>
            ` : ''}
          </div>
        `;

        const emailText = `
New Tool Submission

Tool Information:
- Tool Name: ${toolName}
- Submitted: ${submissionData.date} at ${submissionData.time}

Contact Information:
- Name: ${name}
- Email: ${email}
- Company: ${company}
- Role: ${role}

${toolData && Object.keys(toolData).length > 0 ? `Tool Results:\n${JSON.stringify(toolData, null, 2)}` : ''}
        `;

        const mailOptions = {
          from: process.env.SMTP_FROM_EMAIL || smtpConfig.auth.user,
          to: process.env.SMTP_FROM_EMAIL || smtpConfig.auth.user,
          replyTo: email,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log('Email sent successfully');
      } catch (emailError: any) {
        console.error('Failed to send email:', emailError);
        // Continue execution even if email fails
      }
    } else {
      console.warn('SMTP not configured - email not sent. Submission logged to console only.');
    }

    // Send to webhook if configured (for Zapier, Make.com, Google Sheets, etc.)
    if (process.env.TOOL_WEBHOOK_URL || process.env.WEBHOOK_URL) {
      const webhookUrl = process.env.TOOL_WEBHOOK_URL || process.env.WEBHOOK_URL;
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        });
        
        if (webhookResponse.ok) {
          console.log('Webhook notification sent successfully');
        } else {
          console.warn('Webhook returned non-OK status:', webhookResponse.status);
        }
      } catch (webhookError: any) {
        console.error('Failed to send webhook:', webhookError);
        // Continue execution even if webhook fails
      }
    } else {
      console.warn('WEBHOOK_URL or TOOL_WEBHOOK_URL not configured - webhook not sent.');
    }

    return response.status(200).json({ 
      success: true, 
      message: 'Submission received successfully',
      emailSent,
      note: emailSent 
        ? 'Submission has been sent via email and webhook (if configured)' 
        : 'Submission has been logged. Check Vercel logs or configure SMTP/WEBHOOK_URL to receive notifications'
    });

  } catch (error: any) {
    console.error('Error processing tool submission:', error);
    return response.status(500).json({ 
      error: 'Failed to process submission',
      message: error.message 
    });
  }
}
