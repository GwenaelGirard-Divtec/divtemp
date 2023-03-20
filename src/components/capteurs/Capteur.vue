<template>
  <q-card flat :bordered="!this.complete" :style="{maxWidth: this.maxWidth}" class="q-mx-auto">
    <q-card-section class="title row no-wrap justify-between items-center">
      <div class="title row items-center">
        <q-btn v-show="this.complete" class="q-mr-sm" to="/" style="width: 25px" flat icon="chevron_left" />
        <span class="capteur-nom text-h5 text-weight-regular" @click="this.$router.push(`/capteurs/${this.capteur.id}`)">{{ this.capteur.nom }}</span>
        <q-icon v-if="this.isThisCapteurFavourite" color="primary" name="star" size="sm" class="cursor-pointer q-mx-md" @click="setFavourite(false, this.capteur.id)"/>
        <q-icon v-else name="star_border" size="sm" color="primary" class="btn-fav-capteur q-mx-md" @click="setFavourite(true, this.capteur.id)"/>
      </div>
      <div class="row q-gutter-lg no-wrap" v-show="this.capteur.mesures">
        <!--
        <span v-if="!this.hideSalle && this.capteur.salle" class="text-subtitle1 text-grey-6">Salle : {{this.capteur.salle.nom}}</span>
        -->
        <span>Salle : B1&#8209;01</span>
        <span v-if="this.complete && this.capteur.mesures" class="text-subtitle1 text-grey-6">{{ this.capteur.mesures.length }} mesures</span>
      </div>
    </q-card-section>
    <q-separator v-if="this.capteur.mesures"/>
    <q-card-section v-if="this.capteur.mesures">
      <Mesure :mesures="this.capteur.mesures" :complete="complete"></Mesure>
    </q-card-section>
    <q-card-actions class="row justify-end" v-show="!this.complete">
      <q-btn flat label="voir plus" :to="'/capteurs/' + this.capteur.id"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import Mesure from 'components/mesures/Mesure.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Capteur',
  components: { Mesure },

  computed: {

    ...mapState('capteurs', ['favouriteCapteurs']),

    /**
     * Test si le capteur actuel fais partie des favoris
     * @returns {boolean} true s'il fait partie des favoris, sinon false
     */
    isThisCapteurFavourite () {
      return this.favouriteCapteurs.indexOf(this.capteur.id) !== -1
    }
  },

  methods: {
    ...mapActions('capteurs', ['ADD_CAPTEUR_TO_FAVORITES', 'REMOVE_CAPTEUR_FROM_FAVOURITES']),

    /**
     * Ajoute ou supprime un capteur en favoris
     * @param state true : ajoute, false : supprime
     * @param idCapteur id du capteur à mettre en favoris
     */
    setFavourite (state, idCapteur) {
      if (state) {
        this.ADD_CAPTEUR_TO_FAVORITES(idCapteur)
      } else {
        this.REMOVE_CAPTEUR_FROM_FAVOURITES(idCapteur)
      }
    }
  },

  props: {
    capteur: {
      type: Object,
      required: true
    },

    maxWidth: {
      type: String,
      require: false,
      default: '100%'
    },

    complete: {
      type: Boolean,
      required: false,
      default: false
    },

    hideSalle: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">

.capteur-nom {
  &:hover {
    cursor: pointer;
  }
}

.btn-fav-capteur {
  &:hover {
    cursor: pointer;
  }
}
</style>
