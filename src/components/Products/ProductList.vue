<template>
  <section class="productList__base">
    <ul v-if="isLoading" class="productList__list">
      <li v-for="i in 20" :key="i" class="productList__listItem">
        <ProductSkeleton />
      </li>
    </ul>
    <ul class="productList__list" v-if="!isLoading">
      <li v-for="product in products" :key="product.id" class="productList__listItem">
        <ProductItem :item="product" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import ProductItem from "./ProductItem.vue";
import ProductSkeleton from "./ProductSkeleton.vue";
import { IProductItem } from "@/types";

interface IProps {
  products: IProductItem[],
  isLoading: boolean
}

const { products, isLoading } = defineProps<IProps>();
</script>

<style scoped>
.productList__base {
  width: 100%;
  grid-area: content;
}

.productList__list {
  display: grid;
  padding: 0;
  width: 100%;
  list-style: none;
  gap: 16px;
  text-indent: 0;
  grid-template-columns: 1fr;
}

.productList__listItem {
  width: 100%;
  height: 100%;
  text-indent: 0;
}

@media only screen and (min-width: 768px) {
  .productList__list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (min-width: 992px) {
  .productList__list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (min-width: 1200px) {
  .productList__list {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
