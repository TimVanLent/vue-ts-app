<template>
  <div id="app__inner">
    <TheHeader/>

    <router-view class="trans-container" v-slot="{ Component }">
      <transition name="view-transition">
        <component :is="Component" />
      </transition>
    </router-view>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader.vue'; // Adjust the import path

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
  },
});
</script>

<style scoped lang="scss">
/* Add global styles here */
  $mobile-width: 768px;

  #app {
    &__inner {
      display: contents;

      .trans-container {
        position: absolute;
        inset: 0;
        flex: 1;
        top: var(--header-height);

        @media (max-width: $mobile-width) {
          top: 0;
          bottom: var(--header-height);
        }
      }
    }
  }
</style>
