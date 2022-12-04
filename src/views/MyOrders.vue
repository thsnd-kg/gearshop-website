<template>
  <div class="wrapper">
    <v-breadcrumbs :items="breadcrumb">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row>
      <v-col cols="8" v-for="data in items" :key="data.orderId">
        <OrderItem :items="data" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue';
import { fetchMyOrders } from "@/api/order-service";
export default {
  components: {
    OrderItem,
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
          text: 'Danh sách đơn hàng',
          disabled: false,
          href: '',
        },
      ],
      items: {},
    };
  },
  methods: {
    async getOrders() {
      const response = await fetchMyOrders();
      if (response.status == 200) {
        this.items = response.content;
      } else {
        this.$notify.warning('Bạn chưa có đơn hàng nào cả!');
      }
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  margin: auto;
  width: 1100px;
  .title {
    margin-bottom: 10px;
  }
}
</style>