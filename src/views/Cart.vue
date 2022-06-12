<template>
  <div class="wrapper">
    <v-breadcrumbs :items="breadcrumb">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col 
          v-for="data in items.orderDetails"
          :key="data.variant.variantId"
          cols="12">
            <CartItem :items="data" @delete="delItem" @edit-qty="editQty"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-col cols="12">
            <div class="discount-container">
              <div class="title">
                <v-icon class="icon"> mdi-ticket-percent-outline </v-icon>
                Mã khuyến mãi
              </div>
              <div class="content">
                <v-text-field
                  class="input-discount"
                  flat
                  clearable
                  placeholder="Nhập mã khuyến mãi"
                  dense
                  height="40px"
                  solo
                ></v-text-field>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="order-container">
              <div class="title">
                <v-icon class="icon">mdi-text-box-check-outline</v-icon> Tóm tắt
                đơn hàng
              </div>

              <div class="detail">
                <div class="tamtinh">
                  <div>Số lượng:</div>
                  <div>{{num}}</div>
                </div>
                <div class="tamtinh">
                  <div>Tạm tính:</div>
                  <div>{{items.totalPrice != undefined ?  items.totalPrice.toLocaleString() : 0}}</div>
                </div>
                <div class="tamtinh">
                  <div>Khuyến mãi:</div>
                  <div>0</div>
                </div>
              </div>
              <div class="total">
                <div>Tổng cộng:</div>
                <div>0</div>
              </div>
              <div class="checkout-btn" @click="handleClickCk" >Check out<v-icon color="white">mdi-chevron-right</v-icon></div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CartItem from "../components/cart/CartItem.vue";
export default {
  components: {
    CartItem
  },
  data() {
    return {
      breadcrumb:[
        {
          text: 'Trang chủ',
          disabled: false,
          href: '/laptop',
        },
        {
          text: 'Giỏ hàng',
          disabled: false,
          href: '',
        },
      ],
      items: {},
      num: 0,
    }
  },
  methods: {
    async getCart() {
      const response = await this.$http.get(`orders/cart`);
      if(response.status == 200) {
        this.items = response.content
      }
      this.caculateQty();
    },
     async handleClickCk()  {
      if(this.items.orderDetails.lenght > 0) {
      this.$router.push("/checkout");
      } 
      else {
          this.$notify.warning("Danh sách rỗng!")
      }
    },
    async delItem(id) {
     this.items.orderDetails = this.items.orderDetails.filter(item => item.variant.variantId !== id);
      await this.$http.post(`orders/remove-item`,id);
     this.caculateTotal();
    },
    async editQty(id, i) {
      let qty = 0;
       this.items.orderDetails =  this.items.orderDetails.map(item => {
         if(item.variant.variantId == id) {
           item.quantity += i;
           qty = item.quantity;
         }
        return item
       })
       await this.$http.post(`orders/add-item`,{quantity: qty, variantId: id});
       this.caculateTotal();
    },
    caculateTotal() {
      let total = 0;
      this.items.orderDetails.forEach(item => {
        total += item.quantity*item.variant.price;
      });
      this.items.totalPrice = total;
      this.caculateQty();
    },
    caculateQty() {
      let total = 0;
      this.items.orderDetails.forEach(item => {
        total += item.quantity;
      });
      this.num = total;
    }
  },
  created() {
    this.getCart();
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: auto;
  width: 1100px;
}
.discount-container {
  height: 150px;
  background-color: white;
  border-radius: 10px;
  padding: 10px 10px 10px 10px;
  .title {
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 18px !important;
    .icon {
      color: black;
      font-size: 22px;
      margin-right: 5px;
    }
  }
  .content {
    margin-left: 18px;
    width: 300px;
    height: 80px;
    background-image: url("https://thinkpro.vn/_nuxt/img/promo-image.93bb1ff.png");
    border-radius: 10px;
    background-color: #2d89e5;
    padding: 28px 2px 4px 80px;
    .input-discount {
      width: 180px;
    }
  }
}
.order-container {
  background-color: white;
  border-radius: 10px;
  padding: 10px 10px 10px 10px;
  .title {
    font-weight: bold;
    font-size: 18px !important;
    margin-bottom: 20px;
    .icon {
      color: black;
      font-size: 22px;
      margin-right: 5px;
    }
  }
  .detail {
    padding: 0px 5px 10px 5px;
    border-style: dashed;
    border-width: 0px 0px 1px 0px;
    border-color: grey;
    .tamtinh {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
  .total {
    padding: 20px 5px 20px 5px;
    display: flex;
    justify-content: space-between;
    border-style: solid;
    border-width: 0px 0px 1px 0px;
    border-color: grey;
  }
  .checkout-btn {
    margin: 20px 0px 0px 15px;
    padding: 12px 0px 0px 110px;
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
</style>
