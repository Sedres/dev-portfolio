<template>
  <!-- Profile -->
  <v-card
    :class="[
      'profile-card d-flex align-center justify-center gap-3',
      'glass',
      { 'is-active': activeNavId === 'hero' },
    ]"
    type="button"
    rounded="lg"
    variant="outlined"
    elevation="10"
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
const props = defineProps({
  activeNavId: {
    type: String,
    required: true,
  },
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

  cursor: pointer;
  user-select: none;
  text-align: left;
  transition:
    transform 0.15s ease,
    background 0.15s ease,
    color 0.15s ease;
}

.profile-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
  color: rgba(255, 255, 255, 0.96);
}

/* Profile text card */

.profile-name {
  font-weight: 850;
  font-size: 14px;
  letter-spacing: 0.01em;
  color: rgba(255, 255, 255, 0.96);
}

.profile-role {
  margin-top: 4px;
  font-weight: 650;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.72);
}

.profile-hint {
  padding: 15px;
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
