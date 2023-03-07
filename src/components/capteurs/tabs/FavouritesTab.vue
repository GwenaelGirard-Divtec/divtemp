<template>
<div class="favourites-tab">
  <div class="row q-col-gutter-lg" v-if="this.favouriteCapteurs.length > 0">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="capteur in this.favouriteCapteurs"
           :key="capteur.id">
        <capteur :capteur="capteur"/>
      </div>
  </div>

  <notification icon="upcoming" v-else>Aucun capteurs favoris</notification>
</div>
</template>

<script>
import Capteur from 'components/capteurs/Capteur.vue'
import Notification from 'components/notification.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'FavouritesTab',
  components: { Notification, Capteur },

  computed: {
    ...mapGetters('capteurs', ['favouriteCapteurs'])
  }
}
</script>

<style scoped>

</style>
