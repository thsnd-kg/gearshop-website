<template>
  <div class="wrapper" @click="onClick">
    <v-row>
      <v-col cols="12">
        <v-img
          class="image-display"
          max-height="250"
          max-width="300"
          aspect-ratio="1.8"
          contain
          :src="item.imgUrl"
        >
        </v-img>
      </v-col>
      <v-col cols="12">
        <div class="name-label">
          {{ item.productName }}
        </div>
        <div class="wrapper-price-variant">
          <div class="price-label">
            {{ item.variants[0].price.toLocaleString() }}
          </div>
          <div class="variant-label">
            {{ `${item.variants.length} phiên bản` }}
          </div>
        </div>
        <div class="attributes-label">
          <v-chip 
          class="chip" 
          label 
          outlined
          v-for="tag in getTags" 
            :key="tag.tagId"
          > 
           {{`${tag.attributeName} ${tag.tagName}`}}
          </v-chip>
        </div>
        <div class="footer"></div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    onClick() {
      let routeData = this.$router.resolve({
        name: "Product Detail",
        params: { link: this.item.productLink }
      });
      window.open(routeData.href, "_blank");
    }
  }, computed: {
        getTags: function() {
           
            let lstTag = [];
            this.item.variants[0].attributes.forEach(element => {
                if(element.tagName !== null)
                lstTag.push(element);
            });
            return lstTag.slice(0,4);
        }
    },
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
  margin-left: 0px !important;
  background: white;
  border-radius: 20px;
  width: 400px !important;
  height: 360px !important;
  &:hover {
    cursor: pointer;
  }
  .image-display {
    margin: 0 auto;
  }
  .name-label {
    margin-top: -10px;
    margin-left: 20px;
    font-weight: bold;
  }
  .wrapper-price-variant {
    display: flex;
    justify-content: start;
    margin: 5px 0px 5px 0px;
    .price-label {
      margin-left: 20px;
      font-weight: bold;
      color: #f43688;
      font-size: 16px;
    }
    .variant-label {
      font-size: 13px;
      font-weight: bold;
      color: grey;
      padding-left: 15px;
      margin-top: 4px;
    }
  }
  .attributes-label {
    padding: 5px 0px 10px 0px;
    margin-left: 20px;
    margin-right: 20px;

    .chip {
      font-weight: 700;
      height: 22px;
      margin: 3px 4px 2px 2px;
      font-size: 13px;
    }
  }
  .footer {
    width: 360px;
    margin: 0px 20px 0px 15px;
    border-width: 1.9px 0px 0px 0px;
    border-style: solid;
    border-color: #bcbcbc;
    position: absolute;
    bottom: 20px;
    right: 0;
  }
}
</style>
