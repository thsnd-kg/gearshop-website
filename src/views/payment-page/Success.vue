<!-- @format -->

<!-- eslint-disable vue/return-in-computed-property -->
<!-- @format -->

<template>
  <v-container
    class="d-flex align-center justify-center flex-column"
    style="height: 60vh"
  >
    <div>
      <v-img width="200" height="200" src="@/assets/success.png"></v-img>
    </div>
    <div class="text-body-1 font-weight-medium my-4">
      Thanh toán thành công. Đơn hàng của bạn đang được xử lý!
    </div>
    <v-btn
      depressed
      height="48"
      class="rounded-lg px-8"
      color="rgba(254, 52, 100)"
      to="/"
    >
      <div class="text-body-1 font-weight-bold white--text">Về trang chủ</div>
    </v-btn>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { fetchCheckout } from '@/api/order-service';
  export default {
    computed: {
      ...mapGetters('auth', ['isAuthendicated', 'profile'])
    },
    methods: {
      checkout() {
        //const { data } = await checkoutOrderByNoneAccount();
        if (this.isAuthendicated) {
          fetchCheckout({ isPaid: true });
        }
      }
    },
    async created() {
      await this.checkout();
    }
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    margin: 0 auto;
  }
</style>
