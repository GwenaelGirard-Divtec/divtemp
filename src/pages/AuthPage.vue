<template>
  <q-page padding class="flex flex-center">
    <auth-form @formsubmit="LOGIN"/>
  </q-page>
</template>

<script>
import AuthForm from 'components/auth/authForm.vue'
import { mapActions } from 'vuex'

export default {
  name: 'AuthPage',
  components: { AuthForm },
  methods: {
    ...mapActions('auth', ['LOGIN'])
  }
}
</script>

<style scoped>

</style>
