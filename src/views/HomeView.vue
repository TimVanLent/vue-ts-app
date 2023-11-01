<template>
  <div class="home">
    <div class="home__inner">
      <div class="home__title-bar">
        <h1> Houses</h1>
        <router-link class="create-listing-nav" to="/create">
          <button class="create-listing-nav__button desktop">
            <img class="create-listing-nav__img" alt="Add listing icon" src="@/assets/images/ic_plus_white@3x.png"/>
            <span>Create Listing</span>
          </button>
          <img class="mobile create-listing-nav__img" alt="Add listing icon" src="@/assets/images/ic_plus_grey@3x.png"/>
        </router-link>
      </div>
      <SearchBar @search="searchHouses" @clear="clearSearch" v-model="searchTerm" @sort-price="sortHousesByPrice" @sort-size="sortHousesBySize" />
      <div v-if="filteredHouses.length" class="house-list">
        <div class="house-list__counter">
          <h2> {{filteredHouses.length}} results found</h2>
        </div>
        <HouseCard
          v-for="house in filteredHouses"
          :key="house.id"
          :house="house"
          @view-details="viewHouseDetails"
          @edit-house="editHouse"
          @delete-house="deleteHouse"
        />
      </div>
      <div v-else class="house-list--empty">
        <img src="@/assets/images/img_empty_houses@3x.png" alt="Placeholder image no result"/>
        <p>
          No results found. <br>
          Please try another keyword.
        </p>
      </div>
    </div>
    <delete-modal
      :show-modal="showDeleteModal"
      @confirm-delete="confirmDelete"
      @close-modal="closeDeleteModal"
    ></delete-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import HouseCard from '@/components/HouseCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import type { House } from '@/types/House';

const searchTerm = ref('');
const sortDirection = ref('');
const store = useStore();
const router = useRouter();
const allHouses = computed(() => store.getters.allHouses);
const circleStyle = ref({
  top: '0px',
  left: '0px',
});
const showDeleteModal = ref(false);
let houseToDelete: number | null;
const filteredHouses = computed(() => {
  const term = searchTerm.value.toLowerCase();
  if (term === '') {
    return allHouses.value;
  } else {
    return allHouses.value.filter((house: House) => {
      // Combine the street name, city, and zip code into a single string
      const fullAddress = `${house.location.street} ${house.location.city} ${house.location.postalCode}`;

      // Check if the search term is found in the full address
      return fullAddress.toLowerCase().includes(term);
    });
  }
});

// Watcher for filteredHouses
watch(filteredHouses, () => {
  // reinstall the mousemove event since
  // the houseCard get rebuild
  window.removeEventListener('mousemove', mouseMoveHandler);
  moveCircles();
});

onMounted(() => {
  store.dispatch('fetchHouses').then(() => {
    sortHouseByDate();
    moveCircles();
  })
});

const searchHouses = (term: string) => {
  searchTerm.value = term;
};

const clearSearch = () => {
  searchTerm.value = '';
};

const sortHouseByDate = () => {
  sortHouses('createdAt');
};

const sortHousesByPrice = () => {
  sortHouses('price');
};

const sortHousesBySize = () => {
  sortHouses('size');
};

const sortHouses = (property: string) => {
  allHouses.value.sort((a: House, b: House) => {
    // Determine the sort direction based on the current direction
    const direction = sortDirection.value === 'asc' ? 1 : -1;

    if (a[property] < b[property]) {
      return -1 * direction;
    } else if (a[property] > b[property]) {
      return 1 * direction;
    } else {
      return 0;
    }
  });

  // Toggle the sort direction for the next time
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
};

const viewHouseDetails = (houseId: number) => {
  router.push(`/details/${houseId}`);
};

const editHouse = (houseId: number) => {
  router.push(`/edit/${houseId}`);
};

const deleteHouse = (houseId: number) => {
  showDeleteModal.value = true;
  // Store the houseId in a data property to use it in the confirmDelete method
  houseToDelete = houseId;
};

const confirmDelete = () => {
  showDeleteModal.value = false;
  store.dispatch('deleteHouse', houseToDelete);
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

let cursorCircles: Array<Element> = [];
const mouseMoveHandler = (event: Event) => {
  if (cursorCircles.length) cursorCircles.forEach((el) => {
    const houseCard = el.closest('.house-card');
    const x = event.clientX - houseCard.getBoundingClientRect().left - el.getBoundingClientRect().width / 2;
    const y = event.clientY - houseCard.getBoundingClientRect().top - el.getBoundingClientRect().height / 2;

    // Update the element's style
    el.style.setProperty('--cursor-y', `${y}px`);
    el.style.setProperty('--cursor-x', `${x}px`);
    el.style.setProperty('display', 'block');
  });
};

// Function to move the circular cursor
const moveCircles = () => {
  // Add the event listener
  cursorCircles = [...document.querySelectorAll('.cursor-circle')];
  window.addEventListener('mousemove', mouseMoveHandler);
  // Remove the event listener when unmounted or destroyed
};

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', mouseMoveHandler);
});

</script>

<style scoped lang="scss">
/* Home view styles */
.home {
  $mobile-width: 768px;

  overflow: hidden;
  position: relative;
  margin: var(--spacing-xl) 0 0;

  &__inner {
    width: calc(100% - 2 * var(--spacing-m));
    max-width: var(--max-width);
    box-sizing: content-box;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
    overflow: hidden;
    height: 100%;

    @media (max-width: $mobile-width) {
      h1 { text-align: center; }
      gap: var(--spacing-xl);
    }

    .house-list {
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-m);
      padding-bottom: var(--spacing-xl);

      &--empty {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        img {
          padding: var(--spacing-xxl);
          max-height: 200px;
          max-width: calc(100vw - var(--spacing-m));
        }
      }
    }
  }

  .home__title-bar {
    position: relative;

    a {
      text-decoration: none;
    }
  }

  .create-listing-nav {
    position: absolute;
    top: 0;
    right: 0;
    &__button {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-s);
    }

    &__img {
      height: 20px;
    }
  }
}
</style>
