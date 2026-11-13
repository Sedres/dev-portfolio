<template>
  <footer class="footer">
    <div class="footer-brand">
      <span class="footer-mark" aria-hidden="true" />
      <span class="footer-name">Alin Calauz</span>
      <span class="footer-role">Web &amp; Script Developer</span>
    </div>

    <nav class="footer-links" aria-label="Social links">
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link"
      >
        <v-icon :icon="link.icon" size="16" />
        <span>{{ link.label }}</span>
      </a>
    </nav>

    <span class="footer-copy">© {{ year }} — All rights reserved</span>
  </footer>
</template>

<script setup>
import { links } from '@config/contact.json'

const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  width: 95%;
  max-width: var(--section-max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 18px;
  padding: 22px 4px 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-mark {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.06);
}

.footer-name {
  font-weight: 800;
  letter-spacing: 0.01em;
  color: rgba(255, 255, 255, 0.88);
}

.footer-role {
  color: rgba(255, 255, 255, 0.45);
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 18px;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer-link:hover {
  color: rgba(255, 255, 255, 0.95);
}

.footer-copy {
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 700px) {
  .footer {
    justify-content: center;
    text-align: center;
  }

  .footer-role {
    display: none;
  }
}
</style>
