<template>
  <HeaderNav />
  <main class="container--default">
    <!-- This title here is mainly for accesibility purposes, since I later
    on use h2 in the product items -->
    <h1 class="page-section-sm h1">Welcome to HelloWorld</h1>
    <ShopDisplay />
  </main>
</template>

<script setup lang="ts">
  import ShopDisplay from "@/components/ShopDisplay.vue";
  import HeaderNav from "@/components/HeaderNav.vue";
</script>

<style scoped></style>
