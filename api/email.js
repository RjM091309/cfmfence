/**
 * Simple Node API for sending contact form emails.
 * Run: node api/email.js
 * Env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL (see .env.example)
 */

import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import mysql from 'mysql2/promise';

const app = express();
const upload = multer(); // in-memory for multipart form

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS – allow frontend (e.g. Vite on port 2800)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const requiredEnv = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'TO_EMAIL'];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.warn(`Warning: ${key} is not set. Email may fail.`);
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// MySQL pool for leads / reviews storage
let dbPool = null;
if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME) {
  dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
  });

  // Test connection once on startup and ensure base tables exist
  (async () => {
    try {
      const conn = await dbPool.getConnection();
      await conn.ping();

      const leadsSql = `
        CREATE TABLE IF NOT EXISTS leads (
          id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          service VARCHAR(255) NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `;

      const reviewsSql = `
        CREATE TABLE IF NOT EXISTS reviews (
          id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          company VARCHAR(255) NULL,
          rating TINYINT UNSIGNED NOT NULL,
          message TEXT NOT NULL,
          source VARCHAR(100) NULL,
          approved TINYINT(1) NOT NULL DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `;

      await conn.query(leadsSql);
      await conn.query(reviewsSql);

      // In case the reviews table already exists from an older version without company column
      try {
        await conn.query('ALTER TABLE reviews ADD COLUMN company VARCHAR(255) NULL AFTER name');
      } catch {
        // ignore if column already exists
      }

      conn.release();
      console.log(
        `MySQL connected: ${process.env.DB_HOST}:${process.env.DB_PORT || '3306'} / ${process.env.DB_NAME}`,
      );
    } catch (err) {
      console.error('MySQL connection test failed; DB-backed features will not be available.', err);
    }
  })();
} else {
  console.warn('MySQL env vars not fully set; leads / reviews will not be saved to DB.');
}

function getBody(req) {
  return {
    name: (req.body?.name || '').trim(),
    email: (req.body?.email || '').trim(),
    service: (req.body?.service || '').trim(),
    message: (req.body?.message || '').trim(),
  };
}

function escapeHtml(s) {
  if (typeof s !== 'string') return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateEmailHtml({ subject, name, email, service, message }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>${subject}</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f3f4f6;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #1A1C1F;
        }
        .wrapper {
          width: 100%;
          background-color: #f3f4f6;
          padding: 40px 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .header {
          padding: 32px;
          background: #ffffff;
          border-bottom: 4px solid #FF6A2A;
          text-align: center;
        }
        .brand {
          display: inline-block;
        }
        .logo {
          display: block;
          height: 60px;
          margin: 0 auto;
        }
        .logo img {
          display: block;
          height: 60px;
          width: auto;
        }
        .content {
          padding: 40px 32px;
        }
        .title {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #111827;
          margin: 0 0 12px;
          line-height: 1.2;
        }
        .subtitle {
          font-size: 16px;
          color: #4B5563;
          margin: 0 0 32px;
          line-height: 1.5;
        }
        .panel {
          border: 1px solid rgba(17,24,39,0.08);
          border-left: 4px solid #FF6A2A;
          padding: 24px;
          margin-bottom: 32px;
          background-color: #F9FAFB;
          border-radius: 0 4px 4px 0;
        }
        .row-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6B7280;
          margin-bottom: 4px;
        }
        .row-value {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 16px;
        }
        .row-value:last-child {
          margin-bottom: 0;
        }
        .message-section {
          margin-top: 32px;
        }
        .message-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6B7280;
          margin-bottom: 12px;
        }
        .message-body {
          font-size: 15px;
          line-height: 1.6;
          color: #374151;
          white-space: pre-wrap;
          background: #ffffff;
          padding: 20px;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
        }
        .footer {
          padding: 32px;
          border-top: 1px solid #F3F4F6;
          background-color: #F9FAFB;
          text-align: center;
        }
        .footer-strong {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 12px;
          color: #111827;
          margin-bottom: 8px;
        }
        .footer-text {
          font-size: 12px;
          color: #6B7280;
          line-height: 1.8;
        }
        .cta-button {
          display: inline-block;
          background-color: #FF6A2A;
          color: #ffffff !important;
          padding: 14px 28px;
          text-decoration: none !important;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 4px;
          margin-top: 24px;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <div class="brand">
              <span class="logo">
                <img src="cid:cfm-logo" alt="CFM Fence Solutions logo" />
              </span>
            </div>
          </div>
          <div class="content">
            <h1 class="title">New Quote Request</h1>
            <p class="subtitle">
              A new fencing project request was submitted from your website contact form. Here are the details:
            </p>

            <div class="panel">
              <div class="row-label">Client Name</div>
              <div class="row-value">${name}</div>

              <div class="row-label">Email Address</div>
              <div class="row-value">${email}</div>

              <div class="row-label">Service Requested</div>
              <div class="row-value">${service || 'Not specified'}</div>
            </div>

            <div class="message-section">
              <div class="message-label">Project Details</div>
              <div class="message-body">${message.replace(/\n/g, '<br />')}</div>
            </div>
            
            <div style="text-align: center;">
              <a href="mailto:${email}" class="cta-button">Reply to Client</a>
            </div>
          </div>
          <div class="footer">
            <div class="footer-strong">CFM Fence Solutions</div>
            <div class="footer-text">
              Leominster, MA<br />
              cfmfencesolutions@gmail.com · 978-490-5447
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
}

app.post('/api/contact', upload.none(), (req, res) => {
  const { name, email, service, message } = getBody(req);

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: 'Missing required fields (name, email, message)',
    });
  }

  const subject = 'New quote request from CFM Fence website';

  // Plain-text fallback
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service || '(not specified)'}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const logoPath = path.resolve(process.cwd(), 'public/images/logo.png');

  const mailOptions = {
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: process.env.TO_EMAIL,
    replyTo: email,
    subject,
    text,
    html: generateEmailHtml({ subject, name, email, service, message }),
    attachments: [
      {
        filename: 'logo.png',
        path: logoPath,
        cid: 'cfm-logo',
      },
    ],
  };

  // Save lead into MySQL (if configured)
  const saveLeadPromise =
    dbPool &&
    (async () => {
      try {
        const createSql = `
          CREATE TABLE IF NOT EXISTS leads (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            service VARCHAR(255) NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        await dbPool.query(createSql);
        await dbPool.query(
          'INSERT INTO leads (name, email, service, message) VALUES (?, ?, ?, ?)',
          [name, email, service || null, message],
        );
      } catch (err) {
        console.error('Error saving lead to MySQL:', err);
      }
    })();

  Promise.resolve(saveLeadPromise)
    .catch((err) => {
      console.error('Unexpected error in lead save promise:', err);
    })
    .finally(() => {
      transporter
        .sendMail(mailOptions)
        .then(() => {
          res.json({ ok: true });
        })
        .catch((err) => {
          console.error('Email error:', err);
          res.status(500).json({
            ok: false,
            error: 'Failed to send email',
          });
        });
    });
});

// Submit a client review (stored as pending approval)
app.post('/api/reviews', upload.none(), async (req, res) => {
  if (!dbPool) {
    return res.status(500).json({ ok: false, error: 'Database not configured' });
  }

  const name = (req.body?.name || '').trim();
  const company = (req.body?.company || '').trim();
  const message = (req.body?.message || '').trim();
  const ratingRaw = req.body?.rating;
  const rating = Number(ratingRaw);

  if (!name || !message || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({
      ok: false,
      error: 'Missing or invalid fields (name, rating 1-5, message)',
    });
  }

  try {
    const [result] = await dbPool.query(
      'INSERT INTO reviews (name, company, rating, message, source, approved) VALUES (?, ?, ?, ?, ?, 0)',
      [name, company || null, rating, message, 'website'],
    );

    const reviewId = result.insertId;

    const subject = 'New review – approve to show on your website';

    const baseUrl = (process.env.APP_BASE_URL || '').replace(/\/$/, '');
    const adminKey = process.env.REVIEW_ADMIN_KEY || '';
    const canUseLink = Boolean(baseUrl && adminKey);
    const approveUrl = canUseLink
      ? `${baseUrl}/api/reviews/approve?id=${reviewId}&key=${encodeURIComponent(adminKey)}`
      : '';

    const text = [
      'A new review was submitted on the CFM Fence Solutions website.',
      '',
      `From: ${name}${company ? ` (${company})` : ''}`,
      `Rating: ${rating}/5`,
      '',
      'Message:',
      message,
      '',
      canUseLink
        ? 'To publish this review on your website, open this link in your browser:'
        : 'To publish this review, set APP_BASE_URL and REVIEW_ADMIN_KEY in your server .env, then use the link in the HTML version of this email.',
      canUseLink ? approveUrl : '',
    ].filter(Boolean).join('\n');

    const html = [
      '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>',
      'body{font-family:system-ui,sans-serif;color:#111;background:#f5f5f5;margin:0;padding:24px;}',
      '.box{max-width:520px;margin:0 auto;background:#fff;border-radius:8px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);}',
      'h1{font-size:18px;margin:0 0 16px;color:#111;}',
      '.row{margin-bottom:12px;}.label{font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#666;}',
      '.value{font-size:15px;font-weight:600;}',
      '.msg{border-left:4px solid #FF6A2A;background:#f9fafb;padding:16px;margin:20px 0;border-radius:0 6px 6px 0;}',
      '.cta{margin-top:24px;text-align:center;}',
      '.btn{display:inline-block;background:#FF6A2A;color:#fff!important;padding:14px 28px;text-decoration:none!important;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:0.05em;border-radius:6px;}',
      '.note{font-size:12px;color:#666;margin-top:16px;}',
      '</style></head><body><div class="box">',
      '<h1>New review submitted</h1>',
      '<p style="margin:0 0 20px;">Someone left a review on your site. Approve it to show it on your website.</p>',
      `<div class="row"><span class="label">Name</span><div class="value">${escapeHtml(name)}${company ? ` · ${escapeHtml(company)}` : ''}</div></div>`,
      `<div class="row"><span class="label">Rating</span><div class="value">${rating}/5</div></div>`,
      `<div class="msg">${escapeHtml(message).replace(/\n/g, '<br>')}</div>`,
      canUseLink
        ? `<div class="cta"><a href="${approveUrl}" class="btn">Approve &amp; publish on website</a></div><p class="note">This link approves the review once. Do not share it publicly.</p>`
        : '<p class="note">Configure APP_BASE_URL and REVIEW_ADMIN_KEY on your server to get an approve button in this email.</p>',
      '</div></body></html>',
    ].join('');

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      subject,
      text,
      html,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(500).json({ ok: false, error: 'Failed to save review' });
  }
});

// Public endpoint: list approved reviews for frontend
app.get('/api/reviews', async (req, res) => {
  if (!dbPool) {
    return res.status(500).json({ ok: false, error: 'Database not configured' });
  }

  try {
    const [rows] = await dbPool.query(
      'SELECT id, name, company, rating, message, created_at FROM reviews WHERE approved = 1 ORDER BY created_at DESC LIMIT 20',
    );
    res.json({ ok: true, reviews: rows });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ ok: false, error: 'Failed to load reviews' });
  }
});

// Admin endpoint: approve a review via emailed link
app.get('/api/reviews/approve', async (req, res) => {
  if (!dbPool) {
    return res.status(500).send('Database not configured.');
  }

  const key = typeof req.query.key === 'string' ? req.query.key : '';
  const idParam = typeof req.query.id === 'string' ? req.query.id : '';
  const id = Number(idParam);

  if (!process.env.REVIEW_ADMIN_KEY || key !== process.env.REVIEW_ADMIN_KEY) {
    return res.status(403).send('Invalid approval link.');
  }

  if (!id || !Number.isFinite(id)) {
    return res.status(400).send('Invalid review id.');
  }

  try {
    const [result] = await dbPool.query('UPDATE reviews SET approved = 1 WHERE id = ?', [id]);

    // @ts-ignore - mysql2 result shape
    if (result.affectedRows === 0) {
      return res.status(404).send('Review not found.');
    }

    res.send('Review approved and will now appear on the website.');
  } catch (err) {
    console.error('Error approving review:', err);
    res.status(500).send('Failed to approve review.');
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Email API running at http://localhost:${PORT}`);
});
