<script setup lang="ts">
import { onMounted } from "vue";
import { animate, utils, stagger } from "animejs";

const title = "SIJA REEL";
const letters = title.split("");

function animateTitle() {
  animate(".js-title span", {
    translateY: [40, 0],
    opacity: [0, 1],
    delay: stagger(50),
    ease: "outExpo",
    duration: 1100,
  });

  animate(".underline-sweep", {
    scaleX: [0, 1],
    opacity: [0, 1],
    ease: "outExpo",
    duration: 900,
    delay: 200,
  });
}

function animateBlobs() {
  animate(".blob-1", {
    translateX: [-40, 40],
    translateY: [0, 60],
    scale: [1, 1.2],
    duration: 7000,
    loop: true,
    alternate: true,
    ease: "inOutSine",
  });

  animate(".blob-2", {
    translateX: [40, -40],
    translateY: [0, -60],
    scale: [1, 1.15],
    duration: 8000,
    loop: true,
    alternate: true,
    ease: "inOutSine",
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target as Element, {
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 900,
          ease: "outCubic",
        });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function parallax() {
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      const intensity = y * 0.02;
      utils.set(".blob-1", { translateY: intensity });
      utils.set(".blob-2", { translateY: -intensity * 0.8 });
    },
    { passive: true },
  );
}

onMounted(() => {
  animateTitle();
  animateBlobs();
  setupReveal();
  parallax();
});
</script>

<template>
  <main class="relative w-full items-center justify-center min-h-screen overflow-hidden bg-cyan-800 text-white">
    <div aria-hidden class="pointer-events-none absolute inset-0">
      <div class="gridlines absolute inset-0" />
      <div class="blob blob-1 absolute -left-20 -top-24 h-96 w-96 rounded-full blur-3xl opacity-40" />
      <div class="blob blob-2 absolute -right-28 -bottom-28 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-40" />
    </div>

    <section class="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-16">
      <h1 class="js-title text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
        <span v-for="(ch, i) in letters" :key="i" class="inline-block translate-y-10 opacity-0 will-change-transform">{{
          ch }}</span>
      </h1>
      <div class="mt-3 h-1 w-40 origin-left scale-x-0 rounded-full bg-white/70 underline-sweep" />

      <p class="mt-6 max-w-2xl text-lg text-neutral-300 reveal opacity-0 translate-y-6">
        Nuxt with Anime.js v4
      </p>
    </section>
  </main>
</template>

<style scoped>
.gridlines {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 40px 40px;
}

.blob {
  background:
    radial-gradient(closest-side, #22d3ee 20%, transparent 60%),
    radial-gradient(closest-side, #a78bfa 15%, transparent 60%);
  mix-blend-mode: screen;
}
</style>
