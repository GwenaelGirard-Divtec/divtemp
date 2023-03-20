<template>
  <router-view/>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'App',

  data () {
    return {
      update: {
        interval: null,
        paused: true,
        delay: 5000
      }
    }
  },

  computed: {
    ...mapGetters('capteurs', ['favouriteCapteurs']),
    ...mapState('auth', ['token'])
  },

  watch: {
    /**
     * Mets en pause ou reprend l'interval qui s'occupe de mettre a jour l'affichage des données en fonction de la présence du token
     * (si l'utilisateur n'est pas connecté, on ne veut pas que le site tente de mettre a jour les données)
     */
    token () {
      if (this.token === null) {
        this.update.paused = true
      } else {
        this.update.paused = false
      }
    }
  },

  methods: {
    ...mapActions('auth', ['SET_USER', 'REFRESH_USER']),
    ...mapActions('capteurs', ['SET_FAVOURITES_CAPTEURS', 'GET_ALL_CAPTEURS']),
    ...mapActions('salles', ['GET_ALL_SALLES'])
  },
  mounted () {
    // Récupère l'utilisateur et le token du localstorage
    const user = this.$q.localStorage.getItem('user')
    const token = this.$q.localStorage.getItem('token')

    // s'il y avait un utilisateur et un token dans le localstorage, synchroniser le magasin avec le localstorage
    if (user && token) {
      const data = {
        user,
        access_token: token
      }
      this.SET_USER(data)

      // récupère la liste des capteurs favoris du localstorage
      const favouriteCapteurs = this.$q.localStorage.getItem('favouriteCapteurs')

      // si il y a une liste dans le locastorage, synchroniser le magasin avec le localstorage
      if (favouriteCapteurs) {
        this.SET_FAVOURITES_CAPTEURS(favouriteCapteurs)
      }

      // rafraichis le token de l'utilisateur
      this.REFRESH_USER().then(response => {
        if (response) {
          // si le rafraichissement a fonctionné, récupèrer les capteurs et les salles de la base de donnée
          this.GET_ALL_CAPTEURS()
          this.GET_ALL_SALLES()
        }
      })

      // Création de l'interval qui va mettre a jour l'affichage des données de la base de donnée
      this.update.interval = setInterval(() => {
        if (!this.update.paused) {
          this.GET_ALL_CAPTEURS()
          this.GET_ALL_SALLES()
        }
      }, this.update.delay)
    }
  },

  unmounted () {
    // supprime l'interval de mise a jour de l'affichage des données
    clearInterval(this.update.interval)
  }
}
</script>

<style>
html {
  overflow-y: scroll;
}
</style>
