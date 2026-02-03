<template>
  <section id="contact" class="contact sectionsBackground">
    <!-- Header -->
    <v-card variant="text" class="mb-6">
      <v-card-title class="contact-title">Contact</v-card-title>
      <v-card-subtitle class="contact-description">
        Feel free to reach out for collaborations!
      </v-card-subtitle>
    </v-card>

    <v-divider class="mb-6" />

    <v-container class="contact-container">
      <v-row class="contact-grid" justify="center" align="stretch" dense>
        <v-col cols="12" sm="8" md="6" lg="5" xl="4">
          <ContactForm />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import ContactForm from './ContactForm.vue'
</script>

<style scoped></style>
