<!-- @format -->

<template>
  <v-container
    class="d-flex align-center justify-center flex-column"
    style="height: 60vh"
  >
    <div>
      <v-img width="200" height="200" src="@/assets/failed.png"></v-img>
    </div>
    <div class="text-body-1 font-weight-medium my-4">
      Thanh toán thất bại. Vui lòng thanh toán lại hoặc thay đổi phương thức
      thanh toán
    </div>
    <v-btn
      depressed
      height="48"
      class="rounded-lg px-8"
      color="rgba(254, 52, 100)"
      to="/checkout"
    >
      <div class="text-body-1 font-weight-bold white--text">Thanh toán lại</div>
    </v-btn>
  </v-container>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .wrapper {
    margin: 0 auto;
  }
</style>
