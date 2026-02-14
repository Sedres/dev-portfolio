<template>
  <v-card variant="text" rounded="xl" class="pa-2">
    <v-card-title class="text-h6 font-weight-black"> Direct contact </v-card-title>

    <v-card-text class="pt-2">
      <v-list class="bg-transparent" density="compact" lines="two">
        <v-list-item prepend-icon="mdi-email-outline">
          <v-list-item-title class="text-overline opacity-70"> Email </v-list-item-title>

          <v-list-item-subtitle>
            <a :href="`mailto:${email}`" class="mail-link">
              {{ email }}
            </a>
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item prepend-icon="mdi-map-marker-outline">
          <v-list-item-title class="text-overline opacity-70"> Location </v-list-item-title>

          <v-list-item-subtitle>
            {{ location }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item prepend-icon="mdi-link-variant">
          <v-list-item-title class="text-overline opacity-70"> Links </v-list-item-title>

          <v-list-item-subtitle class="pt-2">
            <v-chip-group column class="ga-2">
              <v-chip
                v-for="link in links"
                :key="link.label"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                variant="tonal"
                size="small"
                :prepend-icon="link.icon"
                class="text-decoration-none"
              >
                {{ link.label }}
              </v-chip>
            </v-chip-group>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider class="my-4" />

      <v-alert variant="tonal" density="compact" type="info" class="rounded-lg">
        I usually reply within <strong>24–48h</strong>. If it’s urgent, mention it in the subject 🙌
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { email, location, links } from '@config/contact.json'
</script>

<style scoped>
.mail-link {
  text-decoration: none;
  color: inherit;
}
</style>
