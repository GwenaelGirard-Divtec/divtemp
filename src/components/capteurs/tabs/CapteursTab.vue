<template>
  <div class="capteurs-tab">
    <div class="row q-col-gutter-lg" v-if="this.capteurs">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="capteur in this.capteurs" :key="capteur.id">
        <capteur :capteur="capteur"/>
      </div>
    </div>

    <notification icon="upcoming" v-else>Aucun capteurs</notification>
  </div>
</template>

<script>
import Notification from 'components/notification.vue'
import Capteur from 'components/capteurs/Capteur.vue'
import { mapState } from 'vuex'

export default {
  name: 'CapteursTab',
  components: { Capteur, Notification },

  computed: {
    ...mapState('capteurs', ['capteurs'])
  }
}
</script>

<style scoped>

</style>
