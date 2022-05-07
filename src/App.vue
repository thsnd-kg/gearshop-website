<template>
  <v-app>
    <component :is="layout"> </component>
  </v-app>
</template>

<script>
const default_layout = 'default';

export default {
  name: 'App',
  components: {},

  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout';
    },
  },
};
</script>

<style lang="scss">
@import './styles/variables.scss';

#app {
  font-family: 'Nunito Sans', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
