<template>
  <v-dialog v-model="showDialog" persistent max-width="1000">
    <v-card class="">
      <div class="d-flex align-center">
        <v-card-title class="text-h5">Chi tiết đơn hàng</v-card-title>
        <v-spacer></v-spacer>
        <div class="mr-2">
          <v-btn icon @click="close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="d-flex justify-space-between">
        <div class="px-4">
          <div><strong>Mã đơn hàng: </strong> {{ order.orderId }}</div>
          <div>
            <strong>Ngày tạo đơn: </strong> {{ formatDate(order.createdAt) }}
          </div>
          <div>
            <strong>Trạng thái: </strong> {{ convertName(order.orderStatus) }}
          </div>
          <div>
            <strong>Tổng tiền: </strong>
            {{ order.totalPrice.toLocaleString() }} đ
          </div>
          <div><strong>Giảm giá: </strong> {{ order.discountPrice }} đ</div>
          <div>
            <strong>Thanh toán: </strong
            >{{ (order.totalPrice - order.discountPrice).toLocaleString() }} đ
          </div>
        </div>
      </div>
      <div class="my-2">
        <v-data-table
          :headers="headers"
          :items="order.orderDetails"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.imgUrl="{ item }">
            <v-img
              class="ma-2"
              width="48"
              height="48"
              :src="item.variant.imgUrl"
            >
            </v-img>
          </template>
          <template v-slot:item.price="{ item }">
            <span>{{ item.unitPrice.toLocaleString() }} đ</span>
          </template>
          <template v-slot:item.total="{ item }">
            <span
              >{{ (item.unitPrice * item.quantity).toLocaleString() }} đ</span
            >
          </template>
        </v-data-table>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      showDialog: true,
      headers: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'imgUrl',
        },
        { text: 'Mã SKU', value: 'variant.sku' },
        { text: 'Tên sản phẩm', value: 'variant.productName' },
        { text: 'Đơn giá', value: 'price' },
        { text: 'Số lượng', value: 'quantity' },
        { text: 'Thành tiền', value: 'total' },
      ],

      isCanceled: false,
    };
  },

  props: {
    order: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  methods: {
    // async cancelOrder() {
    //   try {
    //     this.isLoading = true;
    //     const response = await this.$http.put(
    //       `/orders/${this.order.id}/status/cancel`
    //     );
    //     if (response.success) {
    //       this.$notify.success('Huỷ đơn hàng thành công');
    //       this.isCanceled = true;
    //       this.close();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },

    convertName(name) {
      switch (name) {
        case 'PENDING':
          return 'Đang xử lý';
        case 'SUCCESS':
          return 'Thành công';
        case 'CANCELED':
          return 'Huỷ đơn';
        case 'SHIPPING':
          return 'Đang giao';

        default:
          break;
      }
    },

    close() {
      this.$emit('closeOrderDetail', this.isCanceled);
    },
    formatDate(date) {
      if (!date) return null;
      date = date.slice(0, date.indexOf('T'));

      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    },
  },
};
</script>

<style>
</style>