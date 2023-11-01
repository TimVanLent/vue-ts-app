<template>
  <!-- Search Bar Wrapper -->
  <div class="search-bar__wrapper">
    <!-- Search Bar -->
    <div class="search-bar">
      <div class="search-bar__input-wrapper">
        <!-- Search Icon -->
        <img src="@/assets/images/ic_search@3x.png" alt="Search Icon" class="search-bar__icon" />
        <!-- Search Input -->
        <input v-model="searchTerm" @input="onSearchInput" class="search-bar__input" placeholder="Search for houses..." />
        <!-- Clear Icon (if search term is present) -->
        <img
          v-if="searchTerm"
          src="@/assets/images/ic_clear@3x.png"
          alt="Clear Icon"
          class="search-bar__clear-icon"
          @click="clearSearch"
        />
      </div>
    </div>
    <!-- Sort Switch Buttons -->
    <div class="search-bar__sort-switch">
      <button
        :class="{ active: sortType === 'Price' }"
        @click="setSortType('Price')"
        class="search-bar__sort-button"
      >
        Price
      </button>
      <button
        :class="{ active: sortType === 'Size' }"
        @click="setSortType('Size')"
        class="search-bar__sort-button"
      >
        Size
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define props, emits, and functions
const emit = defineEmits(["search", "clear", "sort-price", "sort-size"]);
const searchTerm = ref('');
let searchTimeout: number;
const sortType = ref('');

// Handle search input
const onSearchInput = () => {
  if (searchTimeout) clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    emit('search', searchTerm.value);
  }, 500);
};

// Clear search
const clearSearch = () => {
  searchTerm.value = '';
  emit('clear');
};

// Set sort type and emit sort events
const setSortType = (type: string) => {
  sortType.value = type;
  if (type === 'Price') {
    emit('sort-price');
  } else if (type === 'Size') {
    emit('sort-size');
  }
};
</script>

<style scoped lang="scss">
/* Search Bar Styles */
$mobile-width: 768px;
$icon-height: 24px;

.search-bar {
  display: flex;
  align-items: center;
  background: var(--color-tertiary);
  padding: 10px;
  border-radius: var(--border-radius);
  max-width: 320px;
  width: 100%;

  @media (max-width: $mobile-width) {
    min-width: 100%;
    box-sizing: border-box;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-m);

    @media (max-width: $mobile-width) {
      flex-direction: column;
    }
  }

  &__icon {
    width: $icon-height;
    height: $icon-height;
  }

  &__clear-icon {
    width: $icon-height;
    height: $icon-height;
    cursor: pointer;
  }

  &__input-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 var(--spacing-xs);
    background: transparent;
    font-size: 16px;
  }

  &__sort-switch {
    display: flex;
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  &__sort-button {
    flex: 1;
    padding: var(--spacing-xs) 0;
    text-align: center;
    cursor: pointer;
    background: var(--color-tertiary-darker);
    color: white;
    width: 8rem;
    border: none;
    border-radius: 0;

    &.active {
      background: var(--color-primary);
    }
  }
}
</style>
