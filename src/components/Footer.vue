<template>
  <div class="footer">
    <div class="wrapper">
      <div class="header"></div>
      <div class="content">
        <v-row>
          <v-col cols="4">
            <div>
              <v-img
                src="https://gearshop.vn/frontend/images/shop/logo-df.png"
                width="180px"
              ></v-img>
               <div class="infor"><strong>Hotline liên hệ:</strong> 1900 0009</div>
               <div class="infor"><strong>Công ty TNHH GearShop</strong></div>
               <div class="infor"><strong>Địa chỉ:</strong> Khu phố 6, Phường Linh Trung, Thành phố Thủ Đức</div>
            </div>
          </v-col>
          <v-col cols="6" offset-md="1">
            <v-row>
                <v-col cols="4">
                    <div class="title"><strong>Thông tin cần biết</strong></div>
                    <div class="desc">Bảo hành đổi trả</div>
                    <div class="desc">Hướng dẫn thanh toán</div>
                    <div class="desc">Thỏa thuận sử dụng</div>
                    <div class="desc">Thỏa thuận bảo mật</div>
                    <div class="desc">Quy chế hoạt động</div>
                </v-col>
                <v-col cols="4">
                    <div class="title"><strong>Hỗ trợ</strong></div>
                    <div class="desc">Giới thiệu</div>
                    <div class="desc">Thông tin liên hệ</div>
                    <div class="desc">Hỏi đáp</div>
                    <div class="desc">Tin công nghệ</div>
                </v-col>
                <v-col cols="4">
                    <div class="title"><strong>Danh mục</strong></div>
                    <div class="desc">Laptop</div>
                    <div class="desc">Màn hình</div>
                    <div class="desc">Chuột</div>
                    <div class="desc">Bàn phím</div>
                    <div class="desc">Ghế công thái học</div>
                </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <div class="foot"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.footer {
  background-color: rgba(236, 240, 244);
  height: 330px;
  .wrapper {
    height: 300px;
    border-radius: 5px;
    margin-top: 30px;
    background-color: white;
    .header {
      height: 60px;
      background-color: #00abc5;
    }
    .content {
      margin: 0px auto;
      width: 1300px;
      .infor{
         font-family: 'Be Vietnam Pro', sans-serif;
      }
      .title {
        margin-top: 10px;
        font-size: 15px !important;
      }
      .desc{
        margin-top: 10px;
        font-size: 13px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
       &:hover {
            cursor: pointer;
       }
     }
    }
  }
}
</style>
