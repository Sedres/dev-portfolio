<template>
  <!-- Profile -->
  <v-card
    class="profile-card d-flex align-center justify-center gap-3 glass"
    type="button"
    variant="text"
    density="compact"
    aria-label="Go to top"
    @click="emit('scroll-to', 'hero')"
  >
    <v-card variant="text">
      <v-card-title class="profile-name pa-0">Alin Calauz</v-card-title>
      <v-card-subtitle v-if="!isMobile" class="profile-role pa-0">
        Web & Script Developer
      </v-card-subtitle>
    </v-card>

    <v-icon class="profile-hint" size="20" icon="mdi-arrow-up" />
  </v-card>
</template>

<script setup>
defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['scroll-to'])
</script>

<style scoped>
/* Profile */
.profile-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  width: fit-content;
  height: 64px;
  border-radius: var(--surface-radius);

  cursor: pointer;
  user-select: none;
  text-align: left;
  transition:
    transform 0.15s ease,
    background 0.15s ease,
    color 0.15s ease;
}

.profile-card:hover {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.05) 50%),
    rgba(38, 38, 48, 0.44);
  transform: translateY(-1px);
  color: rgba(255, 255, 255, 0.98);
}

/* Profile text card */

.profile-name {
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.01em;
  color: rgba(255, 255, 255, 0.96);
}

.profile-role {
  margin-top: 4px;
  font-weight: 600;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.72);
}

.profile-hint {
  box-sizing: content-box;
  padding: 5px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.78);
  transition:
    background 0.15s ease,
    transform 0.15s ease;
}

.profile-card:hover .profile-hint {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

@media (max-width: 420px) {
  .profile-name {
    font-size: 13px;
  }
}
</style>
