<template>
  <div class="picture-container">
    <img
      src="https://res.cloudinary.com/dzfe3wq2x/image/upload/q_auto:eco/v1772554176/me_rh77gv.avif"
      alt="Alin Calauz"
      class="hero-img"
      loading="eager"
      fetchpriority="high"
      decoding="async"
      draggable="false"
    />
  </div>
</template>

<script setup></script>

<style scoped>
.picture-container {
  position: relative;
  display: flex;
  align-self: stretch;
  align-items: flex-end;
  justify-content: center;
  width: 500px;
}

.hero-img {
  /* width driven so the element box matches the artwork (no letterboxing),
     which keeps the mask below locked to the photo. */
  width: 100%;
  height: auto;
  max-height: 85vh;
  object-fit: contain;
  object-position: bottom center;
  transform-origin: bottom center;
  filter: drop-shadow(0 26px 36px rgba(0, 0, 0, 0.55));
  /* The photo is a cut-out that ends abruptly at the hips, so the lower body is
     dissolved into the panel. This hides the straight crop line and reads as a
     portrait emerging from the dark instead of a torso stuck to the edge.
     Stops are measured from the bottom, where the cut is. */
  -webkit-mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.35) 6%,
    rgba(0, 0, 0, 0.72) 14%,
    #000 26%
  );
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.35) 6%,
    rgba(0, 0, 0, 0.72) 14%,
    #000 26%
  );
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
    max-height: 560px;
  }
  .picture-container {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-img {
    max-height: 460px;
  }
}
</style>
