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
          <v-col cols="12">
            <div class="checkout-container">
              <div class="title">
                <v-icon class="icon"> mdi-phone-outline </v-icon>
                Thông tin liên hệ
              </div>
              <v-row class="px-6">
                <v-col cols="6">
                  <v-text-field
                    class="text-field"
                    label="Họ tên"
                    v-model="user.firstName"
                    outlined
                    clearable
                    dense
                    height="48px"
                    :rules="[notEmpty]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    class="text-field"
                    label="Số điện thoại"
                    v-model="user.phoneNo"
                    outlined
                    clearable
                    dense
                    height="48px"
                    :rules="[isNumber, notEmpty, lenghtNumber]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="checkout-address-container">
              <div class="title">
                <v-icon class="icon">mdi-map-marker-outline</v-icon> Địa chỉ
                nhận hàng
              </div>
              <v-row>
                <v-col cols="6">
                  <v-row no-gutters class="text-field-container">
                    <v-col cols="12">
                      <v-select
                        ref="provinceRef"
                        label="Tỉnh/ Thành phố"
                        :items="provincesAPI"
                        v-model="currentProvince"
                        :item-text="'name'"
                        return-object
                        :value="currentProvince"
                        lass="text-field"
                        height="48"
                        outlined
                        dense
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        class="text-field"
                        label="Quận/ Huyện"
                        :items="districtsAPI"
                        v-model="currentDistrict"
                        :item-text="'name'"
                        return-object
                        height="48"
                        outlined
                        dense
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        class="text-field"
                        :items="wardsAPI"
                        v-model="currentWard"
                        label="Phường/ Xã"
                        :item-text="'name'"
                        return-object
                        height="48"
                        outlined
                        dense
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="currentStreet"
                        class="text-field"
                        label="Địa chỉ cụ thể"
                        outlined
                        clearable
                        dense
                        height="48"
                        :rules="[notEmpty]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12"
                      ><strong>TP HCM, Hà Nội:</strong> Phí ship 40 nghìn
                      đồng.</v-col
                    >
                    <v-col cols="12"
                      ><strong>Các tỉnh:</strong> Phí ship 60 nghìn đồng.</v-col
                    >
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-img
                    src="https://thinkpro.vn/_nuxt/img/giao-tan-noi.342aa8d.png"
                  ></v-img>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-col cols="12">
            <div class="order-container">
              <div class="title">
                <v-icon class="icon">mdi-text-box-check-outline</v-icon> Tóm tắt
                đơn hàng
              </div>
              <div class="detail">
                <div class="tamtinh">
                  <div>Số lượng:</div>
                  <div>{{ num }}</div>
                </div>
                <div class="tamtinh">
                  <div>Tạm tính:</div>
                  <div>
                    {{
                      items.totalPrice != undefined
                        ? items.totalPrice.toLocaleString()
                        : 0
                    }}
                  </div>
                </div>
                <div class="tamtinh">
                  <div>Khuyến mãi:</div>
                  <div>
                    {{
                      items.discountPrice != undefined
                        ? items.discountPrice.toLocaleString()
                        : 0
                    }}
                  </div>
                </div>
                <div class="tamtinh">
                  <div>Phí vận chuyển:</div>
                  <div>0</div>
                </div>
              </div>
              <div class="total">
                <div>Tổng cộng:</div>
                <div>
                  {{
                    items.discountPrice != undefined
                      ? (
                          items.totalPrice - items.discountPrice
                        ).toLocaleString()
                      : 0
                  }}
                </div>
              </div>
              <div class="checkout-btn" @click="handleClickCk">
                Đặt hàng<v-icon color="white">mdi-chevron-right</v-icon>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="infor">
              <v-icon color="#008952">mdi-check </v-icon>
              Bạn sẽ được <strong>miễn phí giao hàng</strong> nếu như thanh toán
              trước
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  data() {
    return {
      breadcrumb: [
        {
          text: 'Trang chủ',
          disabled: false,
          href: '/laptop',
        },
        {
          text: 'Giỏ hàng',
          disabled: false,
          href: '/cart',
        },
        {
          text: 'Check out',
          disabled: false,
          href: '',
        },
      ],
      items: {},
      num: 0,
      name: '',
      phone: '0000',

      user: null,
      provincesAPI: null,
      districtsAPI: null,
      wardsAPI: null,
      currentProvince: null,
      currentDistrict: null,
      currentWard: null,
      currentStreet: null,
    };
  },

  watch: {
    currentProvince(newCurrentProvince) {
      this.districtsAPI = newCurrentProvince.districts;
    },
    currentDistrict(newCurrentDistrict) {
      this.wardsAPI = newCurrentDistrict.wards;
    },
  },

  computed: {
    ...mapGetters('auth', ['isAuthendicated', 'profile']),
  },
  methods: {
    parseAddress(address) {
      // const province = address.substr(
      //   address.indexOf('Province'),
      //   address.indexOf('|')
      // );
      if (address == null) return;

      const addressDetail = address.split('|');
      addressDetail.forEach((item) => {
        if (item.includes('Province')) {
          const name = item.substr(9, item.length);
          this.currentProvince = this.provincesAPI.find(
            (item) => item.name === name
          );
        }
        if (item.includes('District')) {
          const name = item.substr(9, item.length);
          this.currentDistrict = this.currentProvince.districts.find(
            (item) => item.name === name
          );
        }
        if (item.includes('Ward')) {
          const name = item.substr(5, item.length);
          this.currentWard = this.currentDistrict.wards.find(
            (item) => item.name === name
          );
        }
        if (item.includes('Address')) {
          this.currentStreet = item.substr(8, item.length);
        }
      });
    },

    getFormatAddress() {
      const province = this.currentProvince
        ? `Province ${this.currentProvince.name}|`
        : '';
      const district = this.currentDistrict
        ? `District ${this.currentDistrict.name}|`
        : '';
      const ward = this.currentWard ? `Ward ${this.currentWard.name}|` : '';
      const street = this.currentStreet ? `Address ${this.currentStreet}|` : '';

      return province + district + ward + street;
    },

    async getProvince() {
      try {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/?depth=3`
        );
        this.provincesAPI = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    // const district = address.substr(
    //   address.indexOf('District'),
    //   address.indexOf('|')
    // );

    // this.currentProvince = province;
    // console.log(province);
    // console.log(array);

    isNumber(input) {
      return /[0-9]+/g.test(input) || 'Vui lòng nhập số';
    },
    lenghtNumber(input) {
      if (input.length > 10) return 'Tối đa 10 kí tự';
      else return;
    },
    notEmpty(input) {
      if (input == null || input == '') return 'Vui lòng không để trống';
      else return;
    },
    async getCart() {
      if (this.isAuthendicated) {
        console.log(this.user);
        const response = await this.$http.get(`orders/cart`);
        if (response.status == 200) {
          this.items = response.content;
        } else {
          this.$notify.warning('Bạn chưa có sản phẩm nào trong giỏ hàng!');
        }
      } else {
        // get cart from localStorage
        let cart;
        const lc = localStorage.getItem('cart');
        if (!lc) {
          cart = null;
        } else {
          cart = JSON.parse(localStorage.getItem('cart'));
        }
        //check null and set cart
        if (cart != null) {
          this.items = cart;
        } else {
          this.$notify.warning('Bạn chưa có sản phẩm nào trong giỏ hàng');
        }
      }
      this.caculateTotal();
    },
    caculateTotal() {
      let total = 0;
      if (this.items?.orderDetails !== undefined) {
        this.items.orderDetails.forEach((item) => {
          total += item.quantity * item.variant.price;
        });
        this.items.totalPrice = total;
      }
      this.caculateQty();
    },
    caculateQty() {
      let total = 0;
      if (this.items?.orderDetails !== undefined) {
        this.items.orderDetails.forEach((item) => {
          total += item.quantity;
        });
      }
      this.num = total;
    },
    async handleClickCk() {
      if (this.isAuthendicated) {
        if (this.user.firstName == '' || this.user.firstName == null) {
          this.$notify.warning('Vui lòng điền tên người nhận!');
          return;
        }
        if (this.user.phoneNo == '' || this.user.phoneNo == null) {
          this.$notify.warning('Vui lòng điền số điện thoại người nhận!');
          return;
        }
        if (this.items.orderDetails.length > 0) {
          const address = this.getFormatAddress();
          const response0 = await this.$http.post(`orders/user/checkout/info`, {
            deliveryAddress: address,
            recipientName: this.user.firstName,
            phoneNumber: this.user.phoneNo,
          });
          if (response0.status !== 200) {
            this.$notify.error('Lỗi! Vui lòng thử lại sau.');
          } else {
            const response = await this.$http.get(`orders/user/checkout`);
            if (response.status == 200) {
              this.$notify.success('Đặt hàng thành công!');
            } else {
              this.$notify.error('Lỗi! Vui lòng thử lại sau.');
            }
          }
        } else {
          this.$notify.warning('Danh sách rỗng!');
        }
      } else {
        if (this.user.firstName == '' || this.user.firstName == null) {
          this.$notify.warning('Vui lòng điền tên người nhận!');
          return;
        }
        if (this.user.phoneNo == '' || this.user.phoneNo == null) {
          this.$notify.warning('Vui lòng điền số điện thoại người nhận!');
          return;
        }
        if (this.items.orderDetails.length > 0) {
          const address = this.getFormatAddress();
          const response = await this.$http.post(
            `orders/user/checkout/none-account`,
            {
              orderDetail: this.items.orderDetails,
              deliveryAddress: address,
              recipientName: this.name,
              phoneNumber: this.phone,
            }
          );
          if (response.status == 200) {
            this.$notify.success('Đặt hàng thành công!');
            localStorage.removeItem('cart');
            this.$router.push('/');
          } else {
            this.$notify.error('Lỗi! Vui lòng thử lại sau.');
          }
        } else {
          this.$notify.warning('Danh sách rỗng!');
        }
      }
    },
  },
  async created() {
    await this.getCart();
    this.user = { ...this.profile };
    await this.getProvince();
    await this.parseAddress(this.user.address);
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  margin: auto;
  width: 1100px;
  .checkout-container {
    padding: 15px 10px 20px 15px;
    border-radius: 15px;
    background-color: white;
    .title {
      margin-bottom: 20px;
      font-weight: bolder;
      .icon {
        color: black;
        font-weight: bold;
        margin-right: 5px;
      }
    }
    .text-field-container {
      margin-left: 20px;
      .text-field {
        border-color: gray;
        height: 50px !important;
        width: 280px;
      }
    }
  }
  .checkout-address-container {
    padding: 15px 10px 20px 15px;
    border-radius: 15px;
    background-color: white;
    .title {
      margin-bottom: 20px;
      font-weight: bolder;
      .icon {
        color: black;
        font-weight: bold;
        margin-right: 5px;
      }
    }
    .text-field-container {
      margin-left: 20px;
    }
  }
  .order-container {
    border-radius: 15px;
    padding: 15px 15px 20px 15px;
    background-color: white;
    .title {
      margin-bottom: 20px;
      font-weight: bolder;
      .icon {
        color: black;
        font-weight: bold;
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
      margin: 20px 0px 0px 10px;
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
  .infor {
    padding: 15px 15px 15px 15px;
    width: 350px;
    border-style: solid;
    border-width: 1px 1px 1px 1px;
    border-color: #007344;
    border-radius: 10px;
    color: #008952;
    background-color: #d8ffef;
  }
}
</style>
