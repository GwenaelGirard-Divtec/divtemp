<template>
  <router-view/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',

  data () {
    return {
      refrshing: {
        interval: null,
        delay: 5000
      },

      update: {
        interval: null,
        delay: 5000
      }
    }
  },

  computed: {
    ...mapGetters('capteurs', ['favouriteCapteurs'])
  },

  methods: {
    ...mapActions('auth', ['setUser']),
    ...mapActions('auth', ['refreshUser']),
    ...mapActions('capteurs', ['setFavouriteCapteurs', 'getAllCapteurs']),
    ...mapActions('salles', ['getAllSalles'])
  },
  mounted () {
    const user = this.$q.localStorage.getItem('user')
    const token = this.$q.localStorage.getItem('token')

    if (user && token) {
      const data = {
        user,
        access_token: token
      }
      this.setUser(data)
    }

    const favouriteCapteurs = this.$q.localStorage.getItem('favouriteCapteurs')

    if (favouriteCapteurs) {
      this.setFavouriteCapteurs(favouriteCapteurs)
    }

    this.getAllCapteurs()
    this.getAllSalles()

    this.update.interval = setInterval(() => {
      this.getAllCapteurs()
      this.getAllSalles()
    }, this.update.delay)
  },

  unmounted () {
    clearInterval(this.refrshing.interval)
    clearInterval(this.update.interval)
  }
}
</script>

<style>
html {
  overflow-y: scroll;
}
</style>
