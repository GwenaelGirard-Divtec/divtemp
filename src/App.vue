<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions('auth', ['setUser'])
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
  }
}
</script>
