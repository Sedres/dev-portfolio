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

    // Honeypot (anti-bot)
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

    // =========================
    // EMAIL TEMPLATE (MINIMAL)
    // =========================

    const emailHtml = `
      <div style="background:#0b0d10;padding:28px 12px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;line-height:1.45;">
        <div style="max-width:680px;margin:0 auto;">

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.55);font-weight:700;">
              Portfolio Contact
            </div>
            <div style="font-size:12px;color:rgba(255,255,255,.45);">
              ${escapeHtml(sentAtIsoString)}
            </div>
          </div>

          <div style="background:#0f1216;border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden;">

            <div style="padding:18px 18px 14px 18px;border-bottom:1px solid rgba(255,255,255,.08);">
              <div style="font-size:18px;color:#fff;font-weight:800;letter-spacing:-.01em;">
                New message
              </div>
              <div style="margin-top:4px;font-size:13px;color:rgba(255,255,255,.6);">
                Someone contacted you via your portfolio form.
              </div>
            </div>

            <div style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.08);">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="width:110px;padding:6px 0;font-size:12px;color:rgba(255,255,255,.5);letter-spacing:.06em;text-transform:uppercase;font-weight:700;">From</td>
                  <td style="padding:6px 0;font-size:14px;color:rgba(255,255,255,.92);font-weight:700;">
                    ${escapeHtml(name)}
                  </td>
                </tr>
                <tr>
                  <td style="width:110px;padding:6px 0;font-size:12px;color:rgba(255,255,255,.5);letter-spacing:.06em;text-transform:uppercase;font-weight:700;">Email</td>
                  <td style="padding:6px 0;font-size:14px;color:rgba(255,255,255,.92);font-weight:700;">
                    <a href="mailto:${escapeHtml(email)}" style="color:#c7d2fe;text-decoration:none;">
                      ${escapeHtml(email)}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="width:110px;padding:6px 0;font-size:12px;color:rgba(255,255,255,.5);letter-spacing:.06em;text-transform:uppercase;font-weight:700;">Subject</td>
                  <td style="padding:6px 0;font-size:14px;color:rgba(255,255,255,.92);font-weight:700;">
                    ${escapeHtml(subject)}
                  </td>
                </tr>
              </table>
            </div>

            <div style="padding:16px 18px 18px 18px;">
              <div style="font-size:12px;color:rgba(255,255,255,.5);letter-spacing:.12em;text-transform:uppercase;font-weight:800;">
                Message
              </div>

              <div style="margin-top:10px;background:#0b0d10;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:14px;color:rgba(255,255,255,.92);white-space:pre-wrap;line-height:1.7;font-size:14px;">
                ${escapeHtml(message)}
              </div>

              <div style="margin-top:12px;font-size:12px;color:rgba(255,255,255,.5);">
                Reply directly to this email to answer the sender.
              </div>
            </div>
          </div>

          <div style="margin-top:12px;font-size:12px;color:rgba(255,255,255,.4);text-align:center;">
            Sent from your contact endpoint · Resend
          </div>

        </div>
      </div>
    `

    // =========================

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
