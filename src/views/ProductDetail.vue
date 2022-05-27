<template>
  <div class="wrapper">
    <v-row>
      <v-col cols="7">
        <div class="product-image-container">
          <v-carousel
            hide-delimiters
            show-arrows-on-hover
            :class="`rounded-xl rounded-bl-0`"
          >
            <v-carousel-item
              v-for="(item, i) in imgs"
              :key="i"
              :src="item"
            ></v-carousel-item>
          </v-carousel>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="product-infor-container">
          <div class="bookmark-save">
            Lưu <v-icon>mdi-bookmark-outline</v-icon>
          </div>
          <div class="label-name">
            {{ product.productName }}
          </div>
          <div class="label-sku">
            {{ radios != null ? `SKU: ${radios.sku}` : "" }}
          </div>
          <div class="label-price">
            {{ radios != null ? radios.price.toLocaleString() : "" }}
          </div>
          <div class="variant-container">
            <v-container fluid>
              <v-radio-group v-model="radios" mandatory>
                <template v-slot:label>
                  <div class="title-v">Phiên bản</div>
                </template>
                <v-radio
                  v-for="n in product.variants"
                  :key="n.variantId"
                  :value="n"
                >
                  <template v-slot:label>
                    <variant-radio :item="n" />
                  </template>
                </v-radio>
              </v-radio-group>
            </v-container>
          </div>
          <div class="add-card-container">
            <div class="quantity">
              <v-icon class="minus">mdi-minus</v-icon>
              <div class="counter">1</div>
              <v-icon class="plus">mdi-plus</v-icon>
            </div>
            <v-btn class="add-btn" depressed elevation="2" plain x-large
              >Thêm vào giỏ hàng</v-btn
            >
          </div>
        </div>
      </v-col>
      <v-col cols="7">
        <div class="product-detail">
          <div class="product-attribute">
            <div class="title">
              <v-icon class="icon-title" color="black"
                >mdi-gamepad-circle-left</v-icon
              >Cấu hình & đặc điểm
            </div>
            <div>
              <v-row v-if="radios !== null">
                <v-col
                  class="product-attribute-container"
                  v-for="data in radios.attributes"
                  :key="data.attributeId"
                  cols="5"
                >
                  <div class="font-weight-bold">
                    <v-icon class="icon-title" color="black"
                      >{{ data.attributeIcon }}
                    </v-icon>
                    {{ data.attributeName }}
                  </div>
                  <div class="pl-6 pt-2">{{ data.value }}</div>
                </v-col>
              </v-row>
            </div>
          </div>
          <div class="discount">
            <div class="title">
              <v-icon class="icon-title" color="black">mdi-gift</v-icon>Chương
              trình khuyến mãi
            </div>
          </div>
          <div class="insurance">
            <div class="title">
              <v-icon class="icon-title" color="black"
                >mdi-shield-check-outline</v-icon
              >Bảo hành, đổi trả
            </div>
          </div>
          <div class="description">
            <div class="title">
              <v-icon class="icon-title" color="black"
                >mdi-clipboard-text-outline</v-icon
              >Mô tả sản phẩm
            </div>
          </div>
          <div class="thanking">
            <div class="title">Cảm ơn bạn đã xem</div>
            <v-row>
              <v-col cols="7">
                <div class="thanking-text">
                  Cảm ơn bạn đã xem sản phẩm của chúng tôi, hãy liên hệ để được
                  trải nghiệm và tư vấn miễn phí bạn nhé!
                </div>
                <v-btn class="btn-hotline" depressed raised x-large>
                  Liên hệ hotline</v-btn
                >
              </v-col>
              <v-col cols="5">
                <v-img
                  max-height="220px"
                  max-width="180px"
                  src="https://thinkpro.vn/demo/4.png"
                >
                </v-img>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import VariantRadio from "../components/productdetail/VariantRadio.vue";
export default {
  components: {
    VariantRadio
  },
  data() {
    return {
      product: {},
      radios: null,
      imgs: []
    };
  },
  created() {
    this.getProduct();
  },
  computed: {},
  methods: {
    async getProduct() {
      let link = this.$route.params.link;
      const response = await this.$http.get(`website/products/link/${link}`);
      this.product = response.content;
      let lstImg = [];
      lstImg.push(this.product.imgUrl);
      this.product.variants.forEach((element) => {
        lstImg.push(element.imgUrl);
      });
      this.imgs = lstImg;
      console.log(this.product);
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  width: 1200px;
  margin: 0 auto;
  .product-detail {
    width: 600px;
    padding: 0px 0px 20px 20px;
    border-radius: 20px;
    background-color: white;
    .title {
      padding-top: 10px;
      margin-bottom: 20px;
      font-weight: bold;
      padding-left: 10px;
      .icon-title {
        margin-right: 10px;
      }
    }
    .product-attribute-container {
      margin-left: 10px;
    }
    .discount {
      background-color: #fff8f2;
      height: 500px;
      margin-right: 15px;
    }
    .thanking {
      background-color: rgba(248, 250, 252);
      border-radius: 10px;
      margin-right: 15px;
      .thanking-text {
        padding-left: 20px;
      }
      .btn-hotline {
        margin: 20px 0px 0px 60px;
        color: #f43688;
        background-color: rgba(248, 250, 252);
      }
    }
  }

  .product-image-container {
    height: 550px;
    width: 600px;
    border-radius: 20px;
    background-color: white;
  }
  .product-infor-container {
    padding: 10px 0px 20px 20px;
    margin-left: -70px;
    border-radius: 20px;
    background-color: white;
    .bookmark-save {
      margin-left: 370px;
      margin-bottom: 20px;
    }
    .label-name {
      font-weight: bolder;
      font-size: 22px;
    }
    .label-sku {
      font-size: 16px;
      color: gray;
    }
    .label-price {
      font-size: 20px;
      font-weight: bolder;
      color: #f43688;
    }
    .variant-container {
      .title-v {
        font-size: 13px;
        font-weight: bolder;
        color: black;
      }
    }
    .add-card-container {
      display: flex;
      justify-content: space-around;
      .quantity {
        padding-top: 12px;
        display: flex;
        justify-content: space-between;
        .minus {
          height: 27px;
          width: 27px;
          background-color: #fbfbfb;
          border-radius: 3px;
          &:hover {
            cursor: pointer;
            background-color: #e1e1e1;
          }
        }
        .counter {
          margin: 0px 20px 0px 20px;
        }
        .plus {
          height: 27px;
          width: 27px;
          background-color: #fbfbfb;
          border-radius: 3px;
          &:hover {
            cursor: pointer;
            background-color: #e1e1e1;
          }
        }
      }
      .add-btn {
        border-radius: 10px;
        background-color: #f43688;
        color: white !important;
        font-weight: bold;
      }
    }
  }
}
</style>
