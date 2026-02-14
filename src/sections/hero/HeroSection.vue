<template>
  <section id="hero" class="hero sectionsBackground">
    <v-card class="hero-card" elevation="0" variant="text" rounded="lg">
      <div class="hero-grid">
        <HeroLeft @scroll-to="scrollTo" />
        <HeroRight />
      </div>
    </v-card>
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

/* CARD (intocable) */
.hero-card {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.hero-card::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(800px 420px at 18% 30%, rgba(255, 255, 255, 0.1), transparent 60%),
    radial-gradient(700px 420px at 85% 65%, rgba(255, 255, 255, 0.08), transparent 62%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.28));
  opacity: 0.9;
}

/* GRID */
.hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.5fr 0.5fr;
  gap: 70px;
  padding: 0px 40px;
  align-items: center;
}

/* RESPONSIVE (grid + align general) */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    padding: 24px 24px 16px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-grid {
    padding: 20px 16px 14px;
  }
}
</style>
