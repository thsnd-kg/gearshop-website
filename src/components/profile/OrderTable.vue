<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="10"
      class="elevation-1"
      @click:row="selectOrder"
    >
      <template v-slot:item.orderStatus="{ item }">
        <v-chip
          :key="item.orderId"
          :color="getColor(item.orderStatus)"
          outlined
          label
          class="mr-1 my-1"
          lg="mr-2"
          xl="mr-2"
          sm="mr-2"
        >
          {{ convertName(item.orderStatus) }}
        </v-chip>
      </template>
      <template v-slot:item.totalPaid="{ item }">
        <span
          >{{ (item.totalPrice - item.discountPrice).toLocaleString() }} đ</span
        >
      </template>
      <template v-slot:item.createdAt="{ item }">
        <span>{{ formatDate(item.createdAt) }} </span>
      </template>
    </v-data-table>
    <OrderDetail
      v-if="isShow"
      :order="order"
      @closeOrderDetail="close"
    ></OrderDetail>
  </div>
</template>

<script>
import OrderDetail from './OrderDetail.vue';
export default {
  components: {
    OrderDetail,
  },

  data() {
    return {
      headers: [
        {
          text: 'Mã đơn hàng',
          align: 'start',
          value: 'orderId',
        },
        { text: 'Ngày tạo đơn', value: 'createdAt' },
        { text: 'Trạng thái', value: 'orderStatus' },
        { text: 'Thanh toán', value: 'totalPaid' },
      ],

      orders: [],
      isShow: false,
    };
  },

  created() {
    this.getOrders();
  },

  methods: {
    async getOrders() {
      try {
        const response = await this.$http.get('orders/user');
        if (response.status === 200) {
          const { content } = response;
          this.orders = content;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getColor(status) {
      console.log('ok');
      switch (status) {
        case 'PENDING':
          return 'teal';
        case 'SUCCESS':
          return 'green';
        case 'CANCELED':
          return 'red';
        case 'SHIPPING':
          return 'blue';

        default:
          break;
      }
    },

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

    selectOrder(item) {
      this.isShow = true;
      this.order = { ...item };
    },

    async close(isCanceled) {
      if (isCanceled) await this.getOrders();

      this.isShow = false;
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