<template>
<q-page padding>
  {{this.$route.params.id}}
</q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CapteursDetails',

  methods: {
    ...mapActions('capteurs', ['getMesuresOfCapteurs'])
  },

  mounted () {
    this.getMesuresOfCapteurs()
  }
}
</script>

<style scoped>

</style>
