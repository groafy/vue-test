<template>
  <div class="productItem__base">
    <!-- In a real world app this could be a router-link to the product page, 
    but in this example we dont use router so this is just for show.  -->
    <!-- No need for a arialabel since its not an empty link, its using sr-only 
    text so screen readers can still read the content of where the link is heading -->
    <a href="#" class="productItem__link">
      <span class="sr-only">Go to {{ item.title }} product page</span>
    </a>
    <div class="productItem__imgContainer">
      <img
        class="productItem__imgItem"
        :src="item.image"
        :alt="'Product image for ' + item.title"
        width="275"
        height="235"
      />
      <div class="productItem__buttonContainer">
        <button
          type="button"
          class="btn btn--primary productItem__buttonItem"
          @click="addToCart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6.3 5H21l-2 7H7.38M20 16H8L6 3H3m6 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm11 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
            />
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
      <!-- Fallback button for when user doesnt have mouse so the hover effect wouldnt trigger -->
      <div class="productItem__buttonFallbackContainer">
        <button
          type="button"
          class="productItem__buttonFallbackItem"
          @click="addToCart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6.3 5H21l-2 7H7.38M20 16H8L6 3H3m6 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm11 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
            />
          </svg>
          <span class="sr-only">Add to Cart</span>
        </button>
      </div>
    </div>
    <div class="productItem__content">
      <div class="productItem__textContainer">
        <h2 class="productItem__textTitle h6">{{ item.title }}</h2>
        <p class="productItem__textDescription smallText">
          {{ item.description }}
        </p>
      </div>
      <div class="productItem__infoContainer">
        <ProductRatings :ratings="item.rating" />
        <span class="productItem__infoPrice introText">
          {{ formattedPrice(item.price) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ProductRatings from "./ProductRatings.vue";
  import { type IProductItem } from "@/types";

  interface IProps {
    item: IProductItem;
  }

  const { item } = defineProps<IProps>();

  const addToCart = (e: Event) => {
    // Here it would be a good idea to store the product in a store
    // for example useActiveCartStore -> add product
    e.stopPropagation();

    alert("Added to fake cart");
  };

  // Format price to have everything in the same format
  const formattedPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };
</script>

<style lang="css" scoped>
  .productItem__base {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 180px 1fr;
    height: 100%;
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: 16px;
    transition: border-color var(--d-short);
    position: relative;

    @media (min-width: 576px) {
      grid-template-rows: 200px 1fr;
    }

    @media (min-width: 992px) {
      grid-template-rows: 250px 1fr;
    }

    @media (min-width: 1400px) {
      grid-template-rows: 300px 1fr;
    }
  }

  .productItem__base:hover {
    border-color: var(--color-border-hover);
  }

  .productItem__base:hover .productItem__content {
    background: var(--color-background-mute);
  }

  .productItem__link {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 20;
    border-radius: 16px;
    inset: 0;
  }

  .productItem__link:focus-visible {
    outline: 2px solid var(--default-focus);
    outline-offset: 4px;
  }

  .productItem__imgContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: white;
    width: 100%;
    padding: 32px;
    border-radius: 16px 16px 0 0;
  }

  .productItem__imgItem {
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .productItem__buttonContainer {
    position: absolute;
    z-index: 35;
    top: 132px;
    padding: 0 12px;
    width: 100%;

    @media (min-width: 576px) {
      top: 152px;
    }

    @media (min-width: 992px) {
      top: 202px;
    }

    @media (min-width: 1400px) {
      top: 252px;
    }
  }

  .productItem__buttonItem {
    opacity: 0;
    width: 100%;
    justify-content: center;
    transition: transform var(--d-short), opacity var(--d-extrashort),
      background var(--d-short);
  }

  .productItem__base:hover .productItem__buttonItem {
    opacity: 1;
    transform: translateY(-12px);
  }

  .productItem__buttonItem:focus-visible {
    outline: 2px solid var(--default-focus);
    outline-offset: 4px;
    opacity: 1;
    transform: translateY(-12px);
  }

  /* Needed here to be able to see with enough contrast with the image */
  .productItem__buttonItem:hover {
    box-shadow: var(--bs-active);
  }

  .productItem__content {
    z-index: 15;
    padding: 16px;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    flex-direction: column;
    gap: 24px;
    border-radius: 0 0 16px 16px;
    background: var(--color-background-soft);
    transition: background var(--d-extrashort);
  }

  .productItem__textContainer {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  /* Using lineclamp for better visuals and make the product cards more readable
  Some of the text is too long and doesnt look good when displayed */
  .productItem__textTitle {
    display: -webkit-box;
    overflow: hidden;
    line-clamp: 2;
    margin: 0;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    width: 100%;
    word-break: break-all;
    overflow-wrap: break-word;
    white-space: normal;
  }

  .productItem__textDescription {
    display: -webkit-box;
    overflow: hidden;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    margin: 0;
    width: 100%;
    word-break: break-all;
    overflow-wrap: break-word;
    white-space: normal;
  }

  .productItem__infoContainer {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .productItem__infoPrice {
    font-weight: bold;
    color: var(--color-heading);
  }

  .productItem__buttonFallbackContainer {
    display: none;
    position: absolute;
    z-index: 35;
    top: 8px;
    right: 8px;
  }

  .productItem__buttonFallbackItem {
    border-radius: 50%;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    background: rgba(255, 255, 255, 0.66);
    color: var(--color-active);
    backdrop-filter: blur(4px);
  }

  .productItem__buttonFallbackItem:focus-visible {
    outline: 2px solid var(--default-focus);
    outline-offset: 3px;
  }

  /* When there is no cursor, hover wount work so that why i switch to a fallback button
  that has the same functionality, just accessible on mobile */
  @media (pointer: none), (pointer: coarse) {
    .productItem__buttonItem {
      display: none;
    }

    .productItem__buttonFallbackContainer {
      display: block;
    }
  }
</style>
