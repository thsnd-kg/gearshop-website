<template>
  <v-card class="pa-4" width="360px">
    <div class="d-flex align-center mb-6">
      <div class="text-h5 font-weight-medium">Tài khoản</div>
      <v-spacer></v-spacer>
      <v-btn icon @click="close()">
        <v-icon color="black" @click="$emit('close')"> mdi-close </v-icon>
      </v-btn>
    </div>
    <div class="d-flex">
      <v-avatar size="54">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
      <div class="ml-3 my-auto">
        <div class="text-h6 font-weight-medium blue-grey--text text--darken-3">
          Khang Pham
        </div>
        <div class="blue--text text--lighten-1 text-caption font-weight-medium">
          0345123123
        </div>
      </div>
    </div>
    <v-divider class="my-3"></v-divider>
    <v-btn class="btn" large depressed block color="white">
      <v-icon color="#6ad9e2" left size="28">
        mdi-account-circle-outline
      </v-icon>

      <div
        class="
          ml-1
          blue-grey--text
          text--darken-1 text-subtile-1
          font-weight-bold
        "
      >
        Thông tin tài khoản
      </div>
      <v-spacer></v-spacer>
      <v-icon right size="24"> mdi-chevron-right</v-icon>
    </v-btn>
    <v-btn class="btn mt-1" large depressed block color="white">
      <v-icon color="blue darken-1" left size="28"
        >mdi-map-marker-outline
      </v-icon>

      <div
        class="
          ml-1
          blue-grey--text
          text--darken-1 text-subtile-1
          font-weight-bold
        "
      >
        Thông tin liên hệ
      </div>
      <v-spacer></v-spacer>
      <v-icon right size="24"> mdi-chevron-right</v-icon>
    </v-btn>

    <v-btn class="btn mt-1" large depressed block color="white">
      <v-icon color="blue darken-1 " left size="28"> mdi-cart-outline </v-icon>

      <div
        class="
          ml-1
          blue-grey--text
          text--darken-1 text-subtile-1
          font-weight-bold
        "
      >
        Lịch sử mua hàng
      </div>
      <v-spacer></v-spacer>
      <v-icon right size="24"> mdi-chevron-right</v-icon>
    </v-btn>
    <v-divider class="my-3"></v-divider>
    <v-btn
      class="btn"
      large
      depressed
      block
      color="white"
      @click="handleLogout"
    >
      <v-icon color="red" left size="28"> mdi-logout </v-icon>

      <div
        class="
          ml-1
          blue-grey--text
          text--darken-1 text-subtile-1
          font-weight-bold
        "
      >
        Đăng xuất
      </div>
      <v-spacer></v-spacer>
    </v-btn>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions('auth', ['logout']),

    handleLogout() {
      this.logout();
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 8px;
  text-transform: unset !important;
}

.text {
  color: #ccd1d5;
}
</style>