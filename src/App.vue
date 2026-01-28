<script setup></script>

<template>
  <img class="background" src="@/assets/images/background.webp"></img>
  <section id="navbar"></section>
  <section id="about"></section>
  <section id="projects"></section>
  <section id="contact"></section>
</template>

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
</style>
