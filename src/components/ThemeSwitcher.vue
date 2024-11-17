<template>
  <label
    class="themeSwitcher__base"
    aria-label="Toggle dark mode"
    role="switch"
  >
    <span class="themeSwitcher__thumb">
      <svg
        v-if="!isDark"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m-8-9H3m3.31-5.69L5.5 5.5m12.19.81.81-.81M6.31 17.69l-.81.81m12.19-.81.81.81M21 12h-1m-4 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
        />
      </svg>
      <svg
        v-else
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3.32 11.68a9 9 0 0 0 17.36 3.35A8.99 8.99 0 0 1 8.96 3.33a9 9 0 0 0-5.64 8.35Z"
        />
      </svg>
    </span>
    <input
      type="checkbox"
      v-model="isDark"
      class="themeSwitcher__input"
      @change="onThemeSwitcherChange"
    />
  </label>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";

  const onThemeSwitcherChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const checked = input.checked;

    setValue(checked);
  };

  const setValue = (value: boolean, changeRefValue: boolean = false) => {
    if (value) {
      document.documentElement.classList.add(CLASS_DARK);
      document.documentElement.classList.remove(CLASS_LIGHT);
    } else {
      document.documentElement.classList.add(CLASS_LIGHT);
      document.documentElement.classList.remove(CLASS_DARK);
    }

    if (changeRefValue) {
      isDark.value = value;
    }
  };

  const isDark = ref<boolean>(false);
  const CLASS_DARK = "dark";
  const CLASS_LIGHT = "light";

  onMounted(() => {
    setValue(
      window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      true
    );

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        setValue(event.matches, true);
      });
  });
</script>

<style lang="css" scoped>
  .themeSwitcher__base {
    padding: 4px;
    background: var(--color-background);
    border: 1px solid var(--color-border-hover);
    border-radius: 360px;
    width: 64px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    transition: background 300ms;
  }

  .themeSwitcher__base:has(.themeSwitcher__input:checked)
    .themeSwitcher__thumb {
    transform: translateX(calc(100% + 2px));
  }

  .themeSwitcher__base:has(.themeSwitcher__input:focus-visible) {
    outline: 2px solid var(--default-focus);
    outline-offset: 4px;
  }

  .themeSwitcher__thumb {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-background-mute);
    border: 1px solid var(--color-border-hover);
    border-radius: 360px;
    transition: transform 300ms;
  }

  .themeSwitcher__input {
    appearance: none;
  }
</style>
