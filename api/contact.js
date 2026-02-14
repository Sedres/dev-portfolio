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

    const emailHtml = `
      <div style="font-family: ui-sans-serif, system-ui;">
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `

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
        subject: `[Portfolio] ${subject}`,
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
