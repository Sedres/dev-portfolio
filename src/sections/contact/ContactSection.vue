<template>
  <section id="contact" class="contact sectionsBackground">
    <header class="section-head">
      <span class="section-eyebrow">Get in touch</span>
      <h2 class="section-title">Contact</h2>
      <p class="section-desc">Have an idea or a proposal? Send me a message.</p>
    </header>

    <div class="section-divider" />

    <v-container class="contact-container">
      <v-row class="contact-grid" justify="center" align="stretch">
        <v-col cols="12" md="7" lg="7">
          <ContactForm />
        </v-col>

        <v-col cols="12" md="5" lg="5">
          <ContactInfo />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import ContactForm from './components/ContactForm.vue'
import ContactInfo from './components/ContactInfo.vue'
</script>

<style scoped>
.contact-container {
  max-width: 100%;
  padding: 0;
}
</style>
