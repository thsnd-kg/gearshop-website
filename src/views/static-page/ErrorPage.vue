<template>
  <v-container
    class="d-flex align-center justify-center flex-column"
    style="height: 60vh"
  >
    <div>
      <v-img width="200" height="200" src="@/assets/page-error.png"></v-img>
    </div>
    <div class="text-body-1 font-weight-medium my-4">
      Có lỗi xảy ra với trang bạn yêu cầu
    </div>
    <div class="mb-4">
      <div class="text-body-1 mb-2">Một số nguyên nhân phổ biến:</div>
      <ul>
        <li class="text-body-2">
          Các kỹ sư Gift Store đang thực hiện bảo trì trang, bạn có thể thử truy
          cập lại sau
        </li>
        <li class="text-body-2">
          Thanh URL bị gõ nhầm một ký tự nào đó (bạn thử check lại xem nhé)
        </li>
        <li class="text-body-2">Trang đã bị gỡ khỏi hệ thống</li>
      </ul>
    </div>
    <v-btn
      depressed
      height="48"
      class="rounded-lg px-8"
      color="rgba(254, 52, 100)"
      to="/trang-chu"
    >
      <div class="text-body-1 font-weight-bold white--text">Về trang chủ</div>
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