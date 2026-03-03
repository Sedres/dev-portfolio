<script setup>
import Navbar from '@sections/navbar/NavBar.vue'

import HeroSection from '@sections/hero/HeroSection.vue'

import ContactSection from '@sections/contact/ContactSection.vue'

const ProjectsSection = defineAsyncComponent(() => import('@sections/projects/ProjectsSection.vue'))
</script>

<template>
  <img
    class="background"
    src="https://res.cloudinary.com/dzfe3wq2x/image/upload/q_auto:low/v1772553717/background_devhgd.avif"
    alt=""
    width="1920"
    height="1080"
  />

  <div class="app-container">
    <Navbar />
    <HeroSection />
    <ProjectsSection />
    <ContactSection />
  </div>
</template>

<style></style>
