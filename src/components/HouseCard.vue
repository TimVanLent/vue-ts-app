<template>
  <!-- House Card -->
  <div class="house-card" @click="viewDetails">
    <!-- House Image -->
    <div class="house-card__img">
      <img :src="house.image" alt="House Image" />
    </div>
    <!-- House Info -->
    <div class="house-card__info">
      <h2>{{ `${house.location.street} ${house.location.houseNumber}` }}</h2>
      <div class="info-block__row">
        <p class="info-block__p info-block__p--semibold">&euro; {{ formatNumberWithCommas(house.price) }}</p>
      </div>
      <div class="info-block__row">
        <p class="info-block__p info-block__p--tertiary">{{ `${house.location.zip} ${house.location.city}` }}</p>
      </div>
      <div class="info-block__row">
        <!-- Icons for Bedrooms, Bathrooms, and Size -->
        <div class="icon-string">
          <img src="@/assets/images/ic_bed@3x.png" alt="Bedroom icon" class="info-block__icon" />
          <p class="info-block__p info-block__p--tertiary">{{ house.rooms.bedrooms }}</p>
        </div>
        <div class="icon-string">
          <img src="@/assets/images/ic_bath@3x.png" alt="Bathroom icon" class="info-block__icon" />
          <p class="info-block__p info-block__p--tertiary">{{ house.rooms.bathrooms }} </p>
        </div>
        <div class="icon-string">
          <img src="@/assets/images/ic_size@3x.png" alt="Sqft icon" class="info-block__icon" />
          <p class="info-block__p info-block__p--tertiary">{{ `${house.size} m²` }}</p>
        </div>
      </div>
    </div>
    <!-- Actions (Edit and Delete) -->
    <div v-if="house.madeByMe" class="house-card__actions">
      <img title="Edit house" src="@/assets/images/ic_edit@3x.png" @click.stop="editHouse" />
      <img title="Delete house" src="@/assets/images/ic_delete@3x.png" @click.stop="deleteHouse" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import type { House } from '@/types/House';

// Define props, emits, and functions
const props = defineProps({
  house: {
    type: Object as PropType<House>,
    required: true,
  },
});
const emit = defineEmits(["view-details", "edit-house", "delete-house"]);

// View details of the house
const viewDetails = () => {
  emit('view-details', props.house.id);
};

// Edit the house
const editHouse = () => {
  emit('edit-house', props.house.id);
};

// Delete the house
const deleteHouse = () => {
  emit('delete-house', props.house.id);
};

// Format a number with commas
const formatNumberWithCommas = (number: number) => {
  const numberString = number.toString();
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
</script>

<style scoped lang="scss">
/* House Card Styles */

$mobile-width: 768px;
$height: 250px;

.house-card {
  width: 100%;
  height: $height;
  display: flex;
  padding: var(--spacing-m);
  background: var(--background-color-secondary);
  gap: var(--spacing-m);
  position: relative;
  box-sizing: border-box;
  border-radius: var(--border-radius);

  @media (max-width: $mobile-width) {
    height: 150px;
    padding: var(--spacing-s);
  }

  &__info {
    display: flex;
    padding: var(--spacing-xs);
    padding-left: 0;
    flex-direction: column;
    justify-content: space-between;

    &__spatial {
      display: flex;
    }
  }

  &__actions {
    opacity: 0;
    position: absolute;
    top: var(--spacing-m);
    right: var(--spacing-m);
    transition: opacity 0.2s ease;

    img {
      cursor: pointer;
      height: 20px;

      + img {
        margin-left: var(--spacing-s);
      }
    }
  }

  &__img {
    height: calc($height - 2 * var(--spacing-m));
    width: calc($height - 2 * var(--spacing-m));
    overflow: hidden;
    border-radius: calc(#{var(--border-radius)} * .9);

    @media (max-width: $mobile-width) {
      $height: 150px;
      height: calc($height - 2 * var(--spacing-m));
      width: calc($height - 2 * var(--spacing-m));
    }

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .info-block {
    &__row {
      display: flex;
      gap: var(--spacing-s);
    }

    &__icon {
      height: 20px;

      + p {
        margin-left: var(--spacing-xs);
      }
    }

    &__p {
      &--tertiary {
        color: var(--color-tertiary-darker);
      }
    }
  }

  .icon-string {
    align-items: center;
    display: flex;
  }

  &:hover .house-card__actions {
    opacity: 1;
  }
}
</style>
