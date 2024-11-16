<template>
  <div class="productItem__base">
    <a href="#" class="productItem__link" :aria-label="`Go to ${item.title} product page`">
      <span class="sr-only">Go to {{ item.title }} product page</span>
    </a>
    <div class="productItem__imgContainer">
      <img class="productItem__imgItem" :src="item.image" :alt="'Product image for ' + item.title" width="275"
        height="235">
      <div class="productItem__buttonContainer">
        <button type="button" class="btn productItem__buttonItem" @click="addToCart">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
            aria-hidden="true">
            <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6.3 5H21l-2 7H7.38M20 16H8L6 3H3m6 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm11 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
    <div class="productItem__content">
      <div class="productItem__textContainer">
        <h2 class="productItem__textTitle h6">{{ item.title }}</h2>
        <p class="productItem__textDescription smallText">{{ item.description }}</p>
      </div>
      <div class="productItem__infoContainer">
        <ProductRatings :ratings="item.rating" />
        <span class="productItem__infoPrice introText">$ {{ item.price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductRatings from "./ProductRatings.vue";
import { type IProductItem } from '@/types';

interface IProps {
  item: IProductItem
}

const { item } = defineProps<IProps>();

const addToCart = (e: Event) => {
  e.stopPropagation();

  alert("Added to cart")
}

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
}

.productItem__buttonItem {
  opacity: 0;
  transition: transform var(--d-short), opacity var(--d-extrashort);
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
}

@media only screen and (min-width: 768px) {
  .productItem__base {
    grid-template-rows: 200px 1fr;
  }

  .productItem__buttonContainer {
    top: 152px;
  }
}

@media only screen and (min-width: 992px) {
  .productItem__base {
    grid-template-rows: 250px 1fr;
  }

  .productItem__buttonContainer {
    top: 202px;
  }
}

@media only screen and (min-width: 1200px) {
  .productItem__base {
    grid-template-rows: 300px 1fr;
  }

  .productItem__buttonContainer {
    top: 252px;
  }
}

@media (pointer:none),
(pointer:coarse) {
  .productItem__buttonItem {
    opacity: 1;
    transform: translateY(-12px);
  }
}
</style>
