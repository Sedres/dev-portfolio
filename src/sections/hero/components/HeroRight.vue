<template>
  <div class="picture-container">
    <img
      src="@assets/images/me.webp"
      alt="Alin Calauz"
      class="hero-img"
      loading="lazy"
      draggable="false"
    />
  </div>
</template>

<script setup></script>

<style scoped>
.picture-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-img {
  height: min(85vh, 1920px);
  object-fit: cover;
  filter: drop-shadow(0 26px 36px rgba(0, 0, 0, 0.55));
  transition:
    transform 180ms ease,
    filter 180ms ease;
}

.hero-img:hover {
  transform: scale(1.02);
  filter: drop-shadow(0 32px 48px rgba(255, 255, 255, 0.65));
}

/* RESPONSIVE (solo imagen) */
@media (max-width: 1024px) {
  .hero-img {
    margin-bottom: -16px;
    height: 360px;
  }
}

@media (max-width: 480px) {
  .hero-img {
    height: 300px;
  }
}
</style>
