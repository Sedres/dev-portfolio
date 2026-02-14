<template>
  <v-card class="contact-card" variant="text">
    <v-card-title class="contact-card-title"> Direct contact </v-card-title>

    <v-card-text class="contact-info">
      <div class="info-row">
        <div class="info-label">Email</div>
        <a class="info-value" :href="`mailto:${email}`">
          {{ email }}
        </a>
      </div>

      <div class="info-row">
        <div class="info-label">Location</div>
        <div class="info-value">{{ location }}</div>
      </div>

      <div class="info-row">
        <div class="info-label">Links</div>

        <div class="info-links">
          <v-chip
            v-for="link in links"
            :key="link.label"
            class="info-chip"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            :prepend-icon="link.icon"
          >
            {{ link.label }}
          </v-chip>
        </div>
      </div>

      <v-divider class="my-4" />

      <p class="contact-note">
        I usually reply within <strong>24–48h</strong>. If it’s urgent, mention it in the subject 🙌
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { email, location, links } from '@config/contact.json'
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
  text-decoration: none;
}

.info-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.info-chip {
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
