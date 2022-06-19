<template>
  <div class="wrapper">
    <v-breadcrumbs :items="breadcrumb">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row>
      <v-col cols="7">
        <div class="product-image-container">
          <v-carousel
            hide-delimiters
            show-arrows-on-hover
            :class="`rounded-xl`"
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
            {{ radios != null ? `SKU: ${radios.sku}` : '' }}
          </div>
          <div class="label-price">
            {{ radios != null ? radios.price.toLocaleString() : '' }}
          </div>
          <div class="variant-container">
            <v-container fluid>
              <v-radio-group v-model="radios" mandatory @change="setQuantity">
                <template v-slot:label>
                  <div class="title-v">Phiên bản</div>
                </template>
                <div class="content">
                  <v-radio
                    v-for="n in product.variants"
                    :key="n.variantId"
                    :value="n"
                  >
                    <template v-slot:label>
                      <variant-radio :item="n" />
                    </template>
                  </v-radio>
                </div>
              </v-radio-group>
            </v-container>
          </div>
          <div class="add-card-container">
            <div class="quantity">
              <v-icon class="minus" @click="clickQty(-1)">mdi-minus</v-icon>
              <div class="counter">{{ quantity }}</div>
              <v-icon class="plus" @click="clickQty(1)">mdi-plus</v-icon>
            </div>
            <div class="add-btn" @click="addToCart">THÊM VÀO GIỎ HÀNG</div>
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
          <!-- <div class="discount">
            <div class="title">
              <v-icon class="icon-title" color="black">mdi-gift</v-icon>Chương
              trình khuyến mãi
            </div>
          </div> -->
          <div class="insurance">
            <div class="title">
              <v-icon class="icon-title" color="black"
                >mdi-shield-check-outline</v-icon
              >Bảo hành, đổi trả
            </div>
            <div class="content">
              <ul>
                <li>Bảo hành 12 tháng tại <strong>Gear Shop</strong></li>
                <li>Một đổi một trong vòng một tháng đầu tiên</li>
              </ul>
            </div>
          </div>
          <div class="description">
            <div class="title">
              <v-icon class="icon-title" color="black"
                >mdi-clipboard-text-outline</v-icon
              >Mô tả sản phẩm
            </div>
            <div class="pr-2">
              {{ product.productDesc }}
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
                <div class="btn-hotline">LIÊN HỆ HOTLINE</div>
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
import VariantRadio from '../components/productdetail/VariantRadio.vue';
import { mapState } from 'vuex';
export default {
  components: {
    VariantRadio,
  },
  data() {
    return {
      breadcrumb: [
        {
          text: 'Trang chủ',
          disabled: false,
          href: '/laptop',
        },
        {
          text: 'Xem chi tiết',
          disabled: false,
          href: '',
        },
      ],
      product: {},
      radios: null,
      imgs: [],
      quantity: 1,
      clicked: [],
    };
  },
  created() {
    this.getProduct();
  },
  computed: {
    ...mapState('auth', ['isAuthendicated']),
  },
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
    },
    clickQty(i) {
      if (this.quantity > 1 && i == -1) {
        this.quantity = this.quantity + i;
      }
      if (this.quantity < this.radios.quantity && i == 1) {
        this.quantity = this.quantity + i;
      }
    },
    setQuantity() {
      if (this.radios.quantity < 1) {
        this.quantity = 0;
      } else {
        this.quantity = 1;
      }
    },
    async addToCart() {
      if (this.isAuthendicated) {
        if (!this.clicked.includes(this.radios.variantId)) {
          const response = await this.$http.post(`orders/add-item`, {
            quantity: this.quantity,
            variantId: this.radios.variantId,
          });
          if (response.status != 200) {
            this.$notify.error('Không thể thêm sản phẩm vào giỏ hàng');
          }
          if (response.status == 200) {
            this.$notify.success('Đã thêm sản phẩm vào giỏ hàng');
          }
          this.clicked.push(this.radios.variantId);
        } else {
          this.$notify.warning('Đã sản phẩm vào giỏ hàng');
        }
      } else {
        let cart;
        const lc = localStorage.getItem('cart');
        if (!lc) {
          cart = null;
        } else {
          cart = JSON.parse(localStorage.getItem('cart'));
        }
        if (cart != null) {
          if (
            cart.orderDetails.find(
              (item) => item.variant.variantId == this.radios.variantId
            ) == undefined
          ) {
            cart.orderDetails.push({
              quantity: this.quantity,
              variant: this.radios,
              variantId: this.radios.variantId,
            });
            this.$notify.success('Đã thêm sản phẩm vào giỏ hàng');
          } else {
            this.$notify.warning('Sản phẩm đã tồn tại trong giỏ hàng');
          }
        } else {
          cart = {};
          cart['orderDetails'] = [
            {
              quantity: this.quantity,
              variant: this.radios,
              variantId: this.radios.variantId,
            },
          ];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  width: 1200px;
  margin: 0 auto;
  .product-detail {
    margin-top: -20px;
    width: 600px;
    padding: 0px 0px 20px 20px;
    border-radius: 25px;
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
    .insurance {
      .content {
        background-color: #f1f1f1;
        margin-right: 20px;
        height: 70px;
        align-items: center;
        border-radius: 10px;
      }
    }
    .thanking {
      background-color: rgba(248, 250, 252);
      border-radius: 10px;
      margin-right: 15px;
      .thanking-text {
        padding-left: 20px;
      }
      .btn-hotline {
        margin: 40px 0px 0px 20px;
        padding: 12px 0px 0px 70px;
        height: 50px;
        width: 300px;
        border-radius: 10px;
        background-color: #f43688;
        font-weight: bold;
        color: white !important;
        &:hover {
          cursor: pointer;
          background-color: #c32b6c;
        }
      }
    }
  }

  .product-image-container {
    margin-top: 16px;
    height: 500px;
    width: 600px;
    border-radius: 20px;
    background-color: white;
  }
  .product-infor-container {
    width: 470px;
    margin-top: 20px;
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
      .content {
        max-height: 230px;
        overflow-y: scroll;
      }
      .content::-webkit-scrollbar {
        display: none;
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
        padding: 12px 0px 0px 55px;
        height: 50px;
        width: 300px;
        border-radius: 10px;
        background-color: #f43688;
        font-weight: bold;
        color: white !important;
        &:hover {
          cursor: pointer;
          background-color: #c32b6c;
        }
      }
    }
  }
}
</style>
