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
      firstName,
      lastName,
      email,
      phone,
      companyName,
      productName,
      productUrl,
    } = request.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !companyName || !productName || !productUrl) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({ error: 'Invalid email format' });
    }

    // Prepare lead data
    const leadData = {
      timestamp: new Date().toISOString(),
      firstName,
      lastName,
      email,
      phone: phone || null,
      companyName,
      productName,
      productUrl,
    };

    // Log lead data (always log for visibility in Vercel logs)
    console.log('=== NEW PRODUCT INTEREST LEAD ===');
    console.log(JSON.stringify(leadData, null, 2));
    console.log('==================================');

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

        const emailSubject = `Product Interest: ${productName} - ${firstName} ${lastName}`;
        
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #DC5F12;">New Product Interest Submission</h2>
            
            <div style="background-color: #f6f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2F7DB0; margin-top: 0;">Product Information</h3>
              <p><strong>Product Name:</strong> ${productName}</p>
              <p><strong>Product URL:</strong> <a href="${productUrl}" target="_blank">${productUrl}</a></p>
            </div>
            
            <div style="background-color: #f6f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2F7DB0; margin-top: 0;">Contact Information</h3>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              <p><strong>Company:</strong> ${companyName}</p>
            </div>

            <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2F7DB0;">
              <p style="margin: 0; color: #2F7DB0;"><strong>Action:</strong> This user has shown interest in ${productName} and has been redirected to the product page.</p>
            </div>
          </div>
        `;

        const emailText = `
New Product Interest Submission

Product Information:
- Product Name: ${productName}
- Product URL: ${productUrl}

Contact Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
${phone ? `- Phone: ${phone}` : ''}
- Company: ${companyName}

Action: This user has shown interest in ${productName} and has been redirected to the product page.
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
      console.warn('SMTP not configured - email not sent. Lead logged to console only.');
    }

    // Send to webhook if configured (for Zapier, Make.com, etc.)
    if (process.env.WEBHOOK_URL) {
      try {
        await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadData),
        });
        console.log('Webhook notification sent');
      } catch (webhookError: any) {
        console.error('Failed to send webhook:', webhookError);
        // Continue execution even if webhook fails
      }
    }

    return response.status(200).json({ 
      success: true, 
      message: 'Interest submitted successfully',
      emailSent,
      note: emailSent 
        ? 'Lead has been sent via email' 
        : 'Lead has been logged. Check Vercel logs or configure SMTP/WEBHOOK_URL to receive notifications'
    });

  } catch (error: any) {
    console.error('Error submitting product interest:', error);
    return response.status(500).json({ 
      error: 'Failed to submit interest',
      message: error.message 
    });
  }
}
