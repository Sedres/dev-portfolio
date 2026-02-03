<template>
  <section id="projects" class="projects sectionsBackground">
    <!-- Header -->
    <v-card variant="text" class="mb-6">
      <v-card-title class="projects-title">{{ title }}</v-card-title>
      <v-card-subtitle class="projects-description">
        {{ description }}
      </v-card-subtitle>
    </v-card>

    <v-divider class="mb-6" />

    <v-container class="projects-container">
      <v-row class="projects-grid" justify="center" align="stretch" dense>
        <v-col v-for="project in projectsList" :key="project.id" cols="12" sm="6" md="5" lg="3">
          <ProjectCard :project="project" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'
import { title, description, projectsList } from '@/config/projects.json'
</script>

<style scoped>
/* Container: controla el ancho máximo para que no se vea "infinito" en ultrawide */
.projects-container {
  max-width: 100%;
}

/* Grid spacing consistente (Vuetify a veces se queda corto con dense) */
.projects-grid {
  row-gap: 16px;
  column-gap: 16px;
}

/* Header typography */
.projects-title {
  margin: 0;
  font-size: clamp(34px, 4vw, 56px);
  font-weight: 950;
  letter-spacing: -0.035em;
  color: rgba(255, 255, 255, 0.97);
  line-height: 1.02;
  padding-bottom: 12px;
}

.projects-description {
  font-size: 16px;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.82);
  max-width: 62ch;
}
</style>
