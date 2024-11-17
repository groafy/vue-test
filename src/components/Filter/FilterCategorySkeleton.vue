<template>
  <div class="filterCategorySkeleton__base" aria-hidden="true">
    <div class="filterCategorySkeleton__inputMock">
      <div class="filterCategorySkeleton__slidingBg"></div>
    </div>
    <div class="filterCategorySkeleton__labelMock">
      <div class="filterCategorySkeleton__slidingBg"></div>
    </div>
  </div>
</template>

<script setup>
  // This is only a loading skeleton and not a real component so thats why the aria-hidden
  // Using this so that there is no layout shift for better seo
</script>

<style lang="css" scoped>
  .filterCategorySkeleton__base {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .filterCategorySkeleton__inputMock {
    background: var(--color-background-mute);
    width: 24px;
    min-width: 24px;
    height: 24px;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }

  .filterCategorySkeleton__labelMock {
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 24px;
    background: var(--color-background-mute);
    border-radius: 4px;
  }

  .filterCategorySkeleton__slidingBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-loading 1s ease-in-out infinite;
    background: var(--gradient-skeleton);
  }
</style>
