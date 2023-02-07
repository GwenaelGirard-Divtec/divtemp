<template>
  <q-form @submit.prevent="this.$emit('formsubmit', this.authInfo)">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Connexion</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pt-none">
        <q-input
          filled
          v-model="authInfo.email"
          class="q-my-md"
          type="email"
          label="E-mail"
          :rules="[val => validateEmail(val) || 'Email invalide']"
          lazy-rules
        />

        <q-input
          filled
          v-model="authInfo.password"
          :type="isPwd ? 'password' : 'text'"
          class="q-mt-md"
          label="Mot de passe"
          :rules="[ val => val.length >= 6 || 'Minimum 6 caractère']"
          lazy-rules
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section>
        <q-btn size="md" label="se connecter" type="submit" color="primary"/>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script>
export default {
  name: 'authForm',
  data () {
    return {
      authInfo: {
        email: '',
        password: ''
      },
      isPwd: true
    }
  },

  methods: {
    validateEmail (email) {
      // Source : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  }
}
</script>

<style lang="scss" scoped>
.q-form {
  max-width: 300px;
  width: 100%;
  min-width: 200px;

  .q-btn {
    width: 100%;
  }
}
</style>
