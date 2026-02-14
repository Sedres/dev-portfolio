<template>
  <nav class="navbar" role="navigation" aria-label="NavBar">
    <ProfileCard :active-nav-id="activeSection" :is-mobile="isMobile" @scroll-to="scrollTo" />
    <ItemMenu :activeNavId="activeSection" :is-mobile="isMobile" @scroll-to="scrollTo" />
  </nav>
</template>

<script setup>
import ProfileCard from './components/ProfileCard.vue'
import ItemMenu from './components/ItemMenu.vue'
import { navList } from '@/config/nav.json'
import { useScrollSpy } from '@composables/useScrollSpy'

const viewportWidth = ref(window.innerWidth)
const isMobile = computed(() => viewportWidth.value <= 600)

const sectionIds = ['hero', ...navList.map((item) => item.section || item.id)]

const { activeSection, scrollTo } = useScrollSpy(sectionIds)
</script>

<style scoped>
/* Navbar */
.navbar {
  position: sticky;
  top: 20px;
  padding-top: 10px;
  z-index: 10;
  width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

/* Shared glass style */
.glass {
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(20, 20, 24, 0.55);
  backdrop-filter: blur(14px);
  color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
}

.is-active {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.25);
}

/* Responsive */
@media (max-width: 600px) {
  .navbar {
    top: 10px;
    gap: 10px;
  }
}
</style>
