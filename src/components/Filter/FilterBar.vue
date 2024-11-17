<template>
  <!-- This could be an aside element but on mobile its not on the side
  and i dont feel the need for it to be in two seperate components -->
  <section class="filterBar__base" ref="parentRef">
    <!-- Show accordion only on mobile for scalability -->
    <button
      class="filterBar__toggle"
      :class="{ loading: isLoading }"
      :disabled="isLoading"
      @keydown="onAccordionKeyDown"
      @click="toggleFilterAccordion"
      :aria-expanded="isAccordionOpen"
      aria-controls="filterBar-list"
      ref="toggleRef"
      id="filter-accordion-toggle"
    >
      <span class="text">{{ toggleAccordionTitle }}</span>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m6 9 6 6 6-6"
        />
      </svg>
    </button>
    <!-- Accordion content (filter items) -->
    <!-- Here i am using v-show and v-if, reason being that the parent uses gap:24px and 
    it causes an offset when it is loaded, so i place it in the dom only after loading.
    v-show later is only for accordion controlls so that is doesnt need to be re-added when
    opening and closing accordion -->
    <div
      id="filterBar-list"
      @keydown="onAccordionKeyDown"
      class="filterBar__toggleContent"
      v-show="isAccordionOpen"
      v-if="!isLoading"
      role="region"
      aria-labelledby="filter-accordion-toggle"
    >
      <ul class="filterBar__list" v-if="!isLoading" aria-live="polite">
        <li
          v-for="category in categoriesReactive"
          :key="category.value"
          class="filterBar__listItem"
        >
          <input
            type="checkbox"
            v-model="category.checked"
            data-wp-filtercheck
            class="checkbox-input"
            :id="getElementID(category.value)"
            @change="onInputChange($event, category)"
          />
          <label :for="getElementID(category.value)" class="text"
            >{{ category.displayName }} ({{ category.count }})</label
          >
        </li>
      </ul>
    </div>
    <!-- Loading state with skeletons to combat layout shift -->
    <ul
      class="filterBar__list filterBar__list--loading"
      v-if="isLoading"
      aria-busy="true"
      aria-live="polite"
      aria-label="Filter categories are loading"
    >
      <li v-for="i in 4" :key="i">
        <FilterCategorySkeleton />
      </li>
    </ul>
    <!-- Button to reset all active filters -->
    <button
      type="button"
      class="btn filterBar__resetBtn"
      v-show="hasSelectedValue && !isLoading"
      @click="onCategoryResetClicked"
      aria-label="Reset all current active filter categories"
    >
      <span aria-hidden="true">Reset</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="m16 8-8 8m0-8 8 8"
        />
      </svg>
    </button>
  </section>
</template>

<script setup lang="ts">
  import { ref, defineEmits, onMounted, watch, computed } from "vue";
  import { type ICategory } from "@/types";
  import FilterCategorySkeleton from "./FilterCategorySkeleton.vue";

  interface IProps {
    categories: ICategory[];
    isLoading: boolean;
    initCategories: string[];
  }

  interface ICategoryReactive extends ICategory {
    checked: boolean;
  }

  const emit = defineEmits(["categoryChange", "categoryReset"]);
  const props = defineProps<IProps>();

  const getElementID = (value: string) => {
    // Remove special characters so it can be a valid html id
    return `element-${value
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "")}-id`;
  };

  const onCategoryResetClicked = () => {
    isAccordionOpen.value = false;
    resetCategoriesSelected();
    emit("categoryReset");
  };

  const resetCategoriesSelected = () => {
    categoriesReactive.value.forEach((category) => {
      category.checked = false;
    });
  };

  const onInputChange = (e: Event, category: ICategory) => {
    const checkbox = e.target as HTMLInputElement;

    emit("categoryChange", checkbox.checked, category.value);
  };

  // Function to create reactive categories from props to prevent prop mutations
  const createReactiveCategories = () => {
    if (!props.categories.length) return;

    categoriesReactive.value = props.categories
      .map((category) => ({
        ...category,
        checked: props.initCategories.includes(category.value),
      }))
      .sort((a, b) => b.count - a.count);
  };

  const toggleFilterAccordion = () => {
    isAccordionOpen.value = !isAccordionOpen.value;
  };

  const setFocus = (index: number, elements: HTMLInputElement[]) => {
    if (0 > index) {
      elements[elements.length - 1]?.focus();
    } else if (index > elements.length - 1) {
      elements[0]?.focus();
    } else {
      elements[index]?.focus();
    }
  };

  // Keyboard navigation for better accessibility
  const onAccordionKeyDown = (e: KeyboardEvent) => {
    const { key } = e;
    const activeElement = document.activeElement;
    const categoryInputElements = [
      ...(parentRef.value?.querySelectorAll(
        "[data-wp-filtercheck]"
      ) as unknown as HTMLInputElement[]),
    ];
    const indexOfElement = categoryInputElements.indexOf(
      activeElement as HTMLInputElement
    );

    switch (key) {
      case "Esc":
      case "Escape":
        if (!isAccordionOpen.value) break;

        isAccordionOpen.value = false;
        toggleRef.value?.focus();
        break;
      case "Down":
      case "ArrowDown":
        e.preventDefault();
        e.stopPropagation();

        setFocus(indexOfElement + 1, categoryInputElements);
        break;
      case "Up":
      case "ArrowUp":
        e.preventDefault();
        e.stopPropagation();

        setFocus(indexOfElement - 1, categoryInputElements);
        break;
      case "Home":
        e.preventDefault();
        e.stopPropagation();

        setFocus(0, categoryInputElements);
        break;

      case "End":
        e.preventDefault();
        e.stopPropagation();

        setFocus(-1, categoryInputElements);
        break;

      default:
        break;
    }
  };

  const categoriesReactive = ref<Array<ICategoryReactive>>([]);
  const isAccordionOpen = ref<boolean>(false);
  const parentRef = ref<HTMLSelectElement>();
  const toggleRef = ref<HTMLButtonElement>();
  // Only show reset button if at least one category is selected
  const hasSelectedValue = computed(() =>
    categoriesReactive.value.some((x) => x.checked)
  );
  // Title generated based on selected filters (or no filters)
  const toggleAccordionTitle = computed(() => {
    const selectedFilterCount = categoriesReactive.value.filter(
      (category) => category.checked
    ).length;

    if (selectedFilterCount === 0) {
      return "Filter by category...";
    }

    return `Applied filters (${selectedFilterCount})`;
  });

  onMounted(() => {
    createReactiveCategories();

    watch(
      () => props.categories,
      () => {
        createReactiveCategories();
      }
    );

    watch(
      () => props.initCategories,
      () => {
        createReactiveCategories();
      }
    );
  });
</script>

<style lang="css" scoped>
  .filterBar__base {
    display: flex;
    flex-direction: column;
    width: 100%;
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
    cursor: pointer;
  }

  .filterBar__resetBtn {
    justify-content: space-between;
  }

  .filterBar__list--loading {
    display: none;
  }

  .filterBar__toggle {
    display: flex;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    padding: 12px;
    border-radius: 8px;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: var(--color-text);
    position: relative;
    overflow: hidden;
  }

  .filterBar__toggle.loading {
    opacity: 0.66;
  }

  .filterBar__toggle.loading::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-loading 1s ease-in-out infinite;
    background: var(--gradient-skeleton);
  }

  .filterBar__toggle:focus-visible {
    outline: 2px solid var(--default-focus);
    outline-offset: 4px;
  }

  .filterBar__toggle svg {
    transition: transform var(--d-extrashort);
  }

  .filterBar__toggle[aria-expanded="true"] > svg {
    transform: rotate(180deg);
  }

  @media (min-width: 992px) {
    .filterBar__list--loading {
      display: flex;
    }

    .filterBar__toggle {
      display: none;
    }

    .filterBar__toggleContent {
      display: block !important;
    }
  }
</style>
