<template>
  <v-overlay
    class="zoom-overlay"
    opacity="0.90"
    :model-value="open"
    scrim="rgba(0,0,0,.75)"
    @click:outside="close"
    @after-leave="emit('closeZoom')"
    :persistent="true"
  >
    <v-card class="zoom-card" role="dialog" aria-modal="true" :aria-label="title" elevation="12">
      <header class="zoom-topbar">
        <div class="d-flex align-center ga-2">
          <v-btn
            rounded="lg"
            class="prev-button"
            icon="mdi-chevron-left"
            variant="outlined"
            @click="$emit('prevImage')"
          ></v-btn>

          <v-btn
            rounded="lg"
            class="next-button"
            icon="mdi-chevron-right"
            variant="outlined"
            @click="$emit('nextImage')"
          ></v-btn>
        </div>

        <v-btn
          class="close-button"
          rounded="lg"
          icon="mdi-close"
          variant="outlined"
          aria-label="Close image zoom"
          @click="close"
        />
      </header>

      <v-divider />

      <div class="zoom-body" transition="fade-transition">
        <v-img :src="image" :alt="alt" class="zoom-image">
          <template #placeholder>
            <div class="placeholder">
              <v-progress-circular indeterminate />
            </div>
          </template>

          <template #error>
            <div class="error">
              <v-icon icon="mdi-image-off-outline" />
              <span>Couldn’t load the image.</span>
            </div>
          </template>
        </v-img>
      </div>
    </v-card>
  </v-overlay>
</template>

<script setup>
const props = defineProps({
  open: { type: Boolean, required: true },
  image: { type: String, required: true },
  title: { type: String, default: 'Image Zoom' },
  alt: { type: String, default: 'Zoomed image' },
})

const emit = defineEmits(['closeZoom', 'prevImage', 'nextImage'])

const close = () => emit('closeZoom')

const onKeydown = (e) => {
  if (!props.open) return
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.zoom-overlay {
  display: grid;
  place-items: center;
  padding: clamp(12px, 2vw, 24px);
}

.zoom-card {
  width: min(1100px, 92vw);
  height: min(820px, 92vh);
  display: flex;
  flex-direction: column;

  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(20, 20, 24, 0.65);
  backdrop-filter: blur(14px);
  color: rgba(255, 255, 255, 0.92);

  border-radius: 16px;
  overflow: hidden;
}

.zoom-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
}

.zoom-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.zoom-body {
  flex: 1;
  min-height: 0; /* clave para que el contenido flex no desborde */
  padding: 12px;
  display: grid;
  place-items: center;
}

.zoom-image {
  width: 100%;
  height: 100%;
}

/* Centrado de placeholder/error */
.placeholder,
.error {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  gap: 10px;
  opacity: 0.9;
}
</style>
