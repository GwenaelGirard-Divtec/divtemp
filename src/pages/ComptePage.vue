<template>
  <q-page padding >

    <div class="page-title">
      <span class="text-h4">Votre compte</span>
    </div>

    <q-separator/>

    <q-card class="fit column q-mt-lg info-compte" v-if="this.user !== null">
      <q-card-section class="row wrap">
        <q-img
          class="col-xs-12 col-sm-6 q-mx-auto"
          :src="this.user.photo ? this.user.photo : require('src/assets/noPP.png')"
          :ratio="1"
        />
        <div
          class="col column items-xs-center items-sm-start col-xs-12 col-sm q-pl-xs-none q-pl-sm-md q-mt-xs-md q-mt-sm-none">
          <q-badge v-show="!!this.user.is_admin" align="top" color="secondary" class="q-mb-md">administrateur</q-badge>
          <span class="text-h4">{{ this.user.prenom }} {{ this.user.nom }} </span>
          <span class="text-subtitle1 text-grey-7 text-weight-medium">{{ this.user.email }}</span>
          <q-separator class="q-my-sm"/>
          <span class="text-subtitle2 text-weight-regular text-grey-9">Membre depuis le {{ formatedCreatedDate }}</span>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section class="row justify-between items-stretch q-py-md">

        <q-btn
          @click="this.userform = true"
          label="Modifier"
          flat
        />

        <q-btn
          @click="deconnecter"
          label="Se déconnecter"
          color="secondary"
          class=""
        />
      </q-card-section>
    </q-card>

    <q-dialog v-model="userform">
      <edit-form action="modify" :user-to-modify="this.user" @closeUserForm="this.userform = false"/>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { Dialog, date } from 'quasar'
import EditForm from 'components/auth/userForm.vue'

export default {
  name: 'ComptePage',
  components: { EditForm },
  data () {
    return {
      userform: false
    }
  },
  computed: {
    ...mapState('auth', ['user']),

    initiales () {
      const first = this.user.prenom[0]
      const second = this.user.nom[0]
      return (first + second).toUpperCase()
    },

    formatedCreatedDate () {
      const createdDate = new Date(this.user.created_at)
      return date.formatDate(createdDate, 'DD MMMM YYYY', {
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      })
    }
  },

  methods: {

    ...mapActions('auth', ['logout']),

    deconnecter () {
      Dialog.create({
        title: 'Se déconnecter',
        message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
        ok: 'Oui',
        cancel: 'Non',
        persistent: true
      }).onOk(() => {
        this.logout()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.page-title {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.info-compte {
  max-width: 700px;
  margin-inline: auto;
  position: relative;

  .edit-btn {
    position: absolute;
    top: -16px;
    right: -16px;
  }

  .q-img {
    width: 250px;
    aspect-ratio: 1;
    border-radius: 4px;
  }
}
</style>
