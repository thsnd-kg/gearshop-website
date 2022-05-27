<template>
  <v-app>
    <VHeader></VHeader>
    <v-main class="background-main">
      <div class="main-content-wrapper">
        <v-scroll-x-transition hide-on-leave>
          <router-view />
        </v-scroll-x-transition>
      </div>
    </v-main>
    <app-notification />
  </v-app>
</template>

<script>
import VHeader from '../components/VHeader.vue';
import AppNotification from '../components/notification';
export default {
  components: {
    VHeader,
    AppNotification,
  },
};
</script>

<style lang="scss" scoped>
.background-main {
  background-color: rgba(236, 240, 244);
  opacity: 1;
}

.main-content-wrapper {
  margin-top: 10px;
}

.search-field {
  border-radius: 8px;
}
.text {
  font-size: 14px;
  line-height: 140%;
  font-weight: 700;
}
</style>