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
    <div v-if="!isLoading && !products.length" class="productList__notFoundContainer">
      <div class="productList__notFoundWrapper">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="124" height="124" fill="none"
          viewBox="-20 0 190 190">
          <path fill="#000" fill-rule="evenodd"
            d="m38.16 140.47 10.83-78.36 43.88 4.95L111.44 91l-8.04 57.11-65.25-7.65ZM84 94l4.82-22.2-34.78-3.5-9.86 67.16 54.14 6.62 6.55-45.27L84 94Zm-24.24 29.6c-.38-.5-3.72-3.3-4.35-4.17 8.9-9.9 30.63-9.79 36.66 3.33-1 .37-5.49 2.31-6.37 2.8-2.52-7.31-17.27-9.62-25.94-1.97ZM76.5 96.5l-3.66 2.76-5.52-6.64-7.5 4.03-3.03-5.07 6.83-3.43-4.53-5.45 5.5-3.68 4.39 6.44 7.82-3.93 2.35 4.73-7.04 3.79 4.4 6.45Z"
            clip-rule="evenodd" />
        </svg>
        <span>No products found</span>
      </div>
    </div>
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

.productList__notFoundContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.productList__notFoundWrapper {
  display: flex;
  align-items: center;
  gap: 12px;
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
