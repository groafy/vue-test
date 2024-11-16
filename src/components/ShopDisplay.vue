<template>
  <div class="shopDisplay__base page-section">
    <FilterSearchInput />
    <FilterBar :isLoading="isLoading" :categories="productCategories" @category-change="onCategoryChange"
      @category-reset="onCategoryReset" />
    <ProductList :isLoading="isLoading" :products="productsComputed" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { IProductItem, ICategory } from "@/types";
import ProductList from "./Products/ProductList.vue";
import FilterBar from "./Filter/FilterBar.vue";
import FilterSearchInput from "./Filter/FilterSearchInput.vue";

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

const onCategoryReset = () => {
  selectedCategories.value = [];

  resetUrlParams();
}

const resetUrlParams = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  params.delete('category');

  history.pushState(null, '', url.pathname);
};

const updateUrlParams = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  params.delete('category');

  selectedCategories.value.forEach(category => {
    params.append('category', category);
  });

  history.pushState(null, '', `${url.pathname}?${params.toString()}`);
};

const onCategoryChange = (value: boolean, key: string) => {
  if (value) {
    selectedCategories.value.push(key);
  } else {
    const indexOfCategory = selectedCategories.value.indexOf(key);

    if (indexOfCategory !== -1) {
      selectedCategories.value.splice(indexOfCategory, 1);
    }
  }

  updateUrlParams();
}

const isLoading = ref<boolean>(false);
const productCategories = ref<Array<ICategory>>([]);
const productItems = ref<Array<IProductItem>>([]);
const selectedCategories = ref<Array<string>>([]);
const productsComputed = computed(() => {
  if (!selectedCategories.value.length) {
    return productItems.value;
  }

  return productItems.value.filter(item =>
    selectedCategories.value.includes(item.category)
  );
})

onMounted(() => {
  loadProducts();
})

</script>

<style scoped>
.shopDisplay__base {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  grid-template-areas:
    "search"
    "filter"
    "content";
}

@media only screen and (min-width: 992px) {
  .shopDisplay__base {
    gap: 32px;
    grid-template-columns: 200px 1fr;
    grid-template-areas: "search search"
      "filter content";
  }
}
</style>
