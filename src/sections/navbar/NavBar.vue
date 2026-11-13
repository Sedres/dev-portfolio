<template>
  <nav class="navbar" role="navigation" aria-label="NavBar">
    <ProfileCard :is-mobile="isMobile" @scroll-to="scrollTo" />
    <ItemMenu :activeNavId="activeSection" :is-mobile="isMobile" @scroll-to="scrollTo" />
  </nav>
</template>

<script setup>
import ProfileCard from './components/ProfileCard.vue'
import ItemMenu from './components/ItemMenu.vue'
import { navList } from '@/config/nav.json'
import { useScrollSpy } from '@composables/useScrollSpy'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const isMobile = mobile

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
  max-width: var(--section-max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

/* Responsive */
@media (max-width: 600px) {
  .navbar {
    top: 10px;
    gap: 10px;
  }
}
</style>
