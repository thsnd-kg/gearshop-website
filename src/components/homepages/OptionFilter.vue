<template>
  <div class="menu-item">
    <div class="title-container" @click="isOpen = !isOpen">
      <span class="title">
        {{ title }}
      </span>
      <v-icon class="icon">{{ isOpen ? "mdi-minus" : "mdi-plus" }}</v-icon>
    </div>
    <transition name="slide-fade">
      <div class="sub-menu" v-if="isOpen">
        <v-row no-gutters>
          <v-col v-for="item in options" :key="item.id" class="shrink">
            <v-chip
              class="chip"
              :class="item.isSelected ? 'chipSelect' : ''"
              color="gray"
              label
              outlined
              @click="removeItem(item.id)"
            >
              {{ item.title}}
            </v-chip>
          </v-col>
        </v-row>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  components: {},
  name: "dropdown",
  props: ["title", "items"],
  data() {
    return {
      options: this.items,
      isOpen: false
    };
  },
  methods: {
    removeItem(itemId) {
      console.log(itemId)
      let newoption = this.options.map((obj) => {
        if (obj.id === itemId) obj.isSelected = !obj.isSelected;
        return obj;
      });
      this.options = newoption
      this.isOpen = true;
      console.log(newoption)
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  height: 35px;
  font-size: 16px !important;
  //   &:hover {
  //     cursor: pointer;
  //     color: #0aa1dd;
  //   }
}
.menu-item{
  padding: 0px 15px 7px 15px;
.title-container {
  padding-top: 7px;
  border-width: 1px 0px 0px 0px;
  border-color: #a0bcc2;
  border-style: solid;
  display: flex;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
    color: #0aa1dd;
  }
}
}
.icon {
  color: inherit !important;
}
.chipSelect {
  margin: 3px 3px 3px 3px;
  font-weight: 900 !important;
  font-size: 15px !important;
  cursor: pointer;
  color: black !important;
  border-color: #0aa1dd !important;
}
.chip {
  background-color: #fff;
  margin: 3px 3px 7px 3px;
  &:hover {
    cursor: pointer;
    color: #0aa1dd;
    border-color: #0aa1dd;
  }
}
nav .menu-item .sub-menu {
  position: absolute;
  background-color: #222;
  top: calc(100% + 18px);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 0px 0px 16px 16px;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>