<template>
  <div class="sub-header pb-3">
    <v-row class="mb-3">
      <v-col cols="9">
        <v-carousel
          class="rounded-lg"
          height="400"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          :show-arrows="false"
          cycle
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="3">
        <div class="banner d-flex flex-column justify-space-between">
          <v-card flat class="rounded-lg" height="120" color="#f8fafc">
            <v-card-title class="font-weight-bold"
              >Miễn phí vận chuyển</v-card-title
            >
            <v-card-subtitle
              >100% đơn hàng đều được miễn phí vận chuyển khi thánh toán
              trước</v-card-subtitle
            >
          </v-card>
          <v-card flat class="rounded-lg" height="120" color="#f8fafc">
            <v-card-title class="font-weight-bold"
              >Bảo hành tận tâm
            </v-card-title>
            <v-card-subtitle
              >Bất kể giấy tờ thế nào, GearShop luôn cam kết sẽ hỗ trợ khách
              hàng tới cùng.</v-card-subtitle
            >
          </v-card>
          <v-card flat class="rounded-lg" height="120" color="#f8fafc">
            <v-card-title class="font-weight-bold"
              >Đổi trả 1-1 hoặc hoàn tiền</v-card-title
            >
            <v-card-subtitle
              >100% đơn hàng đều được miễn phí vận chuyển khi thánh toán
              trước</v-card-subtitle
            >
          </v-card>
        </div>
      </v-col>
    </v-row>
    <div class="mb-2">
      <div class="text-h5 font-weight-bold mb-2">Thương hiệu nổi bật</div>
      <div class="brand-list d-flex">
        <v-slide-group
          class="brand-slide"
          ref="slide_group"
          @click:next="clickNext($event)"
        >
          <v-slide-item
            v-for="brand in brands"
            :key="brand.brandId"
            v-slot="{ toggle }"
          >
            <div
              class="brand-item mx-2 d-flex align-center justify-center"
              @click="toggle"
            >
              <v-img
                contain
                max-height="60"
                max-width="100"
                :src="brand.imgUrl"
              ></v-img>
            </div>
          </v-slide-item>
        </v-slide-group>

        <div class="d-flex align-center ml-3">
          <v-btn
            :disabled="!hasPrev"
            class="mx-1"
            fab
            depressed
            small
            @click="clickPrev"
          >
            <v-icon dark> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn
            :disabled="!hasNext"
            class="mx-1"
            fab
            depressed
            small
            @click="clickNext"
          >
            <v-icon dark> mdi-chevron-right </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: 'https://media-api-beta.thinkpro.vn/media/core/banners/2022/5/12/866x374.jpg',
        },
        {
          src: 'https://media-api-beta.thinkpro.vn/media/core/banners/2022/5/12/B%E1%BA%A3n%20sao%20legion%205%20866-374.jpg',
        },
      ],

      brands: [],
      nextEvent: '',
      slideGroupPrev: '',
      slideGroupNext: '',
      slideGroup: '',
      hasNext: true,
      hasPrev: false,
      count: 0,
    };
  },

  created() {
    this.getBrands();
  },

  mounted() {
    this.slideGroup = this.$refs.slide_group;
    this.slideGroupPrev = this.$refs.slide_group.$el.querySelector(
      '.v-slide-group__prev'
    );
    this.slideGroupNext = this.$refs.slide_group.$el.querySelector(
      '.v-slide-group__next'
    );
  },

  computed: {},

  watch: {
    count() {
      this.hasPrev = this.slideGroup.hasPrev;
      this.hasNext = this.slideGroup.hasNext;
    },
  },

  methods: {
    async getBrands() {
      const response = await this.$http.get('brands', { onlyActive: true });
      this.brands = response.content;
    },

    clickPrev() {
      this.slideGroupPrev.click();
      this.count++;
    },

    clickNext() {
      this.slideGroupNext.click();
      this.count++;
    },
  },
};
</script>

<style lang = "scss" scoped>
.sub-header {
  background-color: #fff;
  padding: 0 10%;
}
.banner {
  height: 400px;
}

.brand {
  &-list {
    width: 90%;
  }

  &-item {
    border-radius: 4px;
    border: 1px solid rgb(198, 213, 228);
    height: 80px;
    width: 120px;
  }

  &-slide::v-deep .v-slide-group {
    &__prev {
      display: none;
    }
    &__next {
      display: none;
    }
  }
}
</style>