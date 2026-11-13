<template>
  <section id="projects" class="projects sectionsBackground">
    <!-- Header -->
    <header class="section-head">
      <span class="section-eyebrow">Portfolio</span>
      <h2 class="section-title">{{ title }}</h2>
      <p class="section-desc">{{ description }}</p>
    </header>

    <div class="section-divider" />

    <v-container class="projects-container">
      <v-row class="projects-grid" justify="center" align="stretch">
        <v-col
          v-for="project in projectsList"
          :key="project.id"
          cols="12"
          sm="6"
          md="6"
          lg="6"
          xl="4"
        >
          <ProjectCard :project="project" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import { title, description, projectsList } from '@/config/projects.json'
</script>

<style scoped>
/* Container: controla el ancho máximo para que no se vea "infinito" en ultrawide */
.projects-container {
  max-width: 100%;
  padding: 0;
}

</style>
