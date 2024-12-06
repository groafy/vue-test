<template>
  <div class="shopDisplay__base page-section">
    <FilterSearchInput
      @search-changed="onSearchChanged"
      :initSearch="searchTerm"
      :isLoading="isLoading"
    />
    <FilterBar
      :isLoading="isLoading"
      :categories="productCategories"
      :initCategories="urlCategories"
      @category-change="onCategoryChange"
      @category-reset="onCategoryReset"
    />
    <ProductList :isLoading="isLoading" :products="productsComputed" />
  </div>
</template>

<script setup lang="ts">
  // IMPORTANT - Im not using the vue suspense -> fallback method because I find it easier
  // to handle the data from the parent in this case (since multiple components use the same data)
  // Is only the product list used the api data it would be better to just use the suspense pattern
  // since I wouldnt have to track isLoading manually

  import { onMounted, ref, computed, onUnmounted } from "vue";
  import { type IProductItem, type ICategory } from "@/types";
  import ProductList from "./Products/ProductList.vue";
  import FilterBar from "./Filter/FilterBar.vue";
  import FilterSearchInput from "./Filter/FilterSearchInput.vue";

  const getUrl = () => {
    // Due to this task im using only one api url
    // But if this was a real project we could adapt this with the url params
    // Not needed here because I use computed for the filtering (not calling api)
    return `https://fakestoreapi.com/products`;
  };

  const createCategories = (responseJson: IProductItem[]) => {
    const categoryMap: Map<string, { value: string; count: number }> =
      responseJson.reduce(
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
  };

  const loadProducts = async () => {
    try {
      // Again, not using suspense here since pretty much all of the components
      // use the same data (wouldnt make sense to make them into async components)
      // so thats why i manually track isLoading
      isLoading.value = true;

      // For testing skeletons only
      // await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = await fetch(getUrl());
      const responseJson = await response.json();

      productItems.value = responseJson;
      productCategories.value = createCategories(responseJson);
    } catch (err) {
      console.error(err);
      // Would be better to show some toast instead of alert
      // since its not as annoying as an alert, but i didnt want
      // to add another dependency
      alert("There was an error loading the products.");
    } finally {
      isLoading.value = false;
    }
  };

  const checkAndUpdateUrlParams = () => {
    if (selectedCategories.value.length || searchTerm.value) {
      updateUrlParams();
    } else {
      resetUrlParams();
    }
  };

  const onCategoryReset = () => {
    selectedCategories.value = [];

    checkAndUpdateUrlParams();
  };

  // Differentiate between reset url params and update url params
  const resetUrlParams = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    params.delete("category");
    params.delete("search");

    history.pushState(null, "", url.pathname);
  };

  const updateUrlParams = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    params.delete("category");

    selectedCategories.value.forEach((category) => {
      params.append("category", category);
    });

    if (searchTerm.value) {
      params.set("search", searchTerm.value);
    } else {
      params.delete("search");
    }

    history.pushState(null, "", `${url.pathname}?${params.toString()}`);
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

    checkAndUpdateUrlParams();
  };

  const onSearchChanged = (value: string) => {
    searchTerm.value = value;

    checkAndUpdateUrlParams();
  };

  const updateFromUrl = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    searchTerm.value = params.get("search") || "";
    // Using this variable only for init so that
    // later it doesnt trigger unwanted rerenders of the filter component
    // This is only for getting the initial state from the url , later
    // is uses the selectedCategories for filtering etc..
    urlCategories.value = params.getAll("category");
    selectedCategories.value = urlCategories.value;
  };

  const isLoading = ref<boolean>(false);
  const productCategories = ref<Array<ICategory>>([]);
  const productItems = ref<Array<IProductItem>>([]);
  const selectedCategories = ref<Array<string>>([]);
  const searchTerm = ref<string>("");
  const urlCategories = ref<Array<string>>([]);

  const productsComputed = computed(() => {
    const searchTermLower = searchTerm.value.toLowerCase();
    // Using set so this function could grow later on, before it was .includes()
    const selectedCategorySet = new Set(selectedCategories.value);

    return productItems.value.filter((item) => {
      const matchesCategory = selectedCategorySet.size
        ? selectedCategorySet.has(item.category)
        : true;

      const matchesSearchTerm = item.title
        .toLowerCase()
        .includes(searchTermLower);

      return matchesCategory && matchesSearchTerm;
    });
  });

  onMounted(() => {
    // Load the products
    loadProducts();
    // Set previous items from url params
    updateFromUrl();

    // Watch for history change
    window.addEventListener("popstate", updateFromUrl);
  });

  onUnmounted(() => {
    // Remove history change listener to free memory
    window.removeEventListener("popstate", updateFromUrl);
  });
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

  @media (min-width: 992px) {
    .shopDisplay__base {
      gap: 32px;
      grid-template-columns: 200px 1fr;
      grid-template-areas:
        "search search"
        "filter content";
    }
  }
</style>
