<template>
  <div class="picture-container">
    <img
      src="https://res.cloudinary.com/dzfe3wq2x/image/upload/q_auto:eco/v1772554176/me_rh77gv.avif"
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
  width: 400px;
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
    height: 560px;
  }
  .picture-container {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-img {
    height: 460px;
  }
}
</style>
