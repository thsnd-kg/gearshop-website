<template>
  <div class="container">
    <v-row>
      <v-col cols="2">
        <v-img class="image" :src="item.variant.imgUrl" height="98" width="98" @click="pushTo(item.variant.productLink)"> </v-img>
      </v-col>
      <v-col cols="6">
        <div class="product-name">
          {{ item.variant.productName }}
        </div>
        <div class="variant-name">
          <v-icon class="icon">mdi-alert-circle-outline</v-icon>
          {{ item.variant.variantName }}
        </div>
        <div class="variant-price">
          <v-icon class="icon">mdi-currency-usd</v-icon>
          {{ item.variant.price.toLocaleString() }}
        </div>
      </v-col>
      <v-col cols="2">
        <div class="quantity">
          <v-icon class="minus" @click="minus">mdi-minus</v-icon>
          <div class="counter">{{ item.quantity }}</div>
          <v-icon class="plus" @click="plus">mdi-plus</v-icon>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="total-price">
          {{ item.total.toLocaleString() }}
        </div>
        <div class="delete-icon-container">
          <v-icon class="delete-icon" @click="del">mdi-close-circle-outline</v-icon>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ["items"],
  data() {
    return {
      item: {}
    };
  },
  methods: {
    plus() {
      this.$emit('edit-qty',this.item.variant.variantId,1);
      if(this.item.variant.quantity > this.item.quantity)
      this.item.quantity++;
      this.item.total =
        this.item.quantity * this.item.variant.price;
    },
    minus() {
      if (this.item.quantity > 1) {
         this.$emit('edit-qty',this.item.variant.variantId,-1);
        this.item.quantity--;
        this.item.total =
          this.item.quantity * this.item.variant.price;
      }
    },
    del() {
      this.$emit('delete',this.item.variant.variantId)
    },
    async setTotal() {
      this.item = JSON.parse(JSON.stringify(this.items));
      this.item['total'] = parseInt(
        this.item.quantity * this.item.variant.price
      );
    },
    pushTo(link) {
       let routeData = this.$router.resolve({
        name: "Product Detail",
        params: { link: link }
      });
      window.open(routeData.href, "_blank");
    }
  },
  created() {
    this.setTotal();
  }
};
</script>
<style lang="scss" scoped>
.container {
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
    &:hover {
      cursor: pointer;
    }
  }
  .icon {
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
  }
  .product-name {
    font-weight: bold;
    font-size: 15px;
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
