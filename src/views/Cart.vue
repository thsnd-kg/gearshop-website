<template>
  <div class="wrapper">
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col cols="12">
              <CartItem/>
              <CartItem/>
              <CartItem/>
              <CartItem/>
               </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row>
            <v-col cols="12">
                <div class="discount-container">
                    <div class="title"><v-icon class="icon">mdi-ticket-percent-outline</v-icon> Mã khuyến mãi</div>
                </div>
            </v-col>
            <v-col cols="12">
                <div class="order-container">
                    <div class="title"><v-icon class="icon">mdi-text-box-check-outline</v-icon> Tóm tắt đơn hàng</div>
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
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: auto;
  width: 1100px;
}
.discount-container{
 height: 150px;
 background-color: white;
 border-radius: 10px;
 padding: 10px 10px 10px 10px;
 .title{
     font-weight: bold;
     font-size: 18px !important;
     .icon{
         color: black;
         font-size: 22px;
         margin-right: 5px;
     }
 }
}
.order-container{
height: 350px;
background-color: white;
 border-radius: 10px;
 padding: 10px 10px 10px 10px;
  .title{
     font-weight: bold;
     font-size: 18px !important;
      .icon{
         color: black;
         font-size: 22px;
         margin-right: 5px;
     }
 }
}
</style>
