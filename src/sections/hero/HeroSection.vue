<template>
  <section id="hero" class="hero sectionsBackground">
    <div class="hero-grid">
      <HeroLeft @scroll-to="scrollTo" />
      <HeroRight />
    </div>
  </section>
</template>

<script setup>
import HeroLeft from './components/HeroLeft.vue'
import HeroRight from './components/HeroRight.vue'

function scrollTo(id) {
  const element = document.getElementById(id)
  if (!element) return
  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 95%;
}

/* Single layout grid: no nested card, so the section is the only surface.
   Content aligns with the other sections' 32px panel padding. */
.hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.5fr 0.5fr;
  gap: 24px;
  align-items: center;
  width: 100%;
}

/* RESPONSIVE (grid + align general) */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
