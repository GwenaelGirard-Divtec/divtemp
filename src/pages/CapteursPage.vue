<template>
  <q-page padding>

    <q-space class="q-mb-lg"/>

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="all" label="Tous les capteurs" />
      <q-tab name="favourites" label="Capteurs favoris" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated transition-prev="fade" transition-next="fade">
      <q-tab-panel name="all">
        <CapteurContainer v-for="salle in capteursBySalle" :key="salle" :title="salle.nom">
          <div class="row q-col-gutter-lg">
            <div  class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="capteur in salle.capteurs" :key="capteur.id">
              <capteur :capteur="capteur"/>
            </div>
          </div>
        </CapteurContainer>
      </q-tab-panel>

      <q-tab-panel name="favourites">

        <div v-if="this.favouriteCapteurs.length === 0">
          <span class="flex flex-center text-h5 text-grey-6">Aucun capteurs favoris</span>
        </div>

        <CapteurContainer title="" v-else>
          <div class="row q-col-gutter-lg">
            <div  class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="capteur in this.favouriteCapteurs" :key="capteur.id">
              <capteur :capteur="capteur"/>
            </div>
          </div>
        </CapteurContainer>
      </q-tab-panel>
    </q-tab-panels>

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
      },

      tab: 'all'
    }
  },

  computed: {
    ...mapState('capteurs', ['capteurs']),

    ...mapGetters('capteurs', ['capteursBySalle']),

    ...mapGetters('capteurs', ['favouriteCapteurs'])
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

<style scoped lang="scss">
.q-tab-panel {
  overflow: hidden;
}

</style>
