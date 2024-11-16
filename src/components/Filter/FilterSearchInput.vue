<template>
  <section class="filterSearchInput__base">
    <div class="filterSearchInput__inputContainer">
      <label for="search-input-filter" class="text">Search for products...</label>
      <input :disabled="isLoading" type="search" id="search-input-filter" placeholder=""
        class="filterSearchInput__inputItem text" v-model="inputValue" autocomplete="off">
      <button type="button" class="filterSearchInput__resetBtn" v-show="inputValue.length" @click="resetInput">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="m16 8-8 8m0-8 8 8" />
        </svg>
        <span class="sr-only">Reset search input</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
// TODO DISABLE INPUT ON LOADING
import { ref, watch, defineEmits } from "vue";
import { debounce } from "@/utils";
interface IProps {
  initSearch: string,
  isLoading: boolean
}

const props = defineProps<IProps>();
const emit = defineEmits(['searchChanged'])

const onInputChange = (newVal: string) => {
  // Could be done instantly but with search inputs its better to debounce the value to limit api calls
  emit('searchChanged', newVal);
};

const resetInput = () => {
  inputValue.value = "";
}

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
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-background);
  position: relative;
  height: 48px;
  transition: border-color var(--d-extrashort), background var(--d-short);

  @media (min-width: 992px) {
    max-width: 700px;
  }
}

.filterSearchInput__inputContainer:hover {
  border-color: var(--color-border-hover);
  background: var(--color-background-mute);
}

.filterSearchInput__inputContainer:has(input:disabled) {
  opacity: 0.66;
  pointer-events: none;
}

.filterSearchInput__inputContainer label {
  position: absolute;
  bottom: calc(100% + 12px);
  transition: bottom var(--d-extrashort);
  left: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: calc(100% - 24px);
  overflow: hidden;
  cursor: default;
  pointer-events: none;
}

.filterSearchInput__inputItem {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 12px;
  background: transparent;
  color: var(--text);
}

.filterSearchInput__inputItem::-webkit-search-cancel-button {
  display: none;
}

.filterSearchInput__inputContainer:has(.filterSearchInput__inputItem:placeholder-shown)>label {
  bottom: 10px;
  cursor: text;
}

.filterSearchInput__inputContainer:has(.filterSearchInput__inputItem:focus-visible) {
  border-color: var(--default-focus);
  outline: 1px solid var(--default-focus);
}

.filterSearchInput__resetBtn {
  position: absolute;
  height: 48px;
  width: 48px;
  right: 0;
  top: 0;
  background: transparent;
  outline: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: var(--text);
  padding: 0;
}

.filterSearchInput__resetBtn:focus-visible {
  outline: 2px solid var(--default-focus);
  outline-offset: 3px;
}
</style>
