<script setup>
import Navbar from '@/components/navbar/NavBar.vue'

import HeroSection from '@/sections/hero/HeroSection.vue';
import ProjectsSection from '@/sections/porjects/ProjectsSection.vue';
import ContactSection from '@/sections/contact/ContactSection.vue';
</script>

<template>
  <img class="background" src="@/assets/images/background.webp"></img>
    <div class="app-container">
    <Navbar />
    <HeroSection />
  <ProjectsSection />
  <ContactSection />
  <section id="contact"></section>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
body {
  font-family: 'Poppins', sans-serif;
}
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .sectionsBackground {
  width: 95%;
  border-radius: 10px;

  margin-bottom: 50px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(20, 20, 24, 0.55);
  backdrop-filter: blur(14px);
  color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  min-height: 100vh;
}

.fondo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>
