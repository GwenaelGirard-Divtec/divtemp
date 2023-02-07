<template>
  <q-page padding class="flex flex-center">
    <auth-form @formsubmit="login"/>
  </q-page>
</template>

<script>
import AuthForm from 'components/auth/authForm.vue'
import { mapActions } from 'vuex'

export default {
  name: 'AuthPage',
  components: { AuthForm },
  methods: {
    ...mapActions('auth', ['login'])
  }
}
</script>

<style scoped>

</style>
