<template>
  <v-app-bar class="padding-content" color="#ffff" elevate-on-scroll app>
    <v-row align="center" dense>
      <v-col cols="2" >
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
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

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
          Seach</v-text-field
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
            <v-btn elevation="0" fab small color="#f8fafc">
              <v-icon>mdi-truck-fast-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn elevation="0" fab small color="#f8fafc">
              <v-icon>mdi-account-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-app-bar>
</template>
<script>
export default {
  methods: {
    async handleClick() {
      this.$notify.success("Đăng nhập thành công");
      const response = await this.$http.get("products");
      console.log(response);
    },
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.logo-container{
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
