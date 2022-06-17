<template>
  <v-app-bar class="padding-content" color="#ffff" elevate-on-scroll app>
    <v-row align="center" dense>
      <v-col cols="2">
        <v-img
          class="logo-container"
          @click="goHome"
          max-height="48"
          max-width="200"
          :src="`https://gearshop.vn/frontend/images/shop/logo.png`"
        >
        </v-img>
      </v-col>
      <v-col cols="3" class="d-flex align-center">
        <v-menu
          :close-on-content-click="false"
          :close-on-click="false"
          offset-y
          nudge-bottom="12px"
          min-width="100%"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              elevation="0"
              fab
              small
              color="#f8fafc"
              v-bind="attrs"
              v-on="on"
            >
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </v-btn>
          </template>
          <Category></Category>
        </v-menu>

        <div class="text">Danh mục</div>
      </v-col>
      <v-col cols="4" class="d-flex align-center">
        <v-text-field
          class="search-field"
          prepend-inner-icon="mdi-magnify"
          hide-details
          solo
          background-color="#ecf0f4"
          placeholder="Placeholder"
          dense
          flat
          heigh="20px"
        >
          Tìm kiếm sản phẩm</v-text-field
        >
      </v-col>

      <v-col class="mx-6" cols="2">
        <v-row no-gutters>
          <v-col>
            <v-btn elevation="0" fab small color="#f8fafc" @click="handleClick">
              <v-icon>mdi-cart-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              elevation="0"
              fab
              small
              color="#f8fafc"
              @click="handleClickCk"
            >
              <v-icon>mdi-truck-fast-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-menu
              :close-on-content-click="closeOnContentClick"
              offset-y
              nudge-bottom="6px"
              nudge-left="3px"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  elevation="0"
                  fab
                  small
                  color="#f8fafc"
                  v-bind="attrs"
                  v-on="on"
                  @click="handleClickAccount"
                >
                  <v-icon>mdi-account-outline</v-icon>
                </v-btn>
              </template>
              <ModalAccount
                v-if="showModal"
                @close="handleModalAccount"
              ></ModalAccount>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <Login
      :show="showLogin"
      @closeLogin="closeLogin"
      @showConfirmMail="showConfirmMail"
    ></Login>
    <ConfirmMail
      v-if="isShowConfirmMail"
      :email="email"
      @showConfirmMail="showConfirmMail"
    ></ConfirmMail>
  </v-app-bar>
</template>
<script>
import Login from './login/Login.vue';
import ModalAccount from './login/ModalAccount.vue';
import { mapGetters } from 'vuex';
import Category from './Category.vue';
import ConfirmMail from './ConfirmMail.vue';

export default {
  components: {
    Login,
    ModalAccount,
    Category,
    ConfirmMail,
  },

  data() {
    return {
      showCategory: true,
      showModal: false,
      showLogin: false,
      closeModal: false,
      closeOnContentClick: false,
      isShowConfirmMail: false,
      email: '',
    };
  },

  computed: {
    ...mapGetters('auth', ['isAuthendicated']),
  },

  methods: {
    async handleClick() {
      // this.$notify.success("Đăng nhập thành công");
      //const response = await this.$http.get('products');
      //console.log(response);
      this.$router.push('/cart');
    },
    async handleClickCk() {
      this.$router.push('/my-orders');
    },
    goHome() {
      this.$router.push('/');
    },
    handleClickAccount() {
      if (!this.isAuthendicated) {
        this.showLogin = true;
        this.showModal = false;
      } else {
        this.showLogin = false;
        this.showModal = true;
        this.handleModalAccount();
      }
    },

    closeLogin() {
      this.showLogin = false;
    },

    handleModalAccount() {
      this.closeOnContentClick = !this.closeOnContentClick;
    },

    showConfirmMail(data) {
      console.log(data);
      const { email, isShow } = data;
      this.isShowConfirmMail = isShow;
      this.email = email;
    },
  },
};
</script>

<style lang="scss" scoped>
.logo-container {
  &:hover {
    cursor: pointer;
  }
}
.padding-content {
  padding: 0 10%;
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
