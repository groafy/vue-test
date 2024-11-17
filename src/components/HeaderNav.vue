<template>
  <header class="headerNav__base">
    <div class="headerNav__wrapper container--default">
      <!-- In a realworld app this would probably be a router link, 
      but in this example we dont use router so this is just for show -->
      <div class="headerNav__logoContainer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 32 32"
        >
          <path fill="#41B883" d="m2 4 14 24L30 4h-5.5L16 18.5 7.5 4H2Z" />
          <path
            fill="#35495E"
            d="M7.5 4 16 18.5 24.5 4h-5l-3.43 6.01L12.5 4h-5Z"
          />
        </svg>
        <span class="introText headerNav__logoTitle">HelloWorldShop</span>
      </div>
      <div class="headerNav__controlsContainer">
        <ThemeSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  // This component is mainly just to test that the themes work
  import ThemeSwitcher from "./ThemeSwitcher.vue";
</script>

<style lang="css" scoped>
  .headerNav__base {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    padding: 12px 0;
    z-index: 100;
    background: var(--color-background);
    border-bottom: 1px solid var(--color-border);
  }

  .headerNav__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .headerNav__controlsContainer {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .headerNav__logoContainer {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .headerNav__logoTitle {
    font-weight: 700;
    color: var(--color-heading);
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    clip: rect(0, 0, 0, 0);
  }

  @media (min-width: 992px) {
    .headerNav__logoTitle {
      position: static;
      overflow: visible;
      width: auto;
      height: auto;
      clip: auto;
    }
  }
</style>
