<template>
  <q-card>
    <q-card-section class="row justify-between items-start q-pa-sm">
      <span class="text-h6">{{ this.action === 'modify' ? 'Modifier' : 'Créer' }}</span>
      <q-btn icon="close" flat dense @click="this.$emit('closeUserForm')"/>
    </q-card-section>

    <q-card-section class="q-pa-sm">
      <q-form @submit.prevent="this.submitForm" class="column items-stretch">
        <div class="column" style="max-width: 600px">
          <q-img
            :src="this.user.photo ? this.user.photo : require('assets/no_profile_pic.png')"
            :ratio="1"
            class="q-mx-auto q-mb-md"
            @error="this.imageValidation = false"
            @load="this.imageValidation = true"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-negative text-white">
                Image invalide
              </div>
            </template>
          </q-img>
          <q-input
            filled
            v-model="this.user.photo"
            label="Url de l'image"
            class="q-mb-md"
            dense
          />
        </div>

        <div class="row items-start wrap flex-break">
          <q-input
            filled
            class="col-xs-12 col-sm-6 q-pr-sm-sm"
            v-model="this.user.prenom"
            label="test"
            dense
            lazy-rules
            :rules="[ val => val.length >= 4 || 'Minimum 4 caractère']"
          />

          <q-input
            filled
            class="col-xs-12 col-sm-6 q-pl-sm-sm"
            v-model="this.user.nom"
            label="Nom"
            dense
            lazy-rules
            :rules="[ val => val.length >= 4 || 'Minimum 4 caractère']"
          />
        </div>

        <q-input
          filled
          class="q-mb-sm"
          v-model="this.user.email"
          label="E-mail"
          lazy-rules
          :rules="[val => validateEmail(val) || 'Email invalide']"
          dense
        />
        <div class="q-mb-md row justify-between items-center">
          <q-checkbox
            v-show="this.action === 'create'"
            class="col"
            v-model="this.user.is_admin"
            label="Administrateur"
            dense
          />

        </div>
        <q-btn class="col" color="primary" padding="md" type="submit" label="Sauvegarder"/>
      </q-form>
    </q-card-section>

  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'userForm',
  props: {
    userToModify: {
      type: Object,
      required: false
    },
    action: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      user: {
        nom: '',
        prenom: '',
        photo: null,
        email: '',
        password: '',
        is_admin: 0
      },

      imageValidation: null
    }
  },

  computed: {
    /**
     * Récupère les initiales du nom
     * @returns {string} initiales
     */
    initiales () {
      let initiales = ''
      if (this.user.prenom.length > 0 && this.user.nom.length > 0) {
        const first = this.user.prenom[0]
        const second = this.user.nom[0]
        initiales = first.toUpperCase() + second.toUpperCase()
      }

      return initiales
    }
  },

  methods: {

    ...mapActions('auth', ['UPDATE_USER']),

    /**
     * Vérifie que l'e-mail à une forme valide avec l'aide d'une regex
     * @param email email à vérifier
     * @returns {boolean} true si l'email est valide, sinon false
     */
    validateEmail (email) {
      // Source : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },

    /**
     * Envoie le formulaire
     */
    submitForm () {
      // Construction du payload
      const payload = {
        id: this.user.id,
        updates: this.user // Passe toutes les propriétés de l'utilisateur
      }

      // envoie le payload au magasin
      this.UPDATE_USER(payload)

      // ferme le formulaire
      this.$emit('closeUserForm')
    }
  },

  mounted () {
    // si nous sommes en modification
    if (this.userToModify) {
      // clone l'utilisateur a modifier dans une nouvelles variables
      this.user = Object.assign({}, this.userToModify)
      this.user.is_admin = !!this.user.is_admin
    }
  }
}
</script>

<style scoped>

.q-card {
  width: 100%;
}

.q-img {
  width: 200px;
  aspect-ratio: 1;
  border-radius: 4px;
}
</style>
