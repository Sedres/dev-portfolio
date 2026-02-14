// api/contact.js

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function isValidEmailAddress(emailAddress) {
  const normalizedEmailAddress = String(emailAddress || '').trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(normalizedEmailAddress)
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let rawBody = ''
    request.on('data', (chunk) => (rawBody += chunk))
    request.on('end', () => {
      try {
        resolve(JSON.parse(rawBody || '{}'))
      } catch (error) {
        reject(error)
      }
    })
  })
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const requestBody = await readJsonBody(request)

    // Honeypot: bots suelen rellenarlo
    const honeypotValue = String(requestBody.website || '').trim()
    if (honeypotValue.length > 0) {
      return response.status(200).json({ ok: true })
    }

    const name = String(requestBody.name || '').trim()
    const email = String(requestBody.email || '').trim()
    const subject = String(requestBody.subject || '').trim()
    const message = String(requestBody.message || '').trim()

    if (!isNonEmptyString(name) || name.length < 2) {
      return response.status(400).json({ ok: false, error: 'Invalid name' })
    }
    if (!isValidEmailAddress(email)) {
      return response.status(400).json({ ok: false, error: 'Invalid email' })
    }
    if (!isNonEmptyString(subject) || subject.length < 3) {
      return response.status(400).json({ ok: false, error: 'Invalid subject' })
    }
    if (!isNonEmptyString(message) || message.length < 10) {
      return response.status(400).json({ ok: false, error: 'Invalid message' })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const contactToEmail = process.env.CONTACT_TO_EMAIL
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL

    if (!resendApiKey || !contactToEmail || !contactFromEmail) {
      return response.status(500).json({ ok: false, error: 'Server not configured' })
    }

    const sentAtIsoString = new Date().toISOString()

    const emailHtml = `
  <div style="background:#0b0b0f;padding:32px 12px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
    <div style="max-width:680px;margin:0 auto;">

      <!-- Header -->
      <div style="padding:18px 20px;border-radius:16px;background:linear-gradient(135deg,#7c3aed 0%,#ec4899 50%,#22c55e 100%);">
        <div style="font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.92);font-weight:800;">
          Portfolio Contact
        </div>
        <div style="margin-top:6px;font-size:22px;color:#fff;font-weight:900;letter-spacing:-.02em;">
          New message received ✨
        </div>
      </div>

      <!-- Card -->
      <div style="margin-top:14px;background:#12121a;border:1px solid rgba(255,255,255,.08);border-radius:16px;overflow:hidden;">

        <!-- Meta -->
        <div style="padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.08);">
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
            ${pill('From', escapeHtml(name))}
            ${pill('Email', escapeHtml(email))}
            ${pill('Subject', escapeHtml(subject))}
          </div>

          <div style="font-size:12px;color:rgba(255,255,255,.55);">
            Received: <span style="color:rgba(255,255,255,.8);font-weight:700">${escapeHtml(sentAtIsoString)}</span>
          </div>
        </div>

        <!-- Message -->
        <div style="padding:18px 20px;">
          <div style="font-size:13px;color:rgba(255,255,255,.55);font-weight:800;letter-spacing:.12em;text-transform:uppercase;">
            Message
          </div>

          <div style="margin-top:10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 14px;color:rgba(255,255,255,.92);white-space:pre-wrap;line-height:1.6;">
            ${escapeHtml(message)}
          </div>

          <div style="margin-top:14px;font-size:12px;color:rgba(255,255,255,.6);">
            Tip: hit <strong>Reply</strong> to respond directly to the sender (Reply-To is set).
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="margin-top:12px;font-size:12px;color:rgba(255,255,255,.5);text-align:center;">
        Sent via your Vercel contact endpoint · Resend
      </div>
    </div>
  </div>
`

    function pill(label, value) {
      return `
    <div style="display:inline-flex;align-items:center;gap:8px;padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.10);">
      <span style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.55);font-weight:900;">
        ${escapeHtml(label)}
      </span>
      <span style="font-size:13px;color:rgba(255,255,255,.92);font-weight:800;">
        ${value}
      </span>
    </div>
  `
    }

    const providerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        replyTo: email,
        subject: `📩 Portfolio · ${subject}`,
        html: emailHtml,
      }),
    })

    if (!providerResponse.ok) {
      const errorBodyText = await providerResponse.text()
      console.error('Resend error:', errorBodyText)
      return response.status(502).json({ ok: false, error: 'Email provider error' })
    }

    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return response.status(500).json({ ok: false, error: 'Server error' })
  }
}
