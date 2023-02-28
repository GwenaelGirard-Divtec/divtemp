<template>
  <q-page padding>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="capteurs" label="Capteurs" />
      <q-tab name="salles" label="Salles" />
      <q-tab name="favourites" label="Capteurs favoris" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" class="full-height">
      <q-tab-panel name="capteurs">
        <div class="row q-col-gutter-lg" v-if="this.capteurs">
          <div  class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="capteur in this.capteurs" :key="capteur.id">
            <capteur :capteur="capteur"/>
          </div>
        </div>

        <notification icon="upcoming" v-else>Aucun capteurs</notification>
      </q-tab-panel>

      <q-tab-panel name="salles">
        <div v-if="this.capteurs">
          <q-splitter v-model="splitterModel">
            <template v-slot:before>
              <q-tabs v-model="salles" vertical class="text-black">
                <q-tab v-for="salle in capteursBySalle" :key="salle" :name="salle.nom" :label="salle.nom" />
              </q-tabs>
            </template>
            <template v-slot:after>
              <q-tab-panels v-model="salles" swipeable vertical>
                <q-tab-panel v-for="salle in capteursBySalle" :key="salle" :name="salle.nom">
                    <div class="row q-pa-md q-col-gutter-lg">
                      <div  class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="capteur in salle.capteurs" :key="capteur.id">
                        <capteur :capteur="capteur" hide-salle/>
                      </div>
                    </div>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </div>

        <notification icon="upcoming" v-else>Aucune salle</notification>
      </q-tab-panel>

      <q-tab-panel name="favourites">
        <CapteurContainer title="" v-if="this.favouriteCapteurs.length > 0">
          <div class="row q-col-gutter-lg">
            <div  class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="capteur in this.favouriteCapteurs" :key="capteur.id">
              <capteur :capteur="capteur"/>
            </div>
          </div>
        </CapteurContainer>

        <notification icon="upcoming" v-else>Aucun capteurs favoris</notification>

      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import Capteur from 'components/capteurs/Capteur.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import CapteurContainer from 'components/capteurs/CapteurContainer.vue'
import Notification from 'components/notification.vue'
export default {
  name: 'CapteursPage',
  components: {
    Notification,
    CapteurContainer,
    Capteur
  },

  data () {
    return {
      update: {
        interval: null,
        delay: 5000
      },

      tab: 'capteurs',

      salles: this.capteursBySalle ? this.capteursBySalle : null,

      splitterModel: 10
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
