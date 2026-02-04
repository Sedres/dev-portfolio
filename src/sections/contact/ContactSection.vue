<template>
  <section id="contact" class="contact sectionsBackground">
    <!-- Header -->
    <v-card variant="text" class="mb-6">
      <v-card-title class="contact-title">{{ title }}</v-card-title>
      <v-card-subtitle class="contact-description">
        {{ description }}
      </v-card-subtitle>
    </v-card>

    <v-divider class="mb-6" />

    <v-container class="contact-container">
      <v-row class="contact-grid" justify="center" align="stretch" dense>
        <!-- Form -->
        <v-col cols="12" md="7" lg="7">
          <v-card class="contact-card" theme="dark" variant="text">
            <v-card-title class="contact-card-title">Envíame un mensaje</v-card-title>
            <v-card-text>
              <v-form v-model="isValid" @submit.prevent="submit" class="contact-form">
                <v-row dense>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.name"
                      label="Nombre"
                      variant="outlined"
                      density="comfortable"
                      :rules="[rules.required, rules.min2]"
                      autocomplete="name"
                    />
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.email"
                      label="Email"
                      variant="outlined"
                      density="comfortable"
                      :rules="[rules.required, rules.email]"
                      autocomplete="email"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="form.subject"
                      label="Asunto"
                      variant="outlined"
                      density="comfortable"
                      :rules="[rules.required, rules.min3]"
                      autocomplete="off"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="form.message"
                      label="Mensaje"
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
                      :disabled="!isValid || isSending"
                      :loading="isSending"
                      size="large"
                      class="contact-btn"
                    >
                      Enviar
                    </v-btn>

                    <span v-if="status.type" :class="['contact-status', `is-${status.type}`]">
                      {{ status.message }}
                    </span>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Info -->
        <v-col cols="12" md="5" lg="4">
          <v-card class="contact-card" variant="text">
            <v-card-title class="contact-card-title">Contacto directo</v-card-title>
            <v-card-text class="contact-info">
              <div class="info-row">
                <div class="info-label">Email</div>
                <a class="info-value" :href="`mailto:${direct.email}`">{{ direct.email }}</a>
              </div>

              <div class="info-row">
                <div class="info-label">Ubicación</div>
                <div class="info-value">{{ direct.location }}</div>
              </div>

              <div class="info-row">
                <div class="info-label">Links</div>
                <div class="info-links">
                  <a
                    v-for="link in direct.links"
                    :key="link.label"
                    class="info-chip"
                    :href="link.href"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ link.label }}
                  </a>
                </div>
              </div>

              <v-divider class="my-4" />

              <p class="contact-note">
                Suelo responder en <strong>24–48h</strong>. Si es algo urgente, ponlo en el asunto
                🙌
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const title = 'Contacto'
const description =
  '¿Tienes una idea, una propuesta o simplemente quieres saludar? Escríbeme y lo vemos.'

const direct = {
  email: 'tuemail@domain.com',
  location: 'España',
  links: [
    { label: 'GitHub', href: 'https://github.com/Sedres' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
}

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isValid = ref(false)
const isSending = ref(false)
const status = reactive({
  type: '', // 'success' | 'error'
  message: '',
})

const rules = {
  required: (v) => (!!v && String(v).trim().length > 0) || 'Campo obligatorio',
  min2: (v) => String(v || '').trim().length >= 2 || 'Mínimo 2 caracteres',
  min3: (v) => String(v || '').trim().length >= 3 || 'Mínimo 3 caracteres',
  min10: (v) => String(v || '').trim().length >= 10 || 'Mínimo 10 caracteres',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(v || '').trim()) || 'Email inválido',
}

async function submit() {
  status.type = ''
  status.message = ''

  if (!isValid.value) return

  try {
    isSending.value = true

    // TODO: aquí conectas tu backend / form provider (Netlify, Formspree, endpoint propio, etc.)
    // Ejemplo: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })

    await new Promise((r) => setTimeout(r, 450)) // simulación

    status.type = 'success'
    status.message = 'Mensaje enviado. ¡Gracias! ✅'

    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (e) {
    status.type = 'error'
    status.message = 'No se pudo enviar. Inténtalo de nuevo.'
  } finally {
    isSending.value = false
  }
}
</script>

<style scoped>
/* Container */
.contact-container {
  max-width: 100%;
}

/* Grid spacing consistente */
.contact-grid {
  row-gap: 16px;
  column-gap: 16px;
}

/* Header typography (mismo estilo que Projects) */
.contact-title {
  margin: 0;
  font-size: clamp(34px, 4vw, 56px);
  font-weight: 950;
  letter-spacing: -0.035em;
  color: rgba(255, 255, 255, 0.97);
  line-height: 1.02;
  padding-bottom: 12px;
}

.contact-description {
  font-size: 16px;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.82);
  max-width: 62ch;
}

/* Cards */
.contact-card {
  border-radius: 16px;
}

/* Títulos dentro de cards */
.contact-card-title {
  font-weight: 800;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.92);
}

/* Form */
.contact-form :deep(.v-field__outline) {
  opacity: 0.65;
}

.contact-btn {
  font-weight: 800;
  letter-spacing: -0.01em;
}

/* Status */
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

/* Info */
.contact-info {
  color: rgba(255, 255, 255, 0.82);
}

.info-row {
  margin-bottom: 14px;
}

.info-label {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 6px;
}

.info-value {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.info-value:hover {
  opacity: 0.9;
}

.info-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.info-chip {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
}

.info-chip:hover {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.09);
}

.contact-note {
  margin: 0;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.78);
}
</style>
