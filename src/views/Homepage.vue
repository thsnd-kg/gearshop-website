<template>
  <div class="wrapper">
    <v-row>
      <v-col cols="3">
        <v-row no-gutters class="filter-container">
          <v-col cols="12">
            <div class="title">
              <div class="title-text">Tất cả laptop</div>
              <div class="title-filter">
                <v-icon class="icon-title" color="gray"
                  >mdi-filter-menu-outline</v-icon
                >
                Bộ lọc
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="price-container">
              <div class="title">Khoảng giá (1 triệu vnd)</div>
              <v-range-slider
                v-model="range"
                :max="max"
                :min="min"
                hide-details
                class="align-center"
              >
              </v-range-slider>
              <div class="text-price-container">
                <div>
              <v-text-field
                :value="range[0]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 100px"
                @change="$set(range, 0, $event)"
              ></v-text-field>
              </div>
              <div>
              <v-text-field
                :value="range[1]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 100px"
                @change="$set(range, 1, $event)"
              ></v-text-field>
               </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <v-card class="options">
              <OptionFilter title="Nhu Cầu" :items="services" />
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="options">
              <OptionFilter title="CPU" :items="services" />
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="options">
              <OptionFilter title="CPU" :items="services" />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="9">
        <v-row>
          <v-col cols="12">
            <v-text-field
              class="search-input"
              prepend-inner-icon="mdi-magnify"
              outlined
              hide-details
              solo
              placeholder="Tìm kiếm sản phẩm"
              dense
              flat
              height="20px"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <div class="sort-container">
              <div class="sort-title">
                <v-icon> mdi-swap-vertical </v-icon>
                Sắp xếp theo
              </div>
              <v-radio-group class="radio-container" v-model="radios" row>
                <v-radio label="Hàng mới về" value="radio-1"></v-radio>
                <v-radio label="Giá thấp → cao" value="radio-2"></v-radio>
                <v-radio label="Giá cao → thấp" value="radio-3"></v-radio>
              </v-radio-group>
              <div class="quantity-product-label">386 sản phẩm</div>
            </div>
          </v-col>
          <v-col
            class="product-card-container"
            v-for="data in products"
            :key="data.id"
            cols="5"
          >
            <ProductCard :items="data" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import OptionFilter from "../components/homepages/OptionFilter.vue";
import ProductCard from "../components/homepages/ProductCard.vue";
import json from "../mock/data.json";
import { mapActions } from 'vuex';
export default {
  components: {
    OptionFilter,
    ProductCard
  },
  methods: {
     ...mapActions('categories', ['getCategories']),
      ...mapActions('products', ['getProducts']),
   async load() {
    console.log('ccc')
    this.getCategories()
     this.products = await this.getProducts()
  }
  },
  created() {
   this.load()
  },
  data() {
    return {
      min: 0,
      max: 100,
      range: [0, 30],
      radios: null,
      services: [
        {
          title: "Web",
          isSelected: true,
          id: 1
        },
        {
          title: "Design",
          isSelected: false,
          id: 2
        },
        {
          title: "Videos",
          isSelected: false,
          id: 3
        },
        {
          title: "Videos",
          isSelected: false,
          id: 4
        }
      ],
      products: json.products
    };
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  width: 1300px;
  margin: 0 auto;
}
.filter-container {
  margin-top: 130px;
  background-color: #ffff;
  border-radius: 10px;
  padding: 15px 5px 15px 5px;
  .title {
    margin-bottom: 20px;
    margin-left: 20px;
    .title-text {
      font-size: 26px !important;
      font-weight: bold;
    }
    .title-filter {
      margin-top: 10px;
      font-size: 16px;
      color: gray;
      .icon-title {
        font-size: 18px;
        color: gray;
        margin-right: 10px;
      }
    }
  }
  .price-container {
    margin: 10px 10px 10px;
    .title {
      font-size: 16px !important;
      margin-bottom: -2px;
      margin-left: 2px;
    }
    .text-price-container{
      margin: 0px 10px 20px 5px;
      display: flex;
      justify-content: space-between;
    }
  }
}
.check {
  width: 100%;
}
.options {
  border: hidden;
  box-shadow: 0px 0px 0px #888888 !important;
  // background-color: rgba(236, 240, 244) !important;
  opacity: 1;
}
.search-input {
  width: 300px;
  border-radius: 20px;
}
.sort-container {
  display: flex;
  justify-content: start;
  .sort-title {
    margin-top: -5px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 20px;
  }
  .radio-container {
    font-size: 11px;
    margin-top: -11px;
    margin-left: 10px;
  }
  .quantity-product-label {
    margin-left: 70px;
    margin-top: -5px;
    font-size: 14px;
    font-weight: bold;
  }
  .product-card-container {
    width: 400px !important;
    height: 360px !important;
    margin: 0px 10px -5px 10px;
  }
}
</style>
