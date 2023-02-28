<template>
<q-page padding v-if="actualCapteur && Object.entries(actualCapteur).length > 0">
  <Capteur max-width="calc(100% - 400px)" :complete="true" :capteur="actualCapteur"/>
</q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Capteur from 'components/capteurs/Capteur.vue'

export default {
  name: 'CapteursDetails',
  components: { Capteur },

  data () {
    return {
      update: {
        interval: null,
        delay: 5000
      }
    }
  },

  computed: {
    ...mapState('capteurs', ['actualCapteur'])
  },

  methods: {
    ...mapActions('capteurs', ['getActualCapteur', 'clearActualCapteur'])
  },

  beforeMount () {
    this.getActualCapteur(this.$route.params.id)
  },

  mounted () {
    this.update.interval = setInterval(() => {
      this.getActualCapteur(this.$route.params.id)
    }, this.update.delay)
  },
  unmounted () {
    clearInterval(this.update.interval)
    this.clearActualCapteur()
  }
}
</script>

<style scoped>

</style>
