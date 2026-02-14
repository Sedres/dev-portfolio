<template>
  <v-card class="contact-card" theme="dark" variant="text">
    <v-card-title class="contact-card-title"> Send me a message </v-card-title>

    <v-card-text>
      <v-form v-model="isValid" class="contact-form" @submit.prevent="submit">
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

            <span v-if="status.type" :class="['contact-status', `is-${status.type}`]">
              {{ status.message }}
            </span>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isValid = ref(false)
const isSending = ref(false)

const status = reactive({
  type: '',
  message: '',
})

const rules = {
  required: (value) => (!!value && String(value).trim().length > 0) || 'Required field',

  min2: (value) => String(value || '').trim().length >= 2 || 'Minimum 2 characters',

  min3: (value) => String(value || '').trim().length >= 3 || 'Minimum 3 characters',

  min10: (value) => String(value || '').trim().length >= 10 || 'Minimum 10 characters',

  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(value || '').trim()) || 'Invalid email',
}

function resetStatus() {
  status.type = ''
  status.message = ''
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}

async function submit() {
  resetStatus()
  if (!isValid.value) return

  try {
    isSending.value = true
    await new Promise((resolve) => setTimeout(resolve, 450))
    status.type = 'success'
    status.message = 'Message sent successfully! ✅'
    resetForm()
  } catch {
    status.type = 'error'
    status.message = 'Failed to send message. Try again.'
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

.contact-status {
  font-size: 14px;
  opacity: 0.9;
}

.contact-status.is-success {
  color: rgba(140, 255, 170, 0.95);
}

.contact-status.is-error {
  color: rgba(255, 140, 140, 0.95);
}
</style>
