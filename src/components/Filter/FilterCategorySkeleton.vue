<template>
  <div class="filterCategorySkeleton__base">
    <div class="filterCategorySkeleton__inputMock">
      <div class="filterCategorySkeleton__slidingBg"></div>
    </div>
    <div class="filterCategorySkeleton__labelMock">
      <div class="filterCategorySkeleton__slidingBg"></div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.filterCategorySkeleton__base {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filterCategorySkeleton__inputMock {
  background: gray;
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
  background: gray;
  border-radius: 4px;
}

.filterCategorySkeleton__slidingBg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: skeleton-loading 1s ease-in-out infinite;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 12%, rgba(209, 209, 209, 0.5) 44%, rgba(255, 255, 255, 0) 76%);
}
</style>
