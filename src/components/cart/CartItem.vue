<template>
  <div class="container">
    <v-row>
      <v-col cols="2">
        <v-img class="image" :src="item.imgUrl"> </v-img>
      </v-col>
      <v-col cols="6">
        <div class="product-name">
          {{ item.productName }}
        </div>
        <div class="variant-name">
          <v-icon class="icon">mdi-alert-circle-outline</v-icon>
          {{ item.variants[0].variantName }}
        </div>
        <div class="variant-price">
          <v-icon class="icon">mdi-currency-usd</v-icon>
          {{ item.variants[0].price.toLocaleString() }}
        </div>
      </v-col>
      <v-col cols="2">
        <div class="quantity">
          <v-icon class="minus" @click="minus">mdi-minus</v-icon>
          <div class="counter">{{ item.variants[0].quantity }}</div>
          <v-icon class="plus" @click="plus">mdi-plus</v-icon>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="total-price">
          {{ item.total.toLocaleString() }}
        </div>
        <div class="delete-icon-container">
          <v-icon class="delete-icon">mdi-close-circle-outline</v-icon>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: {
        productName: "Asus Vivobook 15 A515 OLED (A515EA-L12033W)",
        productDesc: "",
        imgUrl:
          "https://media-api-beta.thinkpro.vn/media/core/products/2022/2/27/A515-OLED-thinkpro-01.png?w=700&h=700",
        productLink: "asus-vivobook-15-a515-oled",
        totalVariant: 1,
        variants: [
          {
            variantId: 1,
            sku: "Vivobooka515O03CF",
            variantName: "15.6, 1920x1080 px, 60 Hz • Pin 42 WHR",
            variantDesc: "",
            price: 18490000,
            imgUrl:
              "https://media-api-beta.thinkpro.vn/media/core/products/2022/2/27/A515-OLED-thinkpro-02.png?w=700&h=700",
            quantity: 1
          }
        ],
        total: 0
      }
    };
  },
  methods: {
    plus() {
      this.item.variants[0].quantity++;
      this.item.total =
        this.item.variants[0].quantity * this.item.variants[0].price;
    },
    minus() {
      if (this.item.variants[0].quantity > 1) {
        this.item.variants[0].quantity--;
        this.item.total =
          this.item.variants[0].quantity * this.item.variants[0].price;
      }
    },
    async setTotal() {
      this.item.total = parseInt(
        this.item.variants[0].quantity * this.item.variants[0].price
      );
    }
  },
  created() {
    this.setTotal();
  }
};
</script>
<style lang="scss" scoped>
.container {
  margin: 10px 0px 10px 0px;
  padding-top: 20px;
  width: 700px;
  background-color: white;
  height: 150px;
  border-radius: 15px;
  .image {
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #c4cdd0;
  }
  .icon {
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
  }
  .product-name {
    font-weight: bold;
    font-size: 13px;
  }
  .variant-name {
    color: gray;
    font-size: 16px;
  }
  .variant-price {
    color: #f43688;
    font-weight: bold;
  }
  .quantity {
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
      font-weight: bold;
      margin: 3px 20px 0px 20px;
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
  .total-price {
    padding-top: 2px;
    color: #f43688;
    font-weight: bold;
  }
  .delete-icon-container {
    padding: 25px 10px 10px 65px;
    .delete-icon {
      &:hover {
        cursor: pointer;
        color: black;
      }
    }
  }
}
</style>
