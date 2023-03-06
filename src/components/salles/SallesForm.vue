<template>
  <q-card>
    <q-card-section class="row justify-between items-center" style="min-width: 300px">
      <span class="text-h6 text-weight-medium">{{ this.salleToModify ? 'Modification' : 'Création' }} d'une salle</span>

      <q-btn icon="close" flat dense @click="closeForm" />
    </q-card-section>

    <q-separator/>

    <q-card-section>
      <q-form
        @submit="submitForm"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="this.salle.nom"
          label="Nom de la salle"
          autofocus
          clearable
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Le nom est obligatoire']"
        />

        <div class="column">
          <q-btn :label="this.salleToModify ? 'Modifier' : 'Créer'" type="submit" color="primary"/>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { errorDialog } from 'src/functions/erreurs'

export default {
  name: 'SallesForm',

  props: {
    salleToModify: {
      type: [Object, null],
      required: false
    }
  },

  data () {
    return {
      salle: {
        nom: ''
      }
    }
  },

  computed: {
    ...mapState('salles', ['salles'])
  },

  methods: {

    ...mapActions('salles', ['createSalle', 'modifySalle']),

    submitForm () {
      const sallesArray = [...this.salles.map(({ id, ...item }) => item.nom)]

      if (sallesArray.indexOf(this.salle.nom) === -1) {
        if (this.salle.id) {
          this.modifySalle(this.salle).then(response => {
            if (response.status === 200) {
              this.$emit('goToSalle', response.data.nom)
              this.closeForm()
            }
          })
        } else {
          this.createSalle(this.salle).then(response => {
            if (response.status === 200) {
              this.$emit('goToSalle', response.data.nom)
              this.closeForm()
            }
          })
        }
      } else {
        errorDialog('Le nom de la salle doit être unique !')
      }
    },

    closeForm () {
      this.$emit('closeForm')
    }
  },

  mounted () {
    if (this.salleToModify) {
      this.salle = Object.assign({}, this.salleToModify)
    }
  }
}
</script>

<style scoped>

</style>
