<template>
  <div class="details">
    <div class="details__inner">
      <router-link class="go-back" to="/">
        <img src="@/assets/images/ic_back_grey@3x.png" alt="go back icon" class="desktop go-back__icon" />
        <img src="@/assets/images/ic_back_white@3x.png" alt="go back icon" class="mobile go-back__icon" />
        <p class="go-back__p desktop"> Back to overview </p>
      </router-link>
      <HouseDetails v-if="house"
        :house="house"
        @edit-house="editHouse"
        @delete-house="deleteHouse"
      />
    </div>
    <delete-modal
      :show-modal="showDeleteModal"
      @confirm-delete="confirmDelete"
      @close-modal="closeDeleteModal"
    ></delete-modal>
  </div>
</template>

<script setup lang="ts">
import { type PropType, ref, onMounted, computed } from 'vue';
import HouseDetails from '@/components/HouseDetails.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import { type House } from '@/types/House';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();
const router = useRouter();

// Use the route parameter to get the house ID
const houseId = ref(route.params.id).value;
const house = computed(() => {
  // Get the house by ID from the store
  return store.getters.getHouseById(houseId);
});

const initialHouseData = ref(house.value);

// Fetch all houses when the component is mounted
onMounted(async () => {
  await store.dispatch('fetchHouse', houseId);
  // Update the initialHouseData with the fetched data
  initialHouseData.value = house.value;
});

const editHouse = (houseId: number) => {
  router.push(`/edit/${houseId}`);
};

const showDeleteModal = ref(false);
let houseToDelete: number | null;

const deleteHouse = (houseId: number) => {
  showDeleteModal.value = true;
  // Store the houseId in a data property to use it in the confirmDelete method
  houseToDelete = houseId;
}

const confirmDelete = () => {
  showDeleteModal.value = false;
  store.dispatch('deleteHouse', houseToDelete);
  router.push('/');
}

const closeDeleteModal = () => {
  showDeleteModal.value = false;
}
</script>

<style scoped lang="scss">
/* House details styles */
$mobile-width: 768px;

.details {
  overflow: auto;
  position: relative;
  margin: var(--spacing-m) 0 0;

  @media (max-width: $mobile-width) {
    flex: 1;
    margin: 0;
  }

  &__inner {
    width: calc(100% - 2 * var(--spacing-m));
    max-width: var(--max-width);
    box-sizing: content-box;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
    height: 100%;
    padding-bottom: var(--spacing-m);

    @media (max-width: $mobile-width) {
      width: 100%;
    }
  }

  .go-back {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: var(--spacing-m) 0;
    text-decoration: none;
    color: unset;
    &__p {
      white-space: nowrap;
    }

    &__icon {
      height: 20px;
      + p {margin-left: var(--spacing-xs)}
    }

    @media (max-width: $mobile-width) {
      position: absolute;
      z-index: 2;
      left: var(--spacing-m);
    }
  }

}
</style>
