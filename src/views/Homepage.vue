<template>
  <div>
    <v-sub-header />
    <div class="wrapper">
      <v-row>
        <v-col cols="3">
          <v-row no-gutters class="filter-container">
            <v-col cols="12">
              <div class="title">
                <div class="title-text">
                  {{
                    category.categoryName != undefined
                      ? `Tất cả ${category.categoryName}`
                      : ``
                  }}
                </div>
                <div class="title-filter" @click="setFilter(false)">
                  Bộ lọc
                  <v-icon class="icon-title" color="gray">{{
                    isFilter ? 'mdi-filter-outline' : 'mdi-filter-off'
                  }}</v-icon>
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
                  @change="setFilter(true)"
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
                <OptionFilter
                  :title="data.attributeName"
                  :items="data.tags"
                  @setTag="setTag"
                />
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
                clearable
                v-model="searchText"
                @blur="searchProduct"
                @keydown.enter="searchProduct"
                @click:clear="clearSearchText"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <div class="sort-container">
                <div class="sort-title">
                  <v-icon> mdi-swap-vertical </v-icon>
                  Sắp xếp theo
                </div>
                <v-radio-group
                  @change="changeSort"
                  class="radio-container"
                  v-model="radios"
                  row
                >
                  <v-radio label="Hàng mới về" value="1"></v-radio>
                  <v-radio label="Giá thấp → cao" value="2"></v-radio>
                  <v-radio label="Giá cao → thấp" value="3"></v-radio>
                </v-radio-group>
                <div class="quantity-product-label">
                  {{ `${productsFilter.length} sản phẩm` }}
                </div>
              </div>
            </v-col>
            <v-col
              class="product-card-container"
              v-for="data in getListProductWithIndex"
              :key="data.id"
              cols="5"
            >
              <ProductCard :item="data" />
            </v-col>
            <v-col v-if="getListProductWithIndex.length == 0">
              <div class="no-result">Không có kết quả</div>
            </v-col>
            <v-col cols="12">
              <div class="paging-container">
                <div class="button-paging" @click="movingPage(+1)">
                  Trang tiếp <v-icon color="white">mdi-chevron-right</v-icon>
                </div>
                <div class="display-paging">
                  <v-icon class="icon" color="black" @click="movingPage(-1)"
                    >mdi-chevron-left</v-icon
                  >
                  <div class="number">
                    {{
                      `${this.pageIndex}/${Math.ceil(
                        this.productsFilter.length / 6
                      )}`
                    }}
                  </div>
                  <v-icon class="icon" color="black" @click="movingPage(+1)"
                    >mdi-chevron-right</v-icon
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import OptionFilter from '../components/homepages/OptionFilter.vue';
import ProductCard from '../components/homepages/ProductCard.vue';
import VSubHeader from '../components/VSubHeader.vue';
import {fetchProductsByCategoryLink} from '@/api/product-service'
export default {
  components: {
    OptionFilter,
    VSubHeader,
    ProductCard,
  },

  watch: {
    $route() {
      this.link = this.$route.params.link;
    },

    link() {
      this.load();
    },
  },

  methods: {
    async load() {
      let link = this.$route.params.link;
      let index = this.$route.query.p;
      if (index == undefined) this.pageIndex = 1;
      else this.pageIndex = index;
      if (!link) {
        const response = await fetchProductsByCategoryLink('laptop')
        this.products = response.content;
        this.link = 'laptop';
      } else {
        const response = await fetchProductsByCategoryLink(link)
        this.products = response.content;
        this.link = link;
      }
      this.category = this.products[0].category;
      this.productsFilter = this.products;

    },
    changeSort() {
      console.log(this.radios);
      if (this.radios == '1') {
        this.productsFilter = this.productsFilter.sort(
          (a, b) => b.productId - a.productId
        );
      }
      if (this.radios == '2') {
        this.productsFilter = this.productsFilter.sort(
          (a, b) => a.variants[0].price - b.variants[0].price
        );
      }
      if (this.radios == '3') {
        this.productsFilter = this.productsFilter.sort(
          (a, b) => b.variants[0].price - a.variants[0].price
        );
      }
    },
    searchProduct() {
      if (this.isFisrtSearch) {
        this.lstProductsBackupAfterSort = this.productsFilter;
        this.isFisrtSearch = false;
      }
      this.productsFilter = this.lstProductsBackupAfterSort.filter((item) =>
        item.productName.toUpperCase().includes(this.searchText.toUpperCase())
      );
      this.$router.push({ path: `/${this.link}`, query: { p: 1 } });
      this.pageIndex = 1;
    },
    clearSearchText() {
      this.productsFilter = this.lstProductsBackupAfterSort;
      this.isFisrtSearch = true;
      this.changeSort();
    },
    movingPage(i) {
      if (this.pageIndex == 1 && i == -1) {
        this.$router.push({ path: `/${this.link}`, query: { p: 1 } });
      } else {
        if (
          this.pageIndex == Math.ceil(this.productsFilter.length / 6) &&
          i == 1
        ) {
          return;
        } else {
          this.$router.push({
            path: `/${this.link}`,
            query: { p: parseInt(this.pageIndex) + i },
          });
          this.pageIndex = parseInt(this.pageIndex) + i;
        }
      }
    },
    setTag(id) {
      if (this.lstTagFilter.find((item) => item == id) == undefined) {
        this.lstTagFilter.push(id);
      } else {
        this.lstTagFilter = this.lstTagFilter.filter((item) => item != id);
      }
      if (this.isFilter) this.setFilter(true);
    },
    setFilter(isTrue) {
      if (isTrue) {
        this.isFilter = true;
      } else {
        this.isFilter = !this.isFilter;
      }
      if (this.isFilter && this.lstTagFilter.length > 0) {
        this.productsFilter = this.products.filter((item) => {
          let isSel = true;
          let sub = false;
          item.variants.forEach((variant) => {
            let variantTags = [];
            variant.attributes.forEach((attr) => {
              if (attr.tagId != null) variantTags.push(attr.tagId);
            });
            this.lstTagFilter.forEach((tagId) => {
              if (!variantTags.includes(tagId)) {
                isSel = false;
              }
            });
            if (isSel) sub = true;
          });
          if (sub) {
            if (
              item.variants[0].price > this.range[0] * 1000000 &&
              item.variants[0].price < this.range[1] * 1000000
            )
              return item;
          }
        });
      } else {
        this.productsFilter = this.products;
      }
      this.$router.push({ path: `/${this.link}`, query: { p: 1 } });
      this.pageIndex = 1;
      console.log(this.productsFilter);
      this.isFisrtSearch = true;
    },
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
      products: [],
      lstProductsBackupAfterSort: [],
      isFisrtSearch: true,
      productsFilter: [],
      lstTagFilter: [],
      isFilter: false,
      searchText: '',
      link: '',
      pageIndex: null,
    };
  },
  computed: {
    getListProductWithIndex() {
      let index = this.$route.query.p;
      if (index === undefined || index == 1) {
        return this.productsFilter.slice(0, 6);
      } else {
        return this.productsFilter.slice((index - 1) * 6, (index - 1) * 6 + 6);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  width: 1300px;
  margin: 0 auto;
}
.no-result {
  height: 200px;
  padding: 40px 0px 0px 320px;
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
      padding-left: 180px;
      margin-top: 10px;
      font-size: 16px;
      color: gray;
      .icon-title {
        margin-left: 15px;
        font-size: 18px;
        color: gray;
        margin-right: 10px;
      }
      &:hover {
        cursor: pointer;
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
.paging-container {
  padding: 0px 20px 0px 10px;
  margin-bottom: 100px;
  width: 820px;
  display: flex;
  justify-content: space-between;

  .button-paging {
    background-color: #f43688;
    padding: 12px 0px 0px 260px;
    border-radius: 7px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    height: 50px;
    width: 600px;
    &:hover {
      cursor: pointer;
      background-color: #c32b6c;
    }
  }
  .display-paging {
    margin-top: 7px;
    width: 120px;
    display: flex;
    justify-content: space-between;
    .number {
      text-align: center;
      background-color: white;
      font-weight: bold;
      width: 50px;
      height: 30px;
      margin: 2px 0px 0px 0px;
      padding-top: 2px;
      border-radius: 7px;
    }
    .icon {
      height: 30px;
      width: 30px;
      &:hover {
        border-radius: 7px;
        cursor: pointer;
        background-color: #e1e1e1;
      }
    }
  }
}
</style>
