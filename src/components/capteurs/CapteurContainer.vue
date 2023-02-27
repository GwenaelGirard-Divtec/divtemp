<template>
<div class="full-width q-mb-xl">
  <span class="text-h5 text-weight-medium" :id="title">{{title}}</span>
  <q-separator/>
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
