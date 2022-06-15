<template>
  <div class="wrapper">
    <v-row>
      <v-col cols="4">
        <div class="mb-10">
          <strong>Mã đơn hàng:</strong> #{{ item.orderId }}
        </div>
        <div class="mb-3">
          <strong>Ngày đặt: </strong>{{ item.createdAt.substring(8, 10) }}-{{
            item.createdAt.substring(5, 7)
          }}-{{ item.createdAt.substring(0, 4) }}
        </div>
        <div class="mb-3">
          <strong>Trạng thái đơn hàng:</strong> {{ item.orderStatus }}
        </div>
        <div class="mb-3">
          <strong>Tình trạng thanh toán:</strong> {{ item.paymentStatus }}
        </div>
        <div class="mb-3">
          <strong>Tổng tiền:</strong> {{ item.totalPrice.toLocaleString() }}
        </div>
        <div class="mb-3">
          <strong>Khuyến mãi:</strong> {{ item.totalPrice.toLocaleString() }}
        </div>
        <div class="mb-3">
          <strong>Tổng cộng:</strong> {{ item.totalPrice.toLocaleString() }}
        </div>
      </v-col>
      <v-col cols="8">
        <div class="title-detail">Chi tiết đơn hàng:</div>
        <v-row class="container-detail">
          <v-col
            v-for="data in item.orderDetails"
            :key="data.variant.variantId"
            cols="12"
          >
            <div>
              <v-row>
                <v-col cols="3">
                  <v-img
                    class="image"
                    :src="data.variant.imgUrl"
                    height="98"
                    width="98"
                  >
                  </v-img>
                </v-col>
                <v-col cols="6">
                  <div>{{ data.variant.variantName }}</div>
                  <div>
                    {{
                      `${data.variant.price.toLocaleString()} x ${
                        data.quantity
                      }`
                    }}
                  </div>
                  <div class="ttprice">
                    {{ (data.variant.price * data.quantity).toLocaleString() }}
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ['items'],
  data() {
    return {
      item: {},
    };
  },
  created() {
    this.item = JSON.parse(JSON.stringify(this.items));
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  height: 350px;
  margin: 0px 10px 0px 100px !important;
  padding: 10px 10px 20px 10px !important;
  width: 850px !important;
  background-color: white;
  border-radius: 15px;
  .title-detail {
    background-color: white;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .container-detail {
    margin-bottom: 20px;
    height: 300px;
    overflow-y: scroll;
    .image {
      border-radius: 5px;
      border-width: 1px;
      border-style: solid;
      border-color: #c4cdd0;
    }
    .ttprice {
      color: #f43688;
      font-weight: bold;
    }
  }
  .container-detail::-webkit-scrollbar {
    display: none;
  }
}
</style>
