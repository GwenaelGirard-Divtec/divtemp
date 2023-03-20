<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar class="no-padding">
        <q-toolbar-title>
          <q-avatar rounded class="q-ml-md">
            <img :src="require('assets/logo_divtec.png')">
          </q-avatar>
          DivTemp
        </q-toolbar-title>

        <q-btn
          v-if="!user"
          to="/auth"
          flat
          icon-right="account_circle"
          label="Se connecter"
          class="absolute-right"
        />

        <div v-else class="row content-center">
          <q-btn
            to="/account"
            flat
            :label="user.prenom + '.' + user.nom[0].toUpperCase()"
          >
            <q-avatar circle class="q-ml-md">
              <img :src="this.user.photo ? this.user.photo : require('assets/no_profile_pic.png')">
            </q-avatar>
          </q-btn>
        </div>

      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Capteurs" exact />
        <q-route-tab to="/salles" label="Salles" exact />
      </q-tabs>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-dark text-grey-5">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-subtitle1">Copyright &copy; {{ new Date().getFullYear() }} Gwenaël Girard</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainLayout',
  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>

<style scoped>

</style>
