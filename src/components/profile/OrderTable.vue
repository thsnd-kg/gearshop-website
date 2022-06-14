<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="10"
      class="elevation-1"
      @click:row="selectOrder"
    >
      <template v-slot:item.status="{ item }">
        <v-chip
          :key="item.id"
          :color="getColor(item.status)"
          outlined
          label
          class="mr-1 my-1"
          lg="mr-2"
          xl="mr-2"
          sm="mr-2"
        >
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.totalPaid="{ item }">
        <span>{{ item.totalPaid.toLocaleString() }} đ</span>
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
          value: 'id',
        },
        { text: 'Ngày tạo đơn', value: 'createdAt' },
        { text: 'Trạng thái', value: 'status' },
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
        const response = await this.$http.get('orders');
        if (response.success) {
          const { data } = response;
          this.orders = data.items;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getColor(status) {
      switch (status) {
        case 'Pending':
          return 'teal';
        case 'Success':
          return 'green';
        case 'Canceled':
          return 'red';
        case 'Delivered':
          return 'blue';

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