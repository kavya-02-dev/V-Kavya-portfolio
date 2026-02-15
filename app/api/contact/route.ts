import { NextRequest, NextResponse } from 'next/server';

// ─── Security Utilities ────────────────────────────────────────────────────────

/** Escape HTML to prevent XSS in email body */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Sanitize input — strip control chars, limit length */
function sanitize(input: string, maxLen: number): string {
  return input
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .trim()
    .slice(0, maxLen);
}

/** Validate email with RFC-5322-ish regex */
function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email);
}

/** Check for suspicious patterns (SQLi, XSS, command injection) */
function hasMaliciousPatterns(input: string): boolean {
  const patterns = [
    /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bEXEC\b|\bUNION\b)/i, // SQLi
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,  // XSS script tags
    /javascript:/gi,                           // JS protocol
    /on\w+\s*=/gi,                            // Event handlers
    /\$\{[\s\S]*?\}/g,                        // Template injection
    /\{\{[\s\S]*?\}\}/g,                      // Server-side template injection
    /\.\.\//g,                                // Path traversal
  ];
  return patterns.some((p) => p.test(input));
}

// ─── Simple in-memory rate limiter ─────────────────────────────────────────────
// For production, use Redis or Upstash
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 }); // 1 hour window
    return true;
  }

  if (limit.count >= 5) return false; // Max 5 per hour

  limit.count++;
  return true;
}

// ─── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // CORS — only allow from own domain
  const origin = req.headers.get('origin') || '';
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL || '',
    'http://localhost:3000',
  ];
  if (!allowedOrigins.some((o) => origin.startsWith(o))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  // Parse body safely
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Honeypot check — bots fill this field
  if (body.website && String(body.website).length > 0) {
    // Silently return 200 to bots so they think it worked
    return NextResponse.json({ success: true });
  }

  // Timing check — reject if submitted too fast (< 2 seconds since page load)
  const submittedAt = Number(body.submittedAt) || 0;
  if (Date.now() - submittedAt < 2000) {
    return NextResponse.json({ error: 'Submission too fast' }, { status: 429 });
  }

  // Extract & sanitize fields
  const rawName = sanitize(String(body.name || ''), 100);
  const rawEmail = sanitize(String(body.email || ''), 254);
  const rawMessage = sanitize(String(body.message || ''), 2000);
  const userMode = sanitize(String(body.userMode || 'unknown'), 20);

  // Validation
  if (!rawName || rawName.length < 2) {
    return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 422 });
  }
  if (!isValidEmail(rawEmail)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 422 });
  }
  if (rawMessage.length < 10) {
    return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 422 });
  }

  // Malicious pattern check
  if (
    hasMaliciousPatterns(rawName) ||
    hasMaliciousPatterns(rawEmail) ||
    hasMaliciousPatterns(rawMessage)
  ) {
    return NextResponse.json({ error: 'Invalid input detected' }, { status: 422 });
  }

  // Escape for HTML email
  const safeName = escapeHtml(rawName);
  const safeEmail = escapeHtml(rawEmail);
  const safeMessage = escapeHtml(rawMessage);
  const safeMode = escapeHtml(userMode);

  // Build HTML email
  const htmlEmail = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: 'Segoe UI', sans-serif; background: #0a0e17; color: #e2e8f0; padding: 40px; max-width: 600px; margin: auto; border-radius: 16px;">
  <div style="border: 1px solid rgba(0,245,212,0.2); border-radius: 16px; padding: 32px; background: #0d1424;">
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: #00f5d4; font-size: 24px; margin: 0;">📬 New Portfolio Message</h1>
      <p style="color: #64748b; font-size: 12px; font-family: monospace; margin-top: 8px;">kavya.dev — Portfolio Contact</p>
    </div>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em; width: 100px;">From</td>
        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #ffffff; font-weight: 600;">${safeName}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #00f5d4;">${safeEmail}</td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em;">Visitor Mode</td>
        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #ffd166;">${safeMode}</td>
      </tr>
    </table>
    <div style="margin-top: 24px; padding: 20px; background: rgba(0,245,212,0.05); border-left: 3px solid #00f5d4; border-radius: 8px;">
      <p style="color: #64748b; font-size: 11px; font-family: monospace; text-transform: uppercase; margin: 0 0 12px;">Message</p>
      <p style="color: #e2e8f0; line-height: 1.7; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
    </div>
    <div style="margin-top: 24px; padding: 16px; background: rgba(255,77,109,0.05); border-radius: 8px; font-family: monospace; font-size: 11px; color: #64748b;">
      <strong style="color: #ff4d6d;">Security Info</strong><br>
      IP: [hashed for privacy] · Mode: ${safeMode} · Time: ${new Date().toISOString()}
    </div>
  </div>
</body>
</html>`;

  // ── Send email via Resend ──────────────────────────────────────────────────
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured');
    // Still save to Supabase if email fails
    return NextResponse.json(
      { error: 'Email service not configured. Please email kavya0002u@gmail.com directly.' },
      { status: 500 }
    );
  }

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['kavya0002u@gmail.com'],
        reply_to: rawEmail,
        subject: `✨ New Message from ${safeName} — kavya.dev`,
        html: htmlEmail,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error('Resend error:', errText);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (err) {
    console.error('Email send failed:', err);
    return NextResponse.json({ error: 'Network error sending email' }, { status: 500 });
  }

  // ── Also save to Supabase ─────────────────────────────────────────────────
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/contact_messages`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: rawName,
          email: rawEmail,
          message: rawMessage,
          user_mode: userMode,
        }),
      });
    }
  } catch (err) {
    // Log but don't fail the request — email already sent
    console.warn('Supabase save failed:', err);
  }

  return NextResponse.json({ success: true });
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
