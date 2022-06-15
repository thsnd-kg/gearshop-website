<template>
  <div class="category-list">
    <div class="d-flex pa-1 justify-center">
      <v-slide-group
        style="width: 75%"
        class="category-slide"
        ref="category_slide"
      >
        <v-slide-item v-for="category in categories" :key="category.categoryId">
          <v-btn
            height="50"
            color="white"
            depressed
            class="font-weight-medium mx-1"
            @click="pushPage(category.categoryLink)"
          >
            <v-img class="mr-1" max-width="40" :src="category.imgUrl"></v-img>
            {{ category.categoryName }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>

      <div class="d-flex align-center ml-3">
        <v-btn
          :disabled="!hasPrev"
          class="mx-1"
          fab
          depressed
          small
          @click="clickPrev"
        >
          <v-icon dark> mdi-chevron-left </v-icon>
        </v-btn>
        <v-btn
          :disabled="!hasNext"
          class="mx-1"
          fab
          depressed
          small
          @click="clickNext"
        >
          <v-icon dark> mdi-chevron-right </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: [],
    slideGroupPrev: '',
    slideGroupNext: '',
    slideGroup: '',
    hasNext: true,
    hasPrev: false,
    count: 0,
  }),

  mounted() {
    this.slideGroup = this.$refs.category_slide;
    this.slideGroupPrev = this.$refs.category_slide.$el.querySelector(
      '.v-slide-group__prev'
    );
    this.slideGroupNext = this.$refs.category_slide.$el.querySelector(
      '.v-slide-group__next'
    );
  },

  created() {
    this.getCategories();
  },

  watch: {
    count() {
      this.hasPrev = this.slideGroup.hasPrev;
      this.hasNext = this.slideGroup.hasNext;
    },
  },

  methods: {
    async getCategories() {
      try {
        const response = await this.$http.get('/categories', {
          onlyActive: true,
        });
        this.categories = response.content;
      } catch (error) {
        console.log(error);
      }
    },

    clickPrev() {
      this.slideGroupPrev.click();
      this.count++;
    },

    clickNext() {
      this.slideGroupNext.click();
      this.count++;
    },
    pushPage(link) {
      this.$router.push({ path: `/${link}`, query: { p: 1 } });
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  &-list {
    background-color: white;
    width: 100%;
    box-shadow: none;
  }
  &-slide::v-deep .v-slide-group {
    &__prev {
      display: none;
    }
    &__next {
      display: none;
    }
  }
}
</style>