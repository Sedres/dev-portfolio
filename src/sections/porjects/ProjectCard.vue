<template>
  <v-card class="project-card" variant="tonal" rounded="lg">
    <div class="carousel-wrap">
      <v-carousel
        ref="carousel"
        v-model="currentIndex"
        class="project-carousel"
        height="fit-content"
        hide-delimiters
        :show-arrows="false"
        crossfade
      >
        <v-carousel-item
          v-for="(image, index) in project.images"
          :key="index"
          @click="imageZoomActive = true"
        >
          <v-img class="project-img" :src="image" :alt="project.name" cover>
            <!-- overlay gradient -->
            <div class="img-gradient" />
          </v-img>
        </v-carousel-item>
      </v-carousel>

      <!-- overlay actions -->
      <div class="overlay-actions">
        <v-btn
          class="glass-btn"
          icon="mdi-magnify-plus"
          size="small"
          variant="elevated"
          rounded="lg"
          @click="imageZoomActive = true"
        />
        <template v-if="project.images.length > 1">
          <v-btn
            rounded="lg"
            class="glass-btn"
            icon="mdi-chevron-left"
            size="small"
            variant="elevated"
            @click="prev"
          />
          <v-btn
            rounded="lg"
            class="glass-btn"
            icon="mdi-chevron-right"
            size="small"
            variant="elevated"
            @click="next"
          />
        </template>
      </div>

      <!-- optional badge -->
      <div class="top-right-overlay" v-if="project.images.length > 1">
        <v-chip class="glass-chip" size="small" rounded="lg" variant="elevated">
          {{ currentIndex + 1 }} / {{ project.images.length }}
        </v-chip>
      </div>
    </div>

    <div class="content">
      <div class="header">
        <div class="title-row">
          <h3 class="project-title">{{ project.name }}</h3>
        </div>

        <div class="project-chips">
          <v-chip
            v-for="tech in project.tech"
            :key="tech"
            class="tech-chip"
            size="small"
            :prepend-icon="tech.icon"
            rounded="lg"
            variant="tonal"
          >
            {{ tech.name }}
          </v-chip>
        </div>
      </div>

      <p class="project-description">
        {{ project.description }}
      </p>

      <v-divider class="divider" />

      <v-card-actions class="project-actions">
        <v-btn
          class="cta"
          rounded="lg"
          variant="tonal"
          block
          size="large"
          :href="project.url"
          target="_blank"
          append-icon="mdi-open-in-new"
        >
          Go to project
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>

  <ProjectImageZoom
    :open="imageZoomActive"
    :image="project.images[currentIndex]"
    @closeZoom="imageZoomActive = false"
    @prevImage="prev"
    @nextImage="next"
  />
</template>

<script setup>
import ProjectImageZoom from './ProjectImageZoom.vue'

const props = defineProps({
  project: { type: Object, required: true },
})

const imageZoomActive = ref(false)
const currentIndex = shallowRef(1)

const prev = () => {
  currentIndex.value =
    (currentIndex.value + props.project.images.length - 1) % props.project.images.length
}
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.project.images.length
}
</script>

<style scoped>
/* Card shell */
.project-card {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 55px rgba(0, 0, 0, 0.28);
  border-color: rgba(255, 255, 255, 0.14);
}

.carousel-wrap {
  position: relative;
}
.project-carousel {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.project-img {
  cursor: zoom-in;
}

/* Gradient overlay on image (helps readability and polish) */
.img-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0.35) 75%,
    rgba(0, 0, 0, 0.55) 100%
  );
  pointer-events: none;
}

/* Overlay controls */
.overlay-actions {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 20;
  display: flex;
  gap: 10px;
}

.top-right-overlay {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 20;
}

/* glass components */
.glass-btn {
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  background: rgba(20, 20, 24, 0.55) !important;
  backdrop-filter: blur(14px);
  color: rgba(255, 255, 255, 0.92) !important;
  transition:
    transform 150ms ease,
    background 150ms ease;
}
.glass-btn:hover {
  transform: translateY(-1px);
  background: rgba(20, 20, 24, 0.7) !important;
}

.glass-chip {
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(20, 20, 24, 0.55);
  backdrop-filter: blur(14px);
  color: rgba(255, 255, 255, 0.92);
}

/* Content area */
.content {
  padding: 16px 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.project-title {
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: 0.2px;
  line-height: 1.2;
}

/* Chips */
.project-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tech-chip {
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.92;
}

/* Description: nicer reading */
.project-description {
  margin: 0;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  line-height: 1.45;

  /* clamp for nicer cards */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  overflow: auto;
}

/* Scrollbar styling for description */
.project-description::-webkit-scrollbar {
  display: none;
}

/* Divider spacing */
.divider {
  opacity: 0.7;
}

/* Actions */
.project-actions {
  padding: 0;
}
.cta {
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition:
    transform 150ms ease,
    border-color 150ms ease;
}
.cta:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.18);
}

/* Responsive tweaks */
@media (max-width: 600px) {
  .content {
    padding: 14px;
  }
  .project-carousel {
    border-bottom: none;
  }
}
</style>
