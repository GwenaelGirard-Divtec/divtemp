<template>
  <q-page padding>
    <div class="favoris q-mb-xl">
      <div class="row justify-between items-center">
        <div class="row items-center q-gutter-sm">
          <span class="text-h5 text-weight-medium">Favoris</span>
        </div>
      </div>
      <q-separator class="q-my-sm"/>
      <div class="row q-col-gutter-lg" v-if="this.favouriteCapteurs.length > 0">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="capteur in this.favouriteCapteurs"
             :key="capteur.id">
          <capteur :capteur="capteur"/>
        </div>
      </div>
      <notification dense v-else icon="upcoming">Aucun capteur favoris</notification>
    </div>

    <div class="capteurs">
      <div class="row justify-between items-center">
        <div class="row items-center q-gutter-sm">
          <span class="text-h5 text-weight-medium">Tous les capteurs</span>
        </div>

        <div class="search">

        </div>
      </div>
      <q-separator class="q-my-sm"/>
      <div class="row q-col-gutter-lg" v-if="this.capteurs">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="capteur in this.capteurs" :key="capteur.id">
          <capteur :capteur="capteur"/>
        </div>
      </div>

      <notification icon="upcoming" v-else>Aucun capteurs</notification>
    </div>
  </q-page>
</template>

<script>
import Notification from 'components/notification.vue'
import Capteur from 'components/capteurs/Capteur.vue'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'CapteursPage',
  components: { Capteur, Notification },

  computed: {
    ...mapState('capteurs', ['capteurs']),
    ...mapGetters('capteurs', ['favouriteCapteurs'])
  }
}
</script>

<style scoped>

</style>
