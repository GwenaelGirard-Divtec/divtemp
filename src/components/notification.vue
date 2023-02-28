<template>
  <div class="column items-center justify-center text-grey-6 q-gutter-sm" style="height: 200px">
    <q-icon v-show="this.icon && !this.spinner" :name="this.icon" size="xl"></q-icon>
    <q-spinner-dots v-show="this.spinner" size="lg" />
    <span class="text-h5 text-grey-6"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'notification',

  props: {
    icon: {
      type: String,
      required: false
    },

    spinner: {
      type: Boolean,
      required: false,
      default: false
    },

    height: {
      type: String,
      required: false,
      default: '200px'
    }
  }
}
</script>

<style scoped>

</style>
