<template>
  <q-card>
    <q-card-section class="title row justify-between items-center">
      <div class="title row items-center">
        <q-btn v-show="this.complete" class="q-mr-sm" to="/" style="width: 25px" flat icon="chevron_left" />
        <span class="text-h5 text-weight-regular">{{ this.capteur.nom }}</span>
        <q-icon v-if="this.isThisCapteurFavourite" color="primary" name="star" size="sm" class="btn-fav-capteur q-mx-md" @click="setFavourite(false, this.capteur.id)"/>
        <q-icon v-else name="star_border" size="sm" color="primary" class="btn-fav-capteur q-mx-md" @click="setFavourite(true, this.capteur.id)"/>
      </div>
      <span class="text-subtitle1 text-grey-6">Salle: {{ this.capteur.salle.nom }}</span>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <Mesure :mesures="this.capteur.mesures" :complete="complete"></Mesure>
    </q-card-section>
    <q-separator/>
    <q-card-actions class="row justify-end" v-show="!this.complete">
      <q-btn flat label="voir plus" :to="'/capteurs/' + this.capteur.id"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import Mesure from 'components/mesures/Mesure.vue'
import { mapActions, mapState } from 'vuex'
import { toRaw } from 'vue'

export default {
  name: 'Capteur',
  components: { Mesure },

  computed: {

    ...mapState('capteurs', ['favouriteCapteurs']),

    isThisCapteurFavourite () {
      return this.favouriteCapteurs.indexOf(this.capteur.id) !== -1
    }
  },

  methods: {
    ...mapActions('capteurs', ['addCapteurToFavorite', 'removeCapteurFromFavorite']),

    setFavourite (state, idCapteur) {
      if (state) {
        this.addCapteurToFavorite(idCapteur)
      } else {
        this.removeCapteurFromFavorite(idCapteur)
      }

      console.log(toRaw(this.$store.state.capteurs.favouriteCapteurs))
    }
  },

  props: {
    capteur: {
      type: Object,
      required: true
    },

    complete: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.btn-fav-capteur {
  &:hover {
    cursor: pointer;
  }
}
</style>
