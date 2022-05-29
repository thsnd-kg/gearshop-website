<template>
  <div>
    <v-sub-header />
    <div class="wrapper">
      <v-row>
        <v-col cols="3">
          <v-row no-gutters class="filter-container">
            <v-col cols="12">
              <div class="title">
                <div class="title-text">{{ category.categoryName != undefined ? `Tất cả ${category.categoryName}` : ``}}</div>
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
             <v-col
                  class="product-attribute-container"
                  v-for="data in category.attributes"
                  :key="data.attributeId"
                  cols="12"
                >
                <template v-if="data.tags.length > 0">
                <OptionFilter :title="data.attributeName" :items="data.tags" />
               </template>
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
            <v-col cols="12" >
              <div class="sort-container">
                <div class="sort-title">
                  <v-icon> mdi-swap-vertical </v-icon>
                  Sắp xếp theo
                </div>
                <v-radio-group @change="changeSort" class="radio-container" v-model="radios" row>
                  <v-radio label="Hàng mới về" value="1"></v-radio>
                  <v-radio label="Giá thấp → cao" value="2"></v-radio>
                  <v-radio label="Giá cao → thấp" value="3"></v-radio>
                </v-radio-group>
                <div class="quantity-product-label">{{`${products.length} sản phẩm`}}</div>
              </div>
            </v-col>
            <v-col
              class="product-card-container"
              v-for="data in products"
              :key="data.id"
              cols="5"
            >
              <ProductCard :item="data" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import OptionFilter from "../components/homepages/OptionFilter.vue";
import ProductCard from "../components/homepages/ProductCard.vue";
import VSubHeader from "../components/VSubHeader.vue";
export default {
  components: {
    OptionFilter,
    VSubHeader,
    ProductCard
  },
  methods: {
    async load() {
      let link = this.$route.params.link;
        const productRes =  await this.$http.get(`products?onlyActive=true`);
        this.products = productRes.content;
        console.log(productRes.content);
      if (!link) {
        const response = await this.$http.get(`website/categories/link/laptop`);
        this.category = response.content;
      } else {
        const response = await this.$http.get(`website/categories/link/${link}`);
        this.category = response.content;
      }
      //const response = await this.$http.get(`website/products/link/${link}`);
      // this.product = response.content;
    },
    changeSort() {
        console.log(this.radios);
        if(this.radios == '1') {
         this.products = this.products.sort((a,b) => b.productId - a.productId);
        }
         if(this.radios == '2') {
         this.products = this.products.sort((a,b) => a.variants[0].price - b.variants[0].price);
        }
         if(this.radios == '3') {
         this.products = this.products.sort((a,b) => b.variants[0].price - a.variants[0].price);
        }
    }
  },
  created() {
    this.load();
  },
  data() {
    return {
      min: 0,
      max: 100,
      range: [0, 30],
      radios: null,
      category: {},
      services: [
        {
          tagName: "Web",
          isSelected: true,
          tagId: 1
        },
        {
          tagName: "Design",
          isSelected: false,
          tagId: 2
        },
        {
          tagName: "Videos",
          isSelected: false,
          tagId: 3
        },
        {
          tagName: "Videos",
          isSelected: false,
          tagId: 4
        }
      ],
      products: [],
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
  margin-top: 30px;
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
    .text-price-container {
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
   margin-top: 30px;
  width: 300px;
  border-radius: 20px;
}
.sort-container {
  height: 10px;
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
