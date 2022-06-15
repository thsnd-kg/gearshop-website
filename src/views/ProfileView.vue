<template>
  <div class="background">
    <div class="wrapper pt-10">
      <v-row>
        <v-col cols="3" offset="1">
          <div class="d-flex mb-4">
            <v-hover>
              <template v-slot:default="{ hover }">
                <div>
                  <v-avatar size="64">
                    <img
                      alt="Avatar"
                      :src="
                        profile.imgUrl
                          ? profile.imgUrl
                          : require('@/assets/default-user.png')
                      "
                    />
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute>
                        <v-btn
                          :loading="isSelecting"
                          depressed
                          class="avatar__upload"
                          icon
                          @click="onButtonClick"
                        >
                          <v-icon color="black" size="32">mdi-camera</v-icon>
                        </v-btn>
                        <input
                          ref="uploader"
                          class="d-none"
                          type="file"
                          accept="image/*"
                          @change="onFileChanged"
                        />
                      </v-overlay>
                    </v-fade-transition>
                  </v-avatar>
                </div>
              </template>
            </v-hover>

            <div class="flex-grow-1 ml-3 my-auto">
              <div
                class="
                  text-h6
                  font-weight-medium
                  blue-grey--text
                  text--darken-3
                "
              >
                {{ profile.firstName ? profile.firstName : sliceEmail }}
              </div>

              <div
                class="
                  blue--text
                  text--lighten-1 text-caption
                  font-weight-medium
                "
              >
                {{
                  profile.phoneNo
                    ? profile.phoneNo
                    : 'Chưa cập nhật số điện thoại'
                }}
              </div>
            </div>
          </div>
          <v-divider class="my-3"></v-divider>

          <v-btn
            height="52"
            class="btn"
            large
            depressed
            block
            @click="redirectPage(page.info)"
            :outlined="tabInfo"
            :color="tabInfo ? `primary` : `rgba(248, 250, 252)`"
          >
            <v-icon color="#6ad9e2" left size="28">
              mdi-account-circle-outline
            </v-icon>

            <div
              class="
                ml-1
                blue-grey--text
                text--darken-1 text-subtile-1
                font-weight-bold
              "
            >
              Thông tin tài khoản
            </div>
            <v-spacer></v-spacer>
            <v-icon right size="24"> mdi-chevron-right</v-icon>
          </v-btn>

          <v-btn
            class="btn mt-1"
            height="52"
            large
            depressed
            block
            @click="redirectPage(page.address)"
            :outlined="tabAddress"
            :color="tabAddress ? `primary` : `rgba(248, 250, 252)`"
          >
            <v-icon color="blue-grey" left size="28">mdi-key-outline </v-icon>
            <div
              class="
                ml-1
                blue-grey--text
                text--darken-1 text-subtile-1
                font-weight-bold
              "
            >
              Đổi mật khẩu
            </div>
            <v-spacer></v-spacer>
            <v-icon right size="24"> mdi-chevron-right</v-icon>
          </v-btn>

          <v-btn
            class="btn mt-1"
            height="52"
            large
            depressed
            block
            @click="redirectPage(page.order)"
            :outlined="tabOrder"
            :color="tabOrder ? `primary` : `rgba(248, 250, 252)`"
          >
            <v-icon color="blue darken-1 " left size="28">
              mdi-cart-outline
            </v-icon>

            <div
              class="
                ml-1
                blue-grey--text
                text--darken-1 text-subtile-1
                font-weight-bold
              "
            >
              Lịch sử mua hàng
            </div>
            <v-spacer></v-spacer>
            <v-icon right size="24"> mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="8">
          <v-card class="rounded-lg pa-6 pb-10" v-show="tabInfo">
            <div class="text-h5 mb-6 font-weight-medium">
              Thông tin tài khoản
            </div>
            <div class="text-h6 mb-6 font-weight-bold">Thông tin</div>
            <v-row>
              <v-col class="py-0" cols="6" dense>
                <div
                  class="text-caption font-weight-bold blue-grey--text darken-2"
                >
                  Họ và tên
                </div>
                <v-text-field
                  v-model="user.firstName"
                  height="48"
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col class="py-0" cols="6">
                <div
                  class="text-caption font-weight-bold blue-grey--text darken-2"
                >
                  Số điện thoại
                </div>
                <v-text-field
                  v-model="user.phoneNo"
                  height="48"
                  outlined
                  dense
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="6">
                <div
                  class="text-caption font-weight-bold blue-grey--text darken-2"
                >
                  Email
                </div>
                <v-text-field
                  disabled
                  height="48"
                  outlined
                  dense
                  v-model="user.email"
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="6">
                <div
                  class="text-caption font-weight-bold blue-grey--text darken-2"
                >
                  Ngày sinh
                </div>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  transition="scale-transition"
                  :close-on-content-click="false"
                  min-width="auto"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="formatDate(user.dateOfBirth)"
                      readonly
                      outlined
                      height="48"
                      dense
                      append-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker v-model="user.dateOfBirth" no-title scrollable>
                    <v-spacer />
                    <v-btn text color="primary" @click="menu = false">
                      Huỷ
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(user.dateOfBirth)"
                    >
                      Lưu
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <div class="text-h6 mb-6 font-weight-bold">Địa chỉ</div>
            <v-row>
              <v-col class="py-0" cols="6" dense>
                <div
                  class="text-caption font-weight-bold blue-grey--text darken-2"
                >
                  Tỉnh / Thành phố
                </div>
                <v-select
                  ref="provinceRef"
                  :items="provincesAPI"
                  v-model="currentProvince"
                  :item-text="'name'"
                  return-object
                  :value="currentProvince"
                  height="48"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col class="py-0" cols="6" dense>
                <div
                  class="text-caption font-weight-bold blue-grey--text darken-2"
                >
                  Quận / Huyện
                </div>
                <v-select
                  :items="districtsAPI"
                  v-model="currentDistrict"
                  :item-text="'name'"
                  return-object
                  height="48"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col class="py-0" cols="6" dense>
                <div
                  class="text-caption font-weight-bold blue-grey--text darken-2"
                >
                  Phường / Xã
                </div>
                <v-select
                  :items="wardsAPI"
                  v-model="currentWard"
                  :item-text="'name'"
                  return-object
                  height="48"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col class="py-0" cols="6" dense>
                <div
                  class="text-caption font-weight-bold blue-grey--text darken-2"
                >
                  Địa chỉ nhận hàng
                </div>
                <v-text-field
                  v-model="currentStreet"
                  height="48"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="6">
                <v-btn
                  :loading="isLoading"
                  block
                  depressed
                  height="48"
                  class="rounded-lg"
                  color="rgba(254, 52, 100)"
                  @click="updateProfile"
                >
                  <div class="text-body-1 font-weight-bold white--text">
                    Lưu thay đổi
                  </div>
                </v-btn>
              </v-col>
            </v-row>
            <!-- Change Pass -->
          </v-card>

          <v-card v-show="tabAddress" class="rounded-lg pa-6 pb-10">
            <div class="text-h5 mb-6 font-weight-medium">Đổi mật khẩu</div>

            <v-row>
              <v-col class="py-0" cols="6" dense>
                <div
                  class="text-caption font-weight-bold blue-grey--text darken-2"
                >
                  Mật khẩu hiện tại
                </div>
                <v-text-field
                  height="48"
                  outlined
                  v-model="oldPassword"
                  dense
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                  :type="showPass ? 'text' : 'password'"
                  :rules="passwordRules"
                >
                </v-text-field>
              </v-col>
              <v-col class="py-0" cols="6">
                <div
                  class="text-caption font-weight-bold blue-grey--text darken-2"
                >
                  Mật khẩu mới
                </div>
                <v-text-field
                  height="48"
                  v-model="newPassword"
                  outlined
                  dense
                  :append-icon="showNewPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showNewPass = !showNewPass"
                  :type="showNewPass ? 'text' : 'password'"
                  :rules="passwordRules"
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="6">
                <v-btn
                  block
                  depressed
                  height="48"
                  class="rounded-lg"
                  color="rgba(254, 52, 100)"
                  :loading="isLoading"
                  @click="changePassword"
                >
                  <div class="text-body-1 font-weight-bold white--text">
                    Lưu thay đổi
                  </div>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
          <v-card v-show="tabOrder" class="rounded-lg pa-6 pb-10">
            <div class="text-h5 mb-6 font-weight-medium">Lịch sử mua hàng</div>
            <!-- <OrderTable></OrderTable> -->
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import OrderTable from '../components/profile/OrderTable.vue';
import axios from 'axios';
export default {
  name: 'ProfileView',
  components: {
    // OrderTable,
  },

  data() {
    return {
      page: {
        info: 'thong-tin-tai-khoan',
        address: 'doi-mat-khau',
        order: 'lich-su-mua-hang',
      },
      isLoading: false,
      isSelecting: false,
      usrAva: '',
      radioGroup: '',
      url: '',
      user: '',
      tabInfo: false,
      tabAddress: false,
      tabOrder: false,
      tabs: null,
      menu: false,
      showNewPass: false,
      showPass: false,
      passwordRules: [
        (value) => !!value || 'Mật khẩu không được để trống.',
        (value) =>
          (value && value.length >= 6) || 'Mật khẩu phải có ít nhất 6 ký tự',
      ],

      oldPassword: null,
      newPassword: null,

      provincesAPI: null,
      districtsAPI: null,
      wardsAPI: null,
      currentProvince: null,
      currentDistrict: null,
      currentWard: null,
      currentStreet: null,
    };
  },

  async created() {
    this.url = this.$route.params.url;
    this.user = { ...this.profile };
    await this.getProfile();
    await this.getProvince();
    await this.parseAddress(this.user.address);
  },

  beforeMount() {},

  watch: {
    $route(value) {
      this.url = value.params.url;
    },

    url(value) {
      this.tabInfo = false;
      this.tabAddress = false;
      this.tabOrder = false;
      switch (value) {
        case this.page.info:
          this.tabInfo = true;
          break;
        case this.page.address:
          this.tabAddress = true;
          break;
        case this.page.order:
          this.tabOrder = true;
          break;
        default:
          break;
      }
    },

    currentProvince(newCurrentProvince) {
      this.districtsAPI = newCurrentProvince.districts;
    },
    currentDistrict(newCurrentDistrict) {
      this.wardsAPI = newCurrentDistrict.wards;
    },
  },

  computed: {
    ...mapGetters('auth', ['profile']),

    // computedDateFormatted() {
    //   return this.formatDate(this.date);
    // },

    sliceEmail() {
      return this.profile.email.slice(0, this.profile.email.indexOf('@'));
    },
  },

  methods: {
    ...mapActions('auth', ['getProfile']),

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    },

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

      // const district = address.substr(
      //   address.indexOf('District'),
      //   address.indexOf('|')
      // );

      // this.currentProvince = province;
      // console.log(province);
      // console.log(array);
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

    async redirectPage(url) {
      this.$router.push(url);
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

    async changePassword() {
      try {
        this.isLoading = true;
        const response = await this.$http.post('profile/me/change-password', {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.newPassword,
        });

        const { status } = response;

        if (status === 200)
          this.$notify.success('Thay đổi mật khẩu thành công');
        else if (status === 500) {
          this.$notify.error('Mật khẩu cũ không chính xác');
        } else this.$notify.error('Hệ thống đang xảy ra sự cố');
      } catch (error) {
        console.log(error);
        this.$notify.error('Hệ thống đang xảy ra sự cố');
      } finally {
        this.isLoading = false;
      }
    },

    async updateProfile() {
      const address = this.getFormatAddress();
      try {
        this.isLoading = true;
        const repsonse = await this.$http.put('profile/me', {
          firstName: this.user.firstName,
          dateOfBirth: this.user.dateOfBirth,
          phoneNo: this.user.phoneNo,
          address: address,
          username: this.user.username,
        });

        if (repsonse.status === 200) {
          this.$notify.success('Cập nhật thông tin thành công');
          await this.getProfile();
        } else {
          this.$notify.error('Hệ thống xảy ra sự cố');
        }
      } catch (error) {
        this.$notify.error('Hệ thống xảy ra sự cố');
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    async uploadAva(files) {
      this.isSelecting = true;
      const form = new FormData();
      files.forEach((file) => form.append('file', file));

      const { data } = await this.$http.upload('images/upload/avatar', form);
      this.isSelecting = false;
      return data[0];
    },

    onButtonClick() {
      this.$refs.uploader.click();
    },

    async onFileChanged(e) {
      this.usrAva = e.target.files[0];
      this.profile.imageUrl = URL.createObjectURL(e.target.files[0]);

      await this.uploadAva([this.usrAva]);
    },
  },
};
</script>

<style lang ="scss" scoped>
.btn {
  margin-bottom: 12px;
  border-radius: 12px;
  text-transform: unset !important;
}

.wrapper {
  padding: 0 10%;
  background-color: rgba(248, 250, 252);
  height: 100vh;
}
</style>