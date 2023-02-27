<template>
<div class="full-width q-mb-xl">
  <span v-show="this.title !== ''" class="text-h5 text-weight-medium" :id="title">{{title}}</span>
  <q-separator v-show="this.title !== ''" />
  <div class="q-pt-sm">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'CapteurContainer',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
