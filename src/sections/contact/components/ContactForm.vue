<template>
  <v-card class="contact-card" theme="dark" variant="text">
    <v-card-title class="contact-card-title">Send me a message</v-card-title>

    <v-card-text>
      <AppNotification
        v-model="notification.isOpen"
        :type="notification.type"
        :title="notification.title"
        :message="notification.message"
        :timeout="notification.timeout"
        :location="notification.location"
        :show-icon="notification.showIcon"
        :icon="notification.icon"
      />

      <v-form ref="contactFormRef" v-model="isValid" class="contact-form" @submit.prevent="submit">
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.name"
              label="Name"
              variant="outlined"
              density="comfortable"
              autocomplete="name"
              :rules="[rules.required, rules.min2]"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.email"
              label="Email"
              variant="outlined"
              density="comfortable"
              autocomplete="email"
              :rules="[rules.required, rules.email]"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="form.subject"
              label="Subject"
              variant="outlined"
              density="comfortable"
              autocomplete="off"
              :rules="[rules.required, rules.min3]"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="form.message"
              label="Message"
              variant="outlined"
              density="comfortable"
              rows="6"
              auto-grow
              :rules="[rules.required, rules.min10]"
            />
          </v-col>

          <v-col cols="12" class="d-flex align-center gap-3">
            <v-btn
              type="submit"
              size="large"
              class="contact-btn"
              :disabled="!isValid || isSending"
              :loading="isSending"
            >
              Send
            </v-btn>

            <span v-if="isSending" class="sending-hint">Sending…</span>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import AppNotification from '@/app/components/AppNotification.vue'
const contactFormRef = ref(null)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isValid = ref(false)
const isSending = ref(false)

const notification = reactive({
  isOpen: false,
  type: 'info', // 'info' | 'success' | 'warning' | 'error'
  title: '',
  message: '',
  location: 'bottom',
  timeout: 3500,
  showIcon: true,
  icon: 'mdi-information-outline',
})

const iconByType = {
  info: 'mdi-information-outline',
  success: 'mdi-check-circle-outline',
  warning: 'mdi-alert-outline',
  error: 'mdi-close-circle-outline',
}

function openNotification(type, title, message, timeout = 3500) {
  notification.type = type
  notification.title = title
  notification.message = message
  notification.timeout = timeout
  notification.icon = iconByType[type] ?? iconByType.info

  // re-open si ya estaba abierto
  notification.isOpen = false
  requestAnimationFrame(() => {
    notification.isOpen = true
  })
}

const rules = {
  required: (value) => (!!value && String(value).trim().length > 0) || 'Required field',
  min2: (value) => String(value || '').trim().length >= 2 || 'Minimum 2 characters',
  min3: (value) => String(value || '').trim().length >= 3 || 'Minimum 3 characters',
  min10: (value) => String(value || '').trim().length >= 10 || 'Minimum 10 characters',
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(value || '').trim()) || 'Invalid email',
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''

  contactFormRef.value?.reset()

  contactFormRef.value?.resetValidation()

  isValid.value = false
}

async function submit() {
  if (!isValid.value || isSending.value) return

  try {
    isSending.value = true

    const apiResponse = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        website: '', // honeypot
      }),
    })

    if (!apiResponse.ok) {
      const errorPayload = await apiResponse.json().catch(() => ({}))
      const backendErrorMessage =
        typeof errorPayload?.error === 'string' && errorPayload.error.trim().length > 0
          ? errorPayload.error
          : 'Request failed'
      throw new Error(backendErrorMessage)
    }

    openNotification('success', 'Message sent', 'Your message has been sent successfully', 3500)
    resetForm()
  } catch (error) {
    const errorMessage =
      error instanceof Error && error.message
        ? error.message
        : 'Something went wrong, please try again later'
    openNotification('error', 'Failed to send', errorMessage, 5000)
    console.error(error)
  } finally {
    isSending.value = false
  }
}
</script>

<style scoped>
.contact-card {
  border-radius: 16px;
}

.contact-card-title {
  font-weight: 800;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.92);
}

.contact-form :deep(.v-field__outline) {
  opacity: 0.65;
}

.contact-btn {
  font-weight: 800;
  letter-spacing: -0.01em;
}

.sending-hint {
  font-size: 13px;
  opacity: 0.75;
}
</style>
