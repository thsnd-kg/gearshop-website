<template>
  <div class="item-variant-container d-flex flex-column">
    <div class="variant-name-label">{{ item.variantName }}</div>
    <div class="variant-price-label">{{ item.price.toLocaleString() }}</div>
    <div class="variant-attributes-label my-auto">
      <v-chip
        class="chip"
        label
        outlined
        v-for="tag in getTags"
        :key="tag.tagId"
      >
        {{ tag.tagName }}</v-chip
      >
    </div>
  </div>
</template>
<script>
export default {
  props: ['item'],
  computed: {
    getTags: function () {
      let lstTag = [];
      this.item.attributes.forEach((element) => {
        if (element.tagName !== null) lstTag.push(element);
      });
      return lstTag.slice(0, 4);
    },
  },
};
</script>
<style lang="scss" scoped>
.item-variant-container {
  margin-bottom: 10px;
  padding: 7px 0px 5px 5px;
  height: 100px;
  width: 370px;
  border-radius: 10px;
  border: 1px solid #ccc;
  &:hover {
    background-color: #d8d9db;
  }
  .variant-name-label {
    font-weight: bold;
  }
  .variant-price-label {
    font-weight: bold;
    color: #f43688;
  }
  .variant-attributes-label {
    .chip {
      font-size: 12px;
      height: 25px;
      margin-left: 4px;
      padding: 0 6px;
    }
  }
}
</style>
