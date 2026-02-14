<script setup>
import Navbar from '@sections/navbar/NavBar.vue'

import HeroSection from '@sections/hero/HeroSection.vue'

import ContactSection from '@sections/contact/ContactSection.vue'

const ProjectsSection = defineAsyncComponent(() => import('@sections/projects/ProjectsSection.vue'))
</script>

<template>
  <img class="background" src="@assets/images/background.webp" alt="" />

  <div class="app-container">
    <Navbar />
    <HeroSection />
    <ProjectsSection />
    <ContactSection />
  </div>
</template>

<style></style>
