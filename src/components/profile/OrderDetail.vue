<template>
  <v-dialog v-model="showDialog" persistent max-width="1000">
    <v-card class="">
      <div class="d-flex align-center">
        <div class="text-h5 text-center title-popup py-2">
          Chi tiết đơn hàng
        </div>
        <v-spacer></v-spacer>
        <div class="mr-2">
          <v-btn icon @click="close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="d-flex justify-space-between">
        <div class="px-4">
          <div class="mb-6">
            <strong>Mã đơn hàng: </strong> {{ order.orderId }}
          </div>
          <div>
            <v-row>
              <v-col cols="5">
                <strong>Người nhận: </strong> {{ order.recipientName }}
              </v-col>
              <v-col cols="7">
                <strong>Địa chỉ: </strong>
                {{ getAddress(order.deliveryAddress) }}
              </v-col>
              <v-col cols="5">
                <strong>Ngày tạo đơn: </strong>
                {{ formatDate(order.createdAt) }}
              </v-col>
              <v-col cols="5">
                <strong>Trạng thái: </strong>
                {{ convertName(order.orderStatus) }}
              </v-col>
              <v-col cols="5">
                <strong>Tổng tiền: </strong>
                {{ order.totalPrice.toLocaleString() }} đ
              </v-col>
              <v-col cols="5"
                ><strong>Giảm giá: </strong> {{ order.discountPrice }} đ</v-col
              >
              <v-col cols="5">
                <strong>Thanh toán: </strong
                >{{ (order.totalPrice - order.discountPrice).toLocaleString() }}
                đ
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <div class="my-2">
        <v-data-table
          :headers="headers"
          :items="order.orderDetails"
          :items-per-page="5"
          class="elevation-1"
          hide-default-footer
          height="250px"
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
        case 'COMPLETED':
          return 'Thành công';
        case 'CANCELED':
          return 'Huỷ đơn';
        case 'SHIPPING':
          return 'Đang giao';

        default:
          break;
      }
    },
    getAddress(address) {
      if (address == null) return;
      let province, district, ward, street;
      const addressDetail = address.split('|');
      addressDetail.forEach((item) => {
        if (item.includes('Province')) {
          province = item.substr(9, item.length);
        }
        if (item.includes('District')) {
          district = item.substr(9, item.length);
        }
        if (item.includes('Ward')) {
          ward = item.substr(5, item.length);
        }
        if (item.includes('Address')) {
          street = item.substr(8, item.length);
        }
      });
      return province + ', ' + district + ', ' + ward + ', ' + street;
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

<style lang="scss" scoped>
.title-popup {
  width: 100%;
}
</style>
