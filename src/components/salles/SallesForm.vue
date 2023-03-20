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
    ...mapActions('salles', ['CREATE_SALLE', 'MODIFY_SALLE']),

    /**
     * Envoie du formualire
     */
    submitForm () {
      // créer un tableau avec uniquement le nom des salles de la base de donnée
      const sallesArray = [...this.salles.map(({ id, ...item }) => item.nom)]

      // si le nom de la n'est pas déjà présent dans la base
      if (sallesArray.indexOf(this.salle.nom) === -1) {
        // si la salle a un id (MODIFICATION
        if (this.salle.id) {
          // envoie l'ordre au magasin de modifer la salle
          this.MODIFY_SALLE(this.salle).then(response => {
            // si la salle a bien été modifiée
            if (response.status === 200) {
              this.$emit('goToSalle', response.data.nom)
              this.closeForm()
            }
          })
        } else {
          // Si la salle n'as pas d'ID (CRÉATION) : envoie l'ordre au magasin de créer la salle
          this.CREATE_SALLE(this.salle).then(response => {
            // si la salle a bien été crée
            if (response.status === 200) {
              this.$emit('goToSalle', response.data.nom)
              this.closeForm()
            }
          })
        }
      } else {
        // Message d'erreur dans le cas ou le nom de la salle est déjà présent dans la base
        errorDialog('Le nom de la salle doit être unique !')
      }
    },

    /**
     * Fermeture du formulaire
     */
    closeForm () {
      this.$emit('closeForm')
    }
  },

  mounted () {
    // Si nous sommes en mofification
    if (this.salleToModify) {
      // clone la salle à modifier dans une nouvelle variable
      this.salle = Object.assign({}, this.salleToModify)
    }
  }
}
</script>

<style scoped>

</style>
