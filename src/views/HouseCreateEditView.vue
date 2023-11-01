<template>
  <div class="house-create-edit-view">
    <div class="house-create-edit-view__inner">
      <router-link class="go-back" :to="goBackRoute">
        <img src="@/assets/images/ic_back_grey@3x.png" alt="go back icon" class="go-back__icon" />
        <p class="go-back__p">{{ goBackText }}</p>
      </router-link>
      <div class="house-create-edit-view__title">
        <h1>{{ pageTitle }}</h1>
      </div>
      <HouseForm class="house-create-edit-view__form" :house="house" @submit="handleSubmit" />
    </div>
    <div class="house-create-edit-view__background">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import HouseForm from '@/components/HouseForm.vue';
import type { HouseFormData } from '@/types/House';

const route = useRoute();
const router = useRouter();
const store = useStore();

const house = ref(null);
const pageTitle = computed(() => route.params.id ? 'Edit Listing' : 'Create Listing');
const goBackRoute = route.params.id ? `/details/${route.params.id}` : '/';
const goBackText = route.params.id ? 'Back to Details' : 'Back to Overview';

const handleSubmit = async ({ formData, image }: { formData: HouseFormData; image: string }) => {
  try {
    if (route.params.id) {
      await Promise.all([
        store.dispatch('editHouse', {
          houseId: route.params.id,
          updatedHouseData: formData,
        }),
        store.dispatch('uploadImage', {
          houseId: route.params.id,
          image,
        }),
      ]);

      router.push(`/details/${route.params.id}`);
    } else {
      const house = await store.dispatch('createHouse', formData);
      await store.dispatch('uploadImage', {
        houseId: house.id,
        image,
      });

      router.push(`/details/${house.id}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

</script>

<style scoped lang="scss">
/* HouseCreateEditView styles */

.go-back {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: unset;
  margin-bottom: var(--spacing-s);
  z-index: 2;

  &__icon {
    width: 20px;
    height: 20px;
    margin-right: var(--spacing-xs);
  }

  &__p {
    font-size: 16px;
  }
}

.house-create-edit-view {
  overflow: auto;
  position: relative;
  padding: var(--spacing-xl) 0;

  &__background {
    background: url(/src/assets/images/img_background@3x.png);
    background-size: cover;
    position: fixed;
    inset: 0;
    pointer-events: none;
  }
  &__title {
    z-index: 1;
  }
  &__inner {
    width: calc(100% - 2 * var(--spacing-m));
    box-sizing: content-box;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);
    height: 100%;
    max-width: var(--max-width);
  }
  &__form {
    z-index: 1;
  }

  .house-form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    padding-bottom: var(--spacing-xl);
  }
}
</style>
