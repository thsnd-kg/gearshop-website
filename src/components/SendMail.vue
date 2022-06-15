<template>
  <div>
    <v-dialog v-model="showDialog" persistent max-width="350px">
      <v-card class="overflow-y-hidden">
        <div>
          <div class="d-flex align-center">
            <v-card-title class="text-h5">Quên mật khẩu</v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="close" class="mr-2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <div class="px-4">
            <v-form ref="formLogin" lazy-validation>
              <v-text-field
                validate-on-blur
                label="Email"
                ref="email"
                v-model="email"
                :rules="emailRules"
                outlined
              ></v-text-field>
            </v-form>
          </div>
          <div class="px-4 mb-4">
            <v-btn
              :loading="isLoading"
              bottom
              width="100%"
              height="48px"
              class="mx-auto"
              color="primary"
              @click="sendMail"
            >
              <div class="text">Gửi mail</div>
            </v-btn>
          </div>
          <div class="mb-8 d-flex justify-center">
            <div class="text-bottom">Bạn đã có tài khoản rồi ?</div>
            <div class="ml-2">
              <a class="" @click="$emit('changeType')">Đăng nhập</a>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isShowSendMail: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    isShowSendMail(isShow) {
      this.showDialog = isShow;
    },
  },
  data() {
    return {
      isLoading: false,
      showDialog: false,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail không được để trống',
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'E-mail có định dạng không đúng',
      ],
    };
  },

  methods: {
    close() {
      this.$emit('closeSendMail');
    },

    async sendMail() {
      try {
        this.isLoading = true;
        const response = await this.$http.get('/auth/forgot-password', {
          email: this.email,
        });

        if (response.status === 200) {
          this.$notify.success(
            'Gear Shop đã gửi mail thay đổi mật khẩu đến bạn'
          );
        } else {
          this.$notify.error('Hệ thống đang xảy ra sự cố.');
        }

        setTimeout(() => {}, 60000);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.$notify.error('Hệ thống đang xảy ra sự cố.');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  font-weight: bold;
  font-size: 16px;
  color: #fff;
}

.text-bottom {
  color: black;
  opacity: 0.6;

  &--highlight {
    color: #81ccb7;
  }
}
</style>