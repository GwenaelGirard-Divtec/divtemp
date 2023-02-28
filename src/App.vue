<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',

  data () {
    return {
      refrshing: {
        interval: null,
        delay: 5000
      }
    }
  },

  methods: {
    ...mapActions('auth', ['setUser']),
    ...mapActions('auth', ['refreshUser']),
    ...mapActions('capteurs', ['setFavouriteCapteurs'])
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
  }
}
</script>

<style>
html {
  overflow-y: scroll;
}
</style>
