<template>
  <q-page padding>
    <q-space class="q-mb-lg"/>
    <CapteurContainer v-for="salle in capteursBySalle" :key="salle" :title="salle.nom">
      <div class="row q-col-gutter-lg">
        <div  class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="capteur in salle.capteurs" :key="capteur.id">
          <capteur :capteur="capteur"/>
        </div>
      </div>
    </CapteurContainer>

  </q-page>
</template>

<script>
import Capteur from 'components/capteurs/Capteur.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import CapteurContainer from 'components/capteurs/CapteurContainer.vue'
export default {
  name: 'CapteursPage',
  components: {
    CapteurContainer,
    Capteur
  },

  data () {
    return {
      update: {
        interval: null,
        delay: 5000
      }
    }
  },

  computed: {
    ...mapState('capteurs', ['capteurs']),

    ...mapGetters('capteurs', ['capteursBySalle'])
  },

  methods: {
    ...mapActions('capteurs', ['getAllCapteurs']),

    scrollTo (anchor) {
      this.$nextTick(() => window.document.getElementById(anchor).scrollIntoView())
    }
  },

  mounted () {
    this.getAllCapteurs()

    this.update.interval = setInterval(() => {
      this.getAllCapteurs()
    }, this.update.delay)
  },

  unmounted () {
    clearInterval(this.update.interval)
  }
}
</script>
