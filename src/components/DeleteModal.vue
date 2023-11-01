<template>
  <div v-if="showModal" @click="closeModal" class="delete-modal">
    <div class="delete-modal__content">
      <h1>Delete Listing</h1>
      <p>Are you sure you want to delete this listing? This action cannot be undone.</p>
      <div class="delete-modal__buttons">
        <button class="button" @click.stop="confirmDelete">Yes, Delete</button>
        <button class="button--black" @click.stop="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Define props and emits for better type inference
const { showModal } = defineProps(['showModal']);
const emit = defineEmits(['confirm-delete', 'close-modal']);

// Function to confirm delete action
const confirmDelete = () => {
  emit('confirm-delete');
};

// Function to close the modal
const closeModal = () => {
  emit('close-modal');
};
</script>

<style scoped lang="scss">
/* Modal Styles */
.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  &__content {
    background: #fff;
    padding: var(--spacing-xl);
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);

    h1 {
      font-size: 1.5rem;
    }

    p {
      margin: 10px 0;
      color: #777;
    }
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);

    .button {
      width: 100%;

      &--black {
        background: #4a4b4c;
        &:hover {
          background: #292a2b;
        }
      }
    }
  }
}
</style>
