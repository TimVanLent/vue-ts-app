<template>
  <!-- House Details -->
  <div class="house-details">
    <!-- House Image -->
    <div class="house-details__img">
      <img :src="house.image" alt="House Image" />
      <div class="house-details__img-overlay mobile"></div>
    </div>
    <!-- Information Block -->
    <div class="house-details__info">
      <div class="icon-string">
        <!-- House Location -->
        <h1>{{ house.location.street + ' ' + house.location.houseNumber }}</h1>
        <!-- Edit and Delete Actions (if made by the user) -->
        <div v-if="house.madeByMe" class="house-details__actions">
          <img title="Edit house" src="@/assets/images/ic_edit@3x.png" @click.stop="editHouse" />
          <img title="Delete house" src="@/assets/images/ic_delete@3x.png" @click.stop="deleteHouse" />
          <img title="Edit house" class="mobile" src="@/assets/images/ic_edit_white@3x.png" @click.stop="editHouse" />
          <img title="Delete house" class="mobile" src="@/assets/images/ic_delete_white@3x.png" @click.stop="deleteHouse" />
        </div>
      </div>
      <div class="house-details__specs">
        <!-- Location with ZIP and City -->
        <div class="icon-string">
          <img src="@/assets/images/ic_location@3x.png" alt="Location icon" class="info-block__icon" />
          <p class="info-block__p info-block__p--semibold">{{ house.location.zip + ' ' + house.location.city }}</p>
        </div>
        <!-- Price, Size, and Construction Year -->
        <div class="info-block__row">
          <div class="icon-string">
            <img src="@/assets/images/ic_price@3x.png" alt="Price icon" class="info-block__icon" />
            <p class="info-block__p info-block__p--tertiary info-block__p--semibold">{{ formatNumberWithCommas(house.price) }}</p>
          </div>
          <div class="icon-string">
            <img src="@/assets/images/ic_size@3x.png" alt="Sqft icon" class="info-block__icon" />
            <p class="info-block__p info-block__p--tertiary info-block__p--semibold">{{ house.size }} m<sup>2</sup></p>
          </div>
          <div class="icon-string">
            <img src="@/assets/images/ic_construction_date@3x.png" alt="Build icon" class="info-block__icon" />
            <p class="info-block__p info-block__p--tertiary info-block__p--semibold">Built in {{ house.constructionYear }}</p>
          </div>
        </div>
        <!-- Bedrooms, Bathrooms, and Garage -->
        <div class="info-block__row">
          <div class="icon-string">
            <img src="@/assets/images/ic_bed@3x.png" alt="Bedroom icon" class="info-block__icon" />
            <p class="info-block__p info-block__p--tertiary">{{ house.rooms.bedrooms }}</p>
          </div>
          <div class="icon-string">
            <img src="@/assets/images/ic_bath@3x.png" alt="Bathroom icon" class="info-block__icon" />
            <p class="info-block__p info-block__p--tertiary">{{ house.rooms.bathrooms }}</p>
          </div>
          <div class="icon-string">
            <img src="@/assets/images/ic_garage@3x.png" alt="Garage icon" class="info-block__icon" />
            <p class="info-block__p info-block__p--tertiary">{{ house.hasGarage ? "Yes" : "No" }}</p>
          </div>
        </div>
      </div>
      <!-- House Description -->
      <div class="info-block__row">
        <p class="info-block__description">{{ house.description }}</p>
      </div>
      <!-- Add more details as needed -->
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
const emit = defineEmits(["delete-house", "edit-house"]);

// Edit the house
const editHouse = () => {
  emit('edit-house', props.house.id);
}

// Delete the house
const deleteHouse = () => {
  emit('delete-house', props.house.id);
}

// Format a number with commas
const formatNumberWithCommas = (number: number) => {
  const numberString = number.toString();
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
</script>

<style scoped lang="scss">
/* House Details Styles */
$mobile-width: 768px;

.house-details {
  display: flex;
  flex-direction: row;
  position: relative;

  @media (max-width: $mobile-width) {
    margin: 0;
    flex: 1;
    flex-direction: column;
  }

  &__actions {
    position: absolute;
    top: var(--spacing-m);
    right: var(--spacing-m);
    transition: opacity 0.2s ease;
    display: flex;

    img {
      cursor: pointer;
      height: 20px;

      + img {
        margin-left: var(--spacing-s);
      }

      &.mobile {
        display: none;
      }

      @media (max-width: $mobile-width) {
        display: none;

        &.mobile {
          display: block;
        }
      }
    }
  }

  &__specs {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
  }

  &__img {
    flex: 1.5;
    width: 100%;
    position: relative;

    @media (max-width: $mobile-width) {
      flex: 1;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 30%);
    z-index: 1;
  }

  &__info {
    flex: 1;
    background: var(--background-color-secondary);
    padding: var(--spacing-m);
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: flex-start;
    gap: var(--spacing-xl);
    z-index: 1;

    &__spatial {
      display: flex;
    }

    @media (max-width: $mobile-width) {
      position: unset;
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
        white-space: nowrap;
      }
    }

    &__p {
      &--tertiary {
        color: var(--color-tertiary-darker);
      }
    }
  }

  .icon-string {
    display: flex;
    align-items: center;
  }
}
</style>
