<template>
  <section id="contact" class="contact sectionsBackground">
    <v-card variant="text" class="pl-2 pt-2 pb-1">
      <v-card-title class="contact-title">{{ title }}</v-card-title>
      <v-card-subtitle class="contact-description">
        {{ description }}
      </v-card-subtitle>
    </v-card>

    <v-divider class="mb-6" />

    <v-container class="contact-container">
      <v-row class="contact-grid" justify="center" align="stretch" dense>
        <v-col cols="12" md="7" lg="7">
          <ContactForm />
        </v-col>

        <v-col cols="12" md="5" lg="4">
          <ContactInfo />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import ContactForm from './components/ContactForm.vue'
import ContactInfo from './components/ContactInfo.vue'

const title = 'Contact'
const description = 'Have an idea or a proposal? Send me a message.'
</script>

<style scoped>
.contact-container {
  max-width: 100%;
}

.contact-grid {
  row-gap: 16px;
  column-gap: 16px;
}

.contact-title {
  margin: 0;
  font-size: clamp(34px, 4vw, 56px);
  font-weight: 950;
  letter-spacing: -0.035em;
  color: rgba(255, 255, 255, 0.97);
  line-height: 1.02;
}

.contact-description {
  font-size: 16px;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.82);
  max-width: 62ch;
}
</style>
