<template>
  <div class="hero-left">
    <div class="hero-kicker">
      <span class="kicker-dot" />
      <span class="kicker-text">Available for projects</span>
      <span class="kicker-sep" />
      <span class="kicker-sub">Web · FiveM · UI</span>
    </div>

    <h1 class="hero-title">Web & Script <span class="hero-accent">Developer</span></h1>

    <p class="hero-subtitle">
      I build modern web interfaces and practical solutions with a focus on clean structure,
      scalability, and polished UI.
    </p>

    <div class="hero-actions">
      <v-btn
        v-for="button in buttonsList"
        :key="button.label"
        rounded="lg"
        size="large"
        variant="tonal"
        class="btn btn-main"
        :prepend-icon="button.icon"
        :href="button.url"
        target="_blank"
      >
        {{ button.label }}
      </v-btn>

      <v-btn
        rounded="lg"
        size="large"
        variant="text"
        class="btn btn-text"
        prepend-icon="mdi-arrow-right"
        @click="$emit('scroll-to', 'projects')"
      >
        Explore
      </v-btn>
    </div>

    <div class="hero-strip">
      <div class="strip-label">
        <v-icon size="16" icon="mdi-layers-outline" />
        <span>Toolbox</span>
      </div>

      <div class="hero-chips">
        <v-chip
          v-for="tech in toolboxList"
          :key="tech.name"
          class="tech-chip"
          variant="tonal"
          rounded="lg"
          size="small"
          :prepend-icon="tech.icon"
        >
          {{ tech.name }}
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toolboxList, buttonsList } from '@/config/hero.json'

defineEmits(['scroll-to'])
</script>

<style scoped>
.hero-left {
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 2;
}

.hero-kicker {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.kicker-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgba(120, 255, 190, 0.9);
  box-shadow: 0 0 0 6px rgba(120, 255, 190, 0.12);
}

.kicker-text {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 750;
  font-size: 13px;
}

.kicker-sep {
  width: 1px;
  height: 14px;
  background: rgba(255, 255, 255, 0.14);
}

.kicker-sub {
  color: rgba(255, 255, 255, 0.75);
  font-size: 12px;
  font-weight: 650;
}

.hero-title {
  margin: 0;
  font-size: clamp(34px, 4vw, 56px);
  font-weight: 950;
  letter-spacing: -0.035em;
  color: rgba(255, 255, 255, 0.97);
  line-height: 1.02;
  padding-bottom: 12px;
  position: relative;
}

.hero-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 180px;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.45),
    rgba(255, 255, 255, 0.08),
    transparent
  );
}

.hero-accent {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.6));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 16px;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.82);
  max-width: 62ch;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.btn {
  height: 50px;
  padding: 0 16px;
  font-weight: 800;
  letter-spacing: 0.02em;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition:
    transform 140ms ease,
    box-shadow 140ms ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.35);
}

.btn-text {
  border: none !important;
  background: transparent !important;
  color: rgba(255, 255, 255, 0.88) !important;
}

.hero-strip {
  margin-top: 10px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.strip-label {
  display: inline-flex;
  gap: 8px;
  color: rgba(255, 255, 255, 0.78);
  font-weight: 750;
  font-size: 13px;
}

.hero-chips {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tech-chip {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.86);
}

/* RESPONSIVE (lo que afectaba a left) */
@media (max-width: 1024px) {
  .hero-kicker {
    margin: 0 auto;
  }

  .hero-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .hero-actions,
  .hero-chips {
    justify-content: center;
  }
}
</style>
