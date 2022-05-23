<template>
  <v-snackbar
    v-model="show"
    :timeout="4000"
    :color="snackbar.color"
    :multi-line="true"
    class="mr-2"
    right
    top
  >
    <div class="d-flex align-center">
      <v-icon
        large
        class="ml-n2 mr-3"
      >
        {{
          snackbar.color === 'success' ? 'mdi-check-circle-outline'
          :snackbar.color === 'orange' ? 'mdi-alert-outline'
            :snackbar.color === 'red' ? 'mdi-alert-circle-outline' : ''
        }}
      </v-icon>
      <p class="notification-message">
        {{ snackbar.text }}
      </p>
      <v-btn
        fab
        plain
        small
        class="btn-close"
        @click.native="show = false"
      >
        <v-icon
          small
        >
          mdi-close
        </v-icon>
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState('notice', [ 'snackbar' ]),
    show: {
      get() {
        return this.snackbar.show;
      },
      set() {
        this.resetMsg();
      }
    }
  },
  methods: {
    ...mapActions('notice', [ 'resetMsg' ])
  }
};
</script>

<style lang="scss" scoped>
.notification-message {
  margin: 0px 20px 0px 0px;
  white-space: pre;
  white-space: -moz-pre-wrap;
}
.btn-close{
  position: absolute;
  float: right;
  right: -20px;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>