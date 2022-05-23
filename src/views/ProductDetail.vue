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
              :src="item.src"
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
            Asus Vivobook 15 A515 OLED (A515EA-L12033W)
          </div>
          <div class="label-sku">SKU:Vivobooka515O03CF</div>
          <div class="label-price">18.490.000</div>
          <div class="variant-container">
            <v-container fluid>
              <v-radio-group v-model="radios">
                <template v-slot:label>
                  <div class="title-v">Phiên bản</div>
                </template>
                <v-radio value="Google">
                  <template v-slot:label>
                    <div class="item-variant-container">
                      <div class="variant-name-label">
                        15.6, 1920x1080 px, 60 Hz • Pin 42 WHr
                      </div>
                      <div class="variant-price-label">12.000.000</div>
                      <div class="variant-attributes-label">
                        <v-chip class="chip" label outlined>
                          Celeron N4020
                        </v-chip>
                        <v-chip class="chip" label outlined> RAM 4GB </v-chip>
                        <v-chip class="chip" label outlined> SSD 256GB </v-chip>
                      </div>
                    </div>
                  </template>
                </v-radio>
                <v-radio value="Duckduckgo">
                  <template v-slot:label>
                    <div class="item-variant-container">
                      <div class="variant-name-label">
                        15.6, 1920x1080 px, 60 Hz • Pin 42 WHr
                      </div>
                      <div class="variant-price-label">12.000.000</div>
                      <div class="variant-attributes-label">
                        <v-chip class="chip" label outlined>
                          Celeron N4020
                        </v-chip>
                        <v-chip class="chip" label outlined> RAM 4GB </v-chip>
                        <v-chip class="chip" label outlined> SSD 256GB </v-chip>
                      </div>
                    </div>
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
export default {
  data() {
    return {
      imgs: [
        {
          src: "https://media-api-beta.thinkpro.vn/media/core/products/2022/4/6/%20Laptop%20Gaming%20Colorful%20X15.jpeg?w=700&h=700"
        },
        {
          src: "https://media-api-beta.thinkpro.vn/media/core/products/2022/4/6/%20Laptop%20Gaming%20Colorful%20X15%207.jpeg?w=700&h=700"
        },
        {
          src: "https://media-api-beta.thinkpro.vn/media/core/products/2022/4/6/%20Laptop%20Gaming%20Colorful%20X15%202.jpeg?w=700&h=700"
        },
        {
          src: "https://media-api-beta.thinkpro.vn/media/core/products/2022/4/6/%20Laptop%20Gaming%20Colorful%20X15%204.jpeg?w=700&h=700"
        }
      ]
    };
  }
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
    border-radius: 20px;
    background-color: white;
    .title {
      padding-top: 10px;
      font-weight: bold;
      padding-left: 10px;
      .icon-title {
        margin-right: 10px;
      }
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
      .item-variant-container {
        margin-bottom: 10px;
        padding: 7px 0px 5px 5px;
        height: 100px;
        width: 370px;
        border-radius: 10px;
        box-shadow: 1px 1px 1px 1px #d8d9db;
        &:hover {
          background-color: #d8d9db;
        }
        .variant-name-label {
          font-weight: bold;
        }
        .variant-price-label {
          font-weight: bold;
          color: #f43688;
        }
        .variant-attributes-label {
          .chip {
            font-size: 12px;
            height: 25px;
            margin-left: 4px;
            padding: 0 6px;
          }
        }
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
