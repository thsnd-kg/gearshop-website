<template>
  <div class="wrapper">
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col cols="12">
            <div class="checkout-container">
              <div class="title">
                <v-icon class="icon"> mdi-phone-outline </v-icon>
                Thông tin liên hệ
              </div>
              <v-row class="text-field-container">
                <v-col>
                  <v-text-field
                    class="text-field"
                    label="Họ tên"
                    outlined
                    clearable
                    dense
                    height="48px"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    class="text-field"
                    label="Số điện thoại"
                    outlined
                    clearable
                    dense
                    height="48px"
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
                      <v-text-field
                        class="text-field"
                        label="Tỉnh/ Thành phố"
                        outlined
                        clearable
                        dense
                        height="55px"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        class="text-field"
                        label="Quận/ Huyện"
                        outlined
                        clearable
                        dense
                        height="55px"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        class="text-field"
                        label="Phường/ Xã"
                        outlined
                        clearable
                        dense
                        height="55px"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        class="text-field"
                        label="Địa chỉ cụ thể"
                        outlined
                        clearable
                        dense
                        height="55px"
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
                  <div>Tạm tính:</div>
                  <div>0</div>
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
              <div class="checkout-btn">
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
export default {};
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
