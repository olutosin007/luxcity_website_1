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

    // Get SMTP credentials from environment variables
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
      return response.status(500).json({ error: 'Email service not configured' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport(smtpConfig);

    // Format the email content
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

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || smtpConfig.auth.user,
      to: process.env.SMTP_FROM_EMAIL || smtpConfig.auth.user, // Send to the same email address
      replyTo: email, // Allow replying directly to the user
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return response.status(200).json({ 
      success: true, 
      message: 'Interest submitted successfully' 
    });

  } catch (error: any) {
    console.error('Error submitting product interest:', error);
    return response.status(500).json({ 
      error: 'Failed to submit interest',
      message: error.message 
    });
  }
}
