<template>
  <v-container
    class="d-flex align-center justify-center overflow-y-hidden"
    style="height: 60vh"
  >
    <v-card class="rounded-lg pa-6 px-10">
      <div class="text-h5 mb-6 font-weight-medium">Thay đổi mật khẩu</div>
      <v-form ref="form" lazy-validation>
        <v-text-field
          validate-on-blur
          label="Mật khẩu"
          v-model="password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"
          :type="showPass ? 'text' : 'password'"
          :rules="passwordRules"
          outlined
        ></v-text-field>
        <v-text-field
          label="Nhập lại mật khẩu"
          validate-on-blur
          v-model="confirmPassword"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showConfirmPassword = !showConfirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          :rules="confirmPasswordRules"
          outlined
        ></v-text-field>
      </v-form>
      <v-btn
        :loading="isLoading"
        block
        depressed
        height="48"
        class="rounded-lg"
        color="rgba(254, 52, 100)"
        @click="save"
      >
        <div class="text-body-1 font-weight-bold white--text">Lưu thay đổi</div>
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      isLoading: false,
      showConfirmPassword: false,
      showPass: false,
      token: '',
      passwordRules: [
        (value) => !!value || 'Mật khẩu không được để trống.',
        (value) =>
          (value && value.length >= 6) || 'Mật khẩu phải ít nhất 6 ký tự',
      ],

      confirmPasswordRules: [
        (value) => !!value || 'Nhập lại mật khẩu không đƯợc để trống',
        (value) => value === this.password || 'Mật khẩu không trùng nhau',
      ],
    };
  },

  created() {
    this.token = this.$route.query.token;
  },

  methods: {
    async save() {
      try {
        if (!this.$refs.form.validate()) return;
        this.isLoading = true;
        const response = await this.$http.post('auth/reset-password', {
          token: this.token,
          password: this.password,
        });

        if (response.status == 200) {
          this.$notify.success('Thay đổi mật khẩu thành công');
          this.$router.push({ path: '/' });
        } else {
          this.$notify.error(response.error);
        }
      } catch (error) {
        console.log(error);
        this.$notify.error('Hệ thống đang xảy ra sự cố!');
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
</style>