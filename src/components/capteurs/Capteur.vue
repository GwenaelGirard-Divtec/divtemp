<template>
  <q-card>
    <q-card-section class="row justify-between items-center">
      <span class="text-h5 text-weight-regular">{{ this.capteur.nom }}</span>
      <span class="text-subtitle1 text-grey-6">Salle: {{ this.capteur.salle.nom }}</span>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <Mesure :mesures="this.capteur.mesures"></Mesure>
    </q-card-section>
    <q-separator/>
    <q-card-actions class="row justify-end">
      <q-btn flat label="voir plus" :to="'/capteurs/' + this.capteur.id"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import Mesure from 'components/mesures/Mesure.vue'

export default {
  name: 'Capteur',
  components: { Mesure },
  props: {
    capteur: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
