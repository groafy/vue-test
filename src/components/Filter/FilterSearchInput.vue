<template>
  <section class="filterSearchInput__base">
    <div class="filterSearchInput__inputContainer">
      <label for="search-input-filter">Search for products...</label>
      <input type="search" id="search-input-filter" placeholder="" class="filterSearchInput__inputItem"
        v-model="inputValue" autocomplete="off">
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";
import { debounce } from "@/utils";
interface IProps {
  initSearch: string
}

const props = defineProps<IProps>();
const emit = defineEmits(['searchChanged'])

const onInputChange = (newVal: string) => {
  // Could be done instantly but with search inputs its better to debounce the value to limit api calls
  emit('searchChanged', newVal);
};

const debouncedOnInputChange = debounce(onInputChange, 300);
const inputValue = ref(props.initSearch || "");

watch(
  () => inputValue.value,
  (newVal) => {
    debouncedOnInputChange(newVal);
  }
);

watch(
  () => props.initSearch,
  (newVal) => {
    inputValue.value = newVal;
  }
);
</script>

<style lang="css" scoped>
.filterSearchInput__base {
  grid-area: search;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 24px;
}

.filterSearchInput__inputContainer {
  display: flex;
  max-width: 700px;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: white;
  position: relative;
  height: 48px;
  transition: border-color var(--d-extrashort);
}

.filterSearchInput__inputContainer:hover {
  border-color: var(--color-border-hover);
}

.filterSearchInput__inputContainer label {
  position: absolute;
  bottom: calc(100% + 12px);
  transition: bottom var(--d-short);
  left: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: calc(100% - 24px);
  overflow: hidden;
  cursor: default;
}

.filterSearchInput__inputItem {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 12px;
  background: transparent;
}

.filterSearchInput__inputContainer:has(.filterSearchInput__inputItem:placeholder-shown)>label {
  bottom: 11px;
  cursor: text;
}

.filterSearchInput__inputContainer:has(.filterSearchInput__inputItem:focus-visible) {
  border-color: var(--default-focus);
  outline: 1px solid var(--default-focus);
}
</style>
