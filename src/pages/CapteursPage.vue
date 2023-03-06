<template>
  <q-page class="padding">
    <q-tabs
      v-model="tab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="capteurs" label="Capteurs"/>
      <q-tab name="salles" label="Salles"/>
      <q-tab name="favourites" label="Capteurs favoris"/>
    </q-tabs>

    <q-tab-panels v-model="tab" class="full-height" animated keep-alive>
      <q-tab-panel name="capteurs">
        <CapteursTab/>
      </q-tab-panel>

      <q-tab-panel name="salles" class="col column">
        <SallesTab/>
      </q-tab-panel>

      <q-tab-panel name="favourites">
        <FavouritesTab/>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import CapteursTab from 'components/capteurs/tabs/CapteursTab.vue'
import SallesTab from 'components/capteurs/tabs/SallesTab.vue'
import FavouritesTab from 'components/capteurs/tabs/FavouritesTab.vue'

export default {
  name: 'CapteursPage',
  components: {
    FavouritesTab,
    SallesTab,
    CapteursTab
  },

  data () {
    return {
      update: {
        interval: null,
        delay: 5000
      },

      tab: 'capteurs'
    }
  },

  computed: {
  },

  methods: {
    ...mapActions('capteurs', ['getAllCapteurs']),
    ...mapActions('salles', ['getAllSalles'])
  },

  mounted () {
    this.getAllCapteurs()
    this.getAllSalles()

    this.update.interval = setInterval(() => {
      this.getAllCapteurs()
      this.getAllSalles()
    }, this.update.delay)
  },

  unmounted () {
    clearInterval(this.update.interval)
  }
}
</script>

<style scoped lang="scss">
.q-tab-panel {
  overflow: hidden;
}

</style>
