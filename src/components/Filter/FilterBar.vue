<template>
  <section class="filterBar__base">
    <ul class="filterBar__list" v-if="!isLoading" aria-live="polite">
      <li v-for="category in categoriesReactive" :key="category.value" class="filterBar__listItem">
        <input type="checkbox" v-model="category.checked" class="checkbox-input" :id="getElementID(category.value)"
          @change="onInputChange($event, category)">
        <label :for="getElementID(category.value)">{{ category.displayName }} ({{ category.count }})</label>
      </li>
    </ul>
    <ul class="filterBar__list" v-if="isLoading" aria-busy="true" aria-live="polite"
      aria-label="Filter categories are loading">
      <li v-for="i in 4" :key="i">
        <FilterCategorySkeleton />
      </li>
    </ul>
    <button type="button" class="btn filterBar__resetBtn" v-show="hasSelectedValue && !isLoading"
      @click="onCategoryResetClicked">
      <span>Reset</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m16 8-8 8m0-8 8 8" />
      </svg>
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted, watch, computed } from "vue";
import { type ICategory } from '@/types';
import FilterCategorySkeleton from "./FilterCategorySkeleton.vue";

interface IProps {
  categories: ICategory[],
  isLoading: boolean,
  initCategories: string[]
}

interface ICategoryReactive extends ICategory {
  checked: boolean
}

const emit = defineEmits(["categoryChange", "categoryReset"]);
const props = defineProps<IProps>();

const getElementID = (value: string) => {
  return `element-${value.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "")}-id`;
}

const onCategoryResetClicked = () => {
  resetCategoriesSelected();
  emit('categoryReset');
}

const resetCategoriesSelected = () => {
  categoriesReactive.value.forEach(category => {
    category.checked = false;
  })
}

const onInputChange = (e: Event, category: ICategory) => {
  const checkbox = e.target as HTMLInputElement;

  emit('categoryChange', checkbox.checked, category.value);
}

const createReactiveCategories = () => {
  if (props.categories && props.categories.length) {
    categoriesReactive.value = [];

    props.categories.forEach(category => {
      categoriesReactive.value.push({
        ...category,
        checked: props.initCategories.includes(category.value) ? true : false
      })
    });

    categoriesReactive.value.sort((a, b) => b.count - a.count);
  }
}

const categoriesReactive = ref<Array<ICategoryReactive>>([]);
const hasSelectedValue = computed(() => {
  return !!categoriesReactive.value.find(x => x.checked);
});


onMounted(() => {
  watch(() => props.categories, () => {
    createReactiveCategories();
  });

  watch(() => props.initCategories, () => {
    createReactiveCategories();
  });
})

</script>

<style lang="css" scoped>
.filterBar__base {
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  grid-area: filter;
}

.filterBar__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  list-style: none;
}

.filterBar__listItem {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filterBar__listItem label {
  font-size: 1rem;
  cursor: pointer;
}

.filterBar__resetBtn {
  justify-content: space-between;
}

@media only screen and (min-width: 992px) {
  .filterBar__base {
    padding: 0;
  }
}
</style>
