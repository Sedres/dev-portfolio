<template>
  <div class="d-flex flex-column ga-4 hero-left">
    <div class="d-flex flex-wrap ga-2" :class="[smAndDown ? 'justify-center' : 'justify-start']">
      <v-chip variant="tonal" size="small" class="px-3 py-2">
        <template #prepend>
          <v-avatar size="10" class="mr-3 kicker-dot" />
        </template>

        <span class="font-weight-black text-body-2">Available for projects</span>

        <template v-if="!smAndDown">
          <v-divider vertical class="mx-3" />
          <span class="text-body-2 opacity-80">Web · FiveM · UI</span>
        </template>
      </v-chip>

      <v-chip v-if="smAndDown" variant="tonal" size="small" class="px-3 py-2">
        <span class="text-body-2 opacity-80">Web · FiveM · UI</span>
      </v-chip>
    </div>

    <div :class="[smAndDown ? 'text-center' : 'text-start']" class="hero-title-wrap">
      <div class="hero-title text-h3 text-md-h2 font-weight-black">
        Web & Script <span class="hero-accent">Developer</span>
      </div>
    </div>

    <div
      class="text-body-1 opacity-85"
      :class="[smAndDown ? 'text-center' : 'text-start']"
      style="max-width: 62ch"
    >
      I build modern web interfaces and practical solutions with a focus on clean structure,
      scalability, and polished UI.
    </div>

    <div class="d-flex flex-wrap ga-3" :class="[smAndDown ? 'justify-center' : 'justify-start']">
      <v-btn
        v-for="button in buttonsList"
        :key="button.label"
        rounded="lg"
        size="large"
        variant="tonal"
        :prepend-icon="button.icon"
        :href="button.url"
        target="_blank"
        class="hero-btn"
      >
        {{ button.label }}
      </v-btn>

      <v-btn
        rounded="lg"
        size="large"
        variant="text"
        prepend-icon="mdi-arrow-right"
        @click="$emit('scroll-to', 'projects')"
      >
        Explore
      </v-btn>
    </div>

    <v-sheet class="pt-4 d-flex flex-column ga-3 hero-strip" color="transparent">
      <v-divider />

      <div
        class="d-inline-flex align-center ga-2 opacity-85 font-weight-bold"
        :class="[smAndDown ? 'mx-auto' : '']"
      >
        <v-icon size="16" icon="mdi-layers-outline" />
        <span>Toolbox</span>
      </div>

      <v-chip-group column class="ga-2" :class="[smAndDown ? 'justify-center' : 'justify-start']">
        <v-chip
          v-for="tech in toolboxList"
          :key="tech.name"
          variant="tonal"
          rounded="lg"
          size="small"
          :prepend-icon="tech.icon"
        >
          {{ tech.name }}
        </v-chip>
      </v-chip-group>
    </v-sheet>
  </div>
</template>

<script setup>
import { toolboxList, buttonsList } from '@/config/hero.json'
import { useDisplay } from 'vuetify'
defineEmits(['scroll-to'])

const { smAndDown } = useDisplay()
</script>

<style scoped>
.hero-left {
  z-index: 2;
}

.kicker-dot {
  background: rgba(120, 255, 190, 0.9);
  box-shadow: 0 0 0 6px rgba(120, 255, 190, 0.12);
  animation: pulse 2.5s infinite;
}

.hero-title-wrap {
  padding-bottom: 12px;
  position: relative;
}

.hero-title-wrap::after {
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

.hero-btn {
  border: 1px solid rgba(255, 255, 255, 0.12);
}

@media (max-width: 1024px) {
  .hero-title-wrap::after {
    left: 50%;
    transform: translateX(-50%);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
</style>
