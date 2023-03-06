<template>
  <div class="salles-tab">
    <div v-if="this.capteurs">
      <q-splitter v-model="splitterModel" :limits="[15, 15]">
        <template v-slot:before>
          <q-tabs v-model="sallesTab" vertical class="text-black">
            <q-tab v-for="salle in salles" :key="salle" :name="salle.nom" :label="salle.nom"/>
          </q-tabs>
        </template>
        <template v-slot:after>
          <q-tab-panels v-model="sallesTab" swipeable vertical ref="salleTabPannel">
            <q-tab-panel v-for="salle in salles" :key="salle" :name="salle.nom">

              <div class="row justify-between items-center">
                <div class="row items-center q-gutter-sm">
                  <span class="text-h5 text-weight-medium">{{salle.nom}}</span>
                  <q-btn v-show="isAdmin" icon="edit" @click="modifySalle(salle.id)" color="grey-7" flat></q-btn>
                </div>
                <q-btn v-show="isAdmin" icon="delete" @click="confirmDeleteSalle(salle)" flat color="negative"></q-btn>
              </div>
              <q-separator class="q-my-sm"/>
                <div class="row q-col-gutter-lg" v-if="this.getCapteurOfSalle">
                  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4" v-for="capteur in this.getCapteurOfSalle" :key="capteur.id">
                    <capteur :capteur="capteur"/>
                  </div>
                </div>

                <notification v-else>Aucun capteurs</notification>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>

    <notification icon="upcoming" v-else>Aucune salle</notification>

    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-btn fab icon="add" @click="addSalle()" color="accent" />
    </q-page-sticky>

    <q-dialog
      v-model="formPlatState"
      persistent
    >
      <SallesForm
        @closeForm="changeFormPlatState(false)"
        @goToSalle="goToSalle"
        :salle-to-modify="salleToModify"
      />
    </q-dialog>

  </div>
</template>

<script>
import Capteur from 'components/capteurs/Capteur.vue'
import Notification from 'components/notification.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import { nextTick } from 'vue'
import { Dialog } from 'quasar'
import { errorDialog } from 'src/functions/erreurs'
import SallesForm from 'components/salles/SallesForm.vue'

export default {
  name: 'SallesTab',
  components: { SallesForm, Notification, Capteur },

  data () {
    return {
      splitterModel: 15,
      sallesTab: null,
      salleToModify: null,
      formPlatState: false
    }
  },

  computed: {
    ...mapGetters('capteurs', ['capteursBySalle']),
    ...mapGetters('auth', ['isAdmin']),
    ...mapState('capteurs', ['capteurs']),
    ...mapState('salles', ['salles']),

    getCapteurOfSalle () {
      const salle = this.capteursBySalle.filter((salle) => salle.nom === this.sallesTab)[0]
      return salle ? salle.capteurs : null
    }
  },

  methods: {

    ...mapActions('salles', ['deleteSalle', 'getAllSalles']),

    goToSalle (nom) {
      this.sallesTab = nom
    },

    modifySalle (id) {
      this.salleToModify = { ...this.salles.filter((salle) => salle.id === id)[0] }
      nextTick(() => {
        this.changeFormPlatState(true)
      })
    },

    addSalle () {
      this.salleToModify = null
      this.changeFormPlatState(true)
    },
    confirmDeleteSalle (salle) {
      if (this.getCapteurOfSalle) {
        errorDialog('Vous ne pouvez pas supprimer une salle qui contient un ou plusieurs capteurs !')
      } else {
        Dialog.create({
          title: 'Suppression de la salle',
          message: `Êtes-vous sûr de vouloir supprimer la salle "${salle.nom}" ?`,
          ok: 'Oui',
          cancel: 'Non',a
          persistent: true
        }).onOk(async () => {
          this.deleteSalle(salle.id)
          this.sallesTab = this.salles[0].nom
        })
      }
    },

    changeFormPlatState (state) {
      this.formPlatState = state
    }
  },

  mounted () {
    nextTick(() => {
      if (this.sallesTab === null) { this.sallesTab = this.salles[0].nom }
    })
  }
}
</script>

<style scoped>

</style>
