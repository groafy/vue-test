<template>
  <div class="productSkeleton__base" aria-hidden="true">
    <div class="productSkeleton__slidingBg"></div>
    <div class="productSkeleton__imgContainer"></div>
    <div class="productSkeleton__contentContainer"></div>
  </div>
</template>

<script setup lang="ts">
  // Again, this is only a skeleton for better seo and less layout shift
</script>

<style scoped>
  .productSkeleton__base {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 180px 1fr;
    height: 100%;
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: 16px;
    min-height: 400px;
    position: relative;
    overflow: hidden;
  }

  .productSkeleton__slidingBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-loading 1s ease-in-out infinite;
    background: var(--gradient-skeleton);
  }

  .productSkeleton__imgContainer {
    border-radius: 16px 16px 0 0;
    background: white;
    height: 100%;
  }

  .productSkeleton__contentContainer {
    border-radius: 0 0 16px 16px;
    background: var(--color-background-soft);
  }

  @media (min-width: 576px) {
    .productSkeleton__base {
      grid-template-rows: 200px 1fr;
      min-height: 435px;
    }
  }

  @media (min-width: 992px) {
    .productSkeleton__base {
      grid-template-rows: 250px 1fr;
      min-height: 485px;
    }
  }

  @media (min-width: 1400px) {
    .productSkeleton__base {
      grid-template-rows: 300px 1fr;
      min-height: 540px;
    }
  }
</style>
