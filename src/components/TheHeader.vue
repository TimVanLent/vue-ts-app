<template>
  <!-- Header -->
  <header>
    <!-- Navigation -->
    <nav>
      <!-- Home Link -->
      <router-link to="/">
        <div class="logo">
          <img class="logo__img" src="@/assets/images/img_logo_dtt@3x.png" alt="DTT Logo">
        </div>
      </router-link>
      <!-- Houses Link -->
      <router-link to="/">
        <span class="desktop">
          Houses
        </span>
        <div class="mobile icon">
          <img class="icon__img" alt="Home icon" src="@/assets/images/ic_mobile_navigarion_home@3x.png">
          <img class="active icon__img icon__img--active" alt="Home icon" src="@/assets/images/ic_mobile_navigarion_home_active@3x.png">
        </div>
      </router-link>
    </nav>
  </header>
</template>

<style scoped lang="scss">
/* Header Styles */
$mobile-width: 768px;

header {
  background: var(--background-color-secondary);
  padding: var(--spacing-s) 0;
  z-index: 1;
  height: var(--header-height);
  box-sizing: border-box;
  display: flex;
  align-items: center;

  nav {
    display: flex;
    width: calc(100% - 2 * var(--spacing-m));
    max-width: var(--max-width);
    box-sizing: content-box;
    margin: 0 auto;
    gap: var(--spacing-xl);
    align-items: center;

    .logo {
      height: 3rem;
      position: relative;

      &__img {
        height: 100%;
      }
    }

    a {
      color: var(--color-tertiary);
      text-decoration: none;
      transition: all 0.3s ease;

      &:not(.router-link-active):hover {
        color: var(--color-cta);
      }
    }

    .icon__img {
      height: 40px;
    }

    .icon__img.active {
      display: none;
    }

    .router-link-active {
      color: var(--font-color);

      .icon__img {
        display: block;

        &:not(.active) {
          display: none;
        }
      }
    }
  }

  @media (max-width: $mobile-width) {
    z-index: 2;
    box-shadow: 0px 25px 25px 10px darkgrey;

    nav {
      justify-content: space-between;
      flex-direction: row-reverse;
    }
  }
}
</style>
