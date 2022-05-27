<template>
  <div>
    <VSubHeader></VSubHeader>
    <div class="wrapper">
      <v-row>
        <v-col cols="4">
          <!-- <v-card>alibaba </v-card> -->
        </v-col>
        <v-col cols="8">
          <!-- <v-card>alibaba </v-card> -->
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import VSubHeader from '../components/VSubHeader.vue';
export default {
  components: {
    VSubHeader,
  },
};
</script>

<style lang = "scss" scoped>
.wrapper {
  height: 100vh;
}

.check {
  width: 100%;
}
</style>