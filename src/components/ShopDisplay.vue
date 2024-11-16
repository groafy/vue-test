<template>
  <div class="shopDisplay__base page-section">
    <FilterBar />
    <ProductList :isLoading="isLoading" :products="productItems" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { IProductItem, ICategory } from "@/types";
import ProductList from "./Products/ProductList.vue";
import FilterBar from "./Filter/FilterBar.vue";

const getUrl = () => {
  return `https://fakestoreapi.com/products`;
}

const createCategories = (responseJson: IProductItem[]) => {
  const categoryMap: Map<string, { value: string; count: number }> = responseJson.reduce(
    (acc, item) => {
      const category = item.category.toLowerCase();

      if (!acc.has(category)) {
        acc.set(category, { value: category, count: 0 });
      }

      acc.get(category)!.count += 1;
      return acc;
    },

    new Map<string, { value: string; count: number }>()
  );

  return Array.from(categoryMap.values()).map(({ value, count }) => ({
    displayName: value.charAt(0).toUpperCase() + value.slice(1),
    value,
    count,
  }));
}

const loadProducts = async () => {
  try {
    isLoading.value = true;

    const response = await fetch(getUrl());
    const responseJson = await response.json();

    productItems.value = responseJson;
    productCategories.value = createCategories(responseJson);
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

const isLoading = ref<boolean>(false);
const productCategories = ref<Array<ICategory>>([]);
const productItems = ref<Array<IProductItem>>([]);

onMounted(() => {
  loadProducts();
})

</script>

<style scoped>
.shopDisplay__base {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media only screen and (min-width: 992px) {
  .shopDisplay__base {
    gap: 32px;
    grid-template-columns: 200px 1fr;
  }
}
</style>
