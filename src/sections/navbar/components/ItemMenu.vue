<template>
  <!-- Menu -->
  <v-item-group
    :model-value="activeNavId"
    selected-class="is-active"
    class="menu glass"
    elevation="10"
    aria-label="Navigation menu"
    @update:modelValue="emit('scroll-to', $event)"
  >
    <v-item
      v-for="item in navList"
      :key="item.id"
      :value="item.id"
      v-slot="{ isSelected, selectedClass, toggle }"
    >
      <v-btn
        type="button"
        variant="text"
        :class="['menu-btn', selectedClass]"
        rounded="lg"
        :icon="isMobile"
        :aria-label="item.label"
        @click="toggle"
      >
        <v-icon :icon="item.icon" />
        <span v-if="!isMobile" class="menu-text">{{ item.label }}</span>
      </v-btn>
    </v-item>
  </v-item-group>
</template>

<script setup>
import { navList } from '@/config/nav.json'
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
/* Menu */
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px;
  border-radius: 8px;
  height: 64px;
}

.menu-btn {
  padding: 10px 12px;
  min-width: 48px;
  height: 52px;

  color: rgba(255, 255, 255, 0.46);
  cursor: pointer;

  border: 1px solid transparent;
  transition:
    background 0.15s ease,
    transform 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
  color: rgba(255, 255, 255, 0.96);
  border-color: rgba(255, 255, 255, 0.1);
}

.is-active {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.25);
}

.menu-text {
  font-weight: 750;
  font-size: 14px;
  letter-spacing: 0.01em;
  margin-left: 8px;
}

@media (max-width: 600px) {
  .menu-btn {
    height: 46px;
    padding: 10px 8px;
  }
}
</style>
