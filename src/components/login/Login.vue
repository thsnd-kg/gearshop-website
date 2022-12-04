`1
<template>
  <div>
    <v-dialog v-model="showDialog" persistent max-width="800px">
      <v-card class="d-flex overflow-y-hidden" v-if="isLogin">
        <div class="content">
          <div class="d-flex align-center">
            <v-card-title class="text-h5 blue--text blue-lighten-1"
            >Đăng nhập
            </v-card-title
            >
            <v-spacer></v-spacer>
            <v-btn icon @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-card-title class="text-h6 blue--text blue-lighten-1"
          >Gear Shop xin chào!
          </v-card-title
          >
          <div class="px-4">
            <v-form ref="formLogin" lazy-validation>
              <v-text-field
                  validate-on-blur
                  label="Email"
                  ref="email"
                  v-model="user.email"
                  :rules="emailRules"
                  outlined
              ></v-text-field>
              <v-text-field
                  validate-on-blur
                  label="Mật khẩu"
                  hide-details
                  v-model="user.password"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                  :type="showPass ? 'text' : 'password'"
                  :error-messages="errorMessages"
                  :rules="passwordRules"
                  outlined
              ></v-text-field>
            </v-form>
          </div>
          <div class="px-4">
            <div class="my-2 d-flex justify-end">
              <a
                  class="text-subtitle-2 blue--text blue-lighten-1"
                  @click="showForgotPassword"
              >Quên mật khẩu?</a
              >
            </div>
            <v-btn
                :loading="isLoading"
                bottom
                width="100%"
                height="48px"
                class="mx-auto"
                color="primary"
                @click="handleLogin"
            >
              <div class="text">Đăng nhập</div>
            </v-btn>
          </div>
          <v-divider class="my-4"></v-divider>

          <div class="mb-8 d-flex justify-center">
            <div class="text-bottom">Bạn chưa có tài khoản ?</div>
            <div class="ml-2">
              <a class="text-bottom--highlight" @click="changeType">Đăng ký</a>
            </div>
          </div>
        </div>
        <div class="check"></div>
      </v-card>
      <v-card class="d-flex overflow-y-hidden" v-else>
        <div class="content">
          <div class="d-flex align-center">
            <v-card-title class="text-h5">Đăng ký</v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-card-title class="blue--text blue-lighten-1 text-h6"
          >Gear Shop xin chào!
          </v-card-title
          >
          <div class="px-4">
            <v-form ref="formRegister" lazy-validation>
              <v-text-field
                  validate-on-blur
                  label="Email"
                  ref="email"
                  v-model="user.email"
                  :rules="emailRules"
                  outlined
              ></v-text-field>
              <v-text-field
                  validate-on-blur
                  label="Mật khẩu"
                  v-model="user.password"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                  :type="showPass ? 'text' : 'password'"
                  :rules="passwordRules"
                  outlined
              ></v-text-field>
              <v-text-field
                  label="Nhập lại mật khẩu"
                  validate-on-blur
                  v-model="user.confirmPassword"
                  :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :rules="confirmPasswordRules"
                  outlined
              ></v-text-field>
            </v-form>
          </div>
          <div class="px-4">
            <v-btn
                color="primary"
                :loading="isLoading"
                bottom
                width="100%"
                height="48px"
                class="mx-auto"
                @click="handleRegister"
            >
              <div class="text">Đăng ký</div>
            </v-btn>
          </div>
          <v-divider class="my-8"></v-divider>
          <div class="mb-8 d-flex justify-center">
            <div class="text-bottom">Bạn đã có tài khoản rồi ?</div>
            <div class="ml-2">
              <a class="text-bottom--highlight" @click="changeType"
              >Đăng nhập</a
              >
            </div>
          </div>
        </div>
        <div class="check"></div>
      </v-card>
    </v-dialog>
    <SendMail
        :isShowSendMail="isShowSendMail"
        @closeSendMail="closeSendMail"
        @changeType="showLogin"
    ></SendMail>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import SendMail from '../SendMail';
import { addProductToOrder } from "@/api/order-service";

export default {
  name: 'Login',

  components: {
    SendMail,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    show(isShow) {
      this.showDialog = isShow;
    },
  },

  computed: {},

  data() {
    return {
      isLoading: false,
      showConfirmPassword: false,
      showPass: false,
      isLogin: true,
      showDialog: false,
      user: {},
      isShowSendMail: false,
      errorMessages: '',
      emailRules: [
        (v) => !!v || 'E-mail không được để trống',
        (v) =>
            /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                v
            ) || 'E-mail có định dạng không đúng',
      ],

      passwordRules: [
        (value) => !!value || 'Mật khẩu không được để trống.',
        (value) =>
            (value && value.length >= 6) || 'Mật khẩu chua ít nhất 6 ký tự',
      ],

      confirmPasswordRules: [
        (value) => !!value || 'Nhập lại mật khẩu không đƯợc để trống',
        (value) => value === this.user.password || 'Mật khẩu không trùng nhau',
      ],
    };
  },

  methods: {
    ...mapActions('auth', ['performLogin', 'register']),

    close() {
      if (this.isLogin) this.$refs.formLogin.resetValidation();
      else this.$refs.formRegister.resetValidation();
      this.user = {};
      this.isLogin = true;
      this.isLoading = false;
      this.errorMessages = '';
      this.isShowSendMail = false;
      this.$emit('closeLogin');
    },

    changeType() {
      if (this.isLogin) {
        this.user = {};
        this.$refs.formLogin.resetValidation();
        this.isLogin = false;
      } else {
        this.user = {};
        this.$refs.formRegister.resetValidation();
        this.isLogin = true;
      }
    },

    async handleLogin() {
      if (!this.$refs.formLogin.validate()) {
        return;
      }
      this.isLoading = true;
      if (this.user.email && this.user.password) {
        const response = await this.performLogin(this.user);
        if (response.success) {
          this.$notify.success('Đăng nhập thành công');
          //post cart item to BE
          // get cart from localStorage
          let cart;
          const lc = localStorage.getItem('cart');
          if (!lc) {
            cart = null;
          } else {
            cart = JSON.parse(localStorage.getItem('cart'));
            if (cart?.orderDetails !== undefined) {
              cart.orderDetails.forEach((item) => {
                addProductToOrder({
                  quantity: item.quantity,
                  variantId: item.variantId,
                })
              });

              localStorage.removeItem('cart');
            }
          }
          this.showDialog = false
        } else this.errorMessages = 'Email hoặc mật khẩu bạn nhập không đúng';
      }
      this.isLoading = false;
    },

    async handleRegister() {
      if (!this.$refs.formRegister.validate()) {
        return;
      }

      this.isLoading = true;
      if (this.user.email && this.user.password && this.user.confirmPassword) {
        const response = await this.register(this.user);
        if (response.success) {
          this.$notify.success('Vui lòng xác thực mail');
          const data = {
            isShow: true,
            email: this.user.email,
          };

          this.$emit('showConfirmMail', data);
          this.close();
        } else this.$notify.error('Tài khoản này đã được đăng ký');
      }
      this.isLoading = false;
    },

    showForgotPassword() {
      this.isShowSendMail = true;
      this.showDialog = false;
    },

    closeSendMail() {
      this.close();
    },

    showLogin() {
      this.showDialog = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 50%;
}

.title {
  color: #52acde;
}

.text-bottom {
  color: black;
  opacity: 0.6;

  &--highlight {
    color: #52acde;
  }
}

.text {
  font-weight: bold;
  font-size: 16px;
  color: #fff;
}

.dialog-bottom {
  height: 100px;
}

.check {
  background-size: 100% 100%;
  width: 50%;
  background-image: url('https://i.pinimg.com/736x/6e/32/87/6e32878542a4a6b86e640204d951fbff--blue-wallpapers-blue-backgrounds.jpg');
}
</style>
