<template>
  <div>
    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card class="rounded-lg pa-6 pb-10">
        <div class="d-flex - justify-end">
          <v-btn class="mr-0" icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="d-flex flex-column align-center">
          <v-img width="200" height="128" src="@/assets/mail.jpg"></v-img>
          <div
            class="text-h4 font-weight-medium mb-2 grey--text text--darken-3"
          >
            Xác thực email
          </div>
          <div class="text-body-2 text-center">
            Gear Shop đã gửi email đến
            <a>{{ email }}</a> để xác thực email. Sau khi nhận được email vui
            lòng nhấp vào đường link được cung cấp để hoàn thành việc đăng ký.
          </div>
        </div>
        <v-divider class="my-4"></v-divider>
        <div class="text-center">
          Nếu không nhận được mail <a @click="resendMail">Gửi lại mail</a>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: 'anonymous',
    },
  },
  data() {
    return {
      isLoading: false,
      showDialog: true,
      canResend: true,
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
      this.$emit('showConfirmMail', { isShow: false });
    },

    async resendMail() {
      if (this.canResend) {
        const response = await this.$http.get(
          '/auths/me/resend-confirm-email',
          {
            email: this.email,
          }
        );
        if (response.success) {
          this.$notify.success('Mail đã được gửi lại');
        } else {
          this.$notify.error('Hệ thống đang xảy ra sự cố');
        }
        this.canResend = false;
        setTimeout(() => {}, 60000);
      } else {
        this.$notify.warn('Bạn vui lòng chờ trong giây lát rồi gửi lại nhé!');
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