<template>
  <header class="headerNav__base">
    <div class="headerNav__wrapper container--default">
      <div>
        <span>HelloWorldShop</span>
      </div>
      <div>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.3 5H21l-2 7H7.38M20 16H8L6 3H3m6 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm11 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>
      </div>
    </div>
  </header>
</template>

<script setup>

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
</style>
