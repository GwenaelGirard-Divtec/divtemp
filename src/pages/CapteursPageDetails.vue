<template>
<q-page padding v-if="actualCapteur && Object.entries(actualCapteur).length > 0">
  <div class="capteur-wrapper">
    <Capteur :complete="true" :capteur="actualCapteur"/>
  </div>
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

<style scoped lang="scss">
.capteur-wrapper {
  margin-inline: 20%;

  @media screen and (max-width: 800px) {
    margin-inline: 10%;
  }

  @media screen and (max-width: 600px) {
    margin-inline: 0;
  }
}
</style>
