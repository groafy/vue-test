<template>
  <ul class="productRatings__list">
    <!-- Give meaningful label to describe this component -->
    <li
      v-for="i in 5"
      :key="i"
      class="productRatings__listItem"
      :aria-label="`Star ${i} of 5${roundedRate >= i ? ', filled' : ', empty'}`"
      role="img"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          :fill="roundedRate < i ? 'transparent' : 'gold'"
          stroke="currentColor"
          stroke-width="1"
          d="M9 0H7L5.51 4.58H.71l-.63 1.9 3.9 2.83-1.5 4.57 1.63 1.18L8 12.23l3.9 2.83 1.61-1.18-1.49-4.57 3.9-2.83-.62-1.9h-4.81L9 0Z"
        />
      </svg>
    </li>
    <li>
      <!-- Here visually only show to rate, but return a better more descriptive label for screen readers -->
      <span class="sr-only">{{ getRatingDescription() }}</span>
      <span aria-hidden="true" class="smallText">({{ rate }})</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { type IProductRating } from "@/types";
  interface IProps {
    ratings: IProductRating;
  }

  const getRatingDescription = () => {
    return `Rating: ${rate} out of 5`;
  };

  const { ratings } = defineProps<IProps>();
  const { rate } = ratings;
  const roundedRate = Math.floor(rate);
</script>

<style lang="css" scoped>
  .productRatings__list {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0;
    margin: 0;
    list-style: none;
  }
</style>
