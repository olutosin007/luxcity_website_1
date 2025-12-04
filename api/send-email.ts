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
      interest,
      timeline,
      message,
      howDidYouHear
    } = request.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !companyName || !interest || !timeline || !message || !howDidYouHear) {
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
    const emailSubject = `New Contact Form Submission from ${firstName} ${lastName}`;
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #DC5F12;">New Contact Form Submission</h2>
        
        <div style="background-color: #f6f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2F7DB0; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Company:</strong> ${companyName}</p>
        </div>

        <div style="background-color: #f6f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2F7DB0; margin-top: 0;">Enquiry Details</h3>
          <p><strong>Product Interest:</strong> ${interest}</p>
          <p><strong>Timeline:</strong> ${timeline}</p>
          <p><strong>How did you hear about us:</strong> ${howDidYouHear}</p>
        </div>

        <div style="background-color: #f6f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2F7DB0; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `;

    const emailText = `
New Contact Form Submission

Contact Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
${phone ? `- Phone: ${phone}` : ''}
- Company: ${companyName}

Enquiry Details:
- Product Interest: ${interest}
- Timeline: ${timeline}
- How did you hear about us: ${howDidYouHear}

Message:
${message}
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
      message: 'Email sent successfully' 
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    return response.status(500).json({ 
      error: 'Failed to send email',
      message: error.message 
    });
  }
}

