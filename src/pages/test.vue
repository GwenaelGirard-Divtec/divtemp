<template>
  <q-page class="q-pa-md" :style="{height: full_height?'1px':''}">

    <q-tabs v-model="tab">
      <q-toggle v-model="full_height" color="black">Full Height Tab Panel</q-toggle>
      <q-tab name="images" label="Images" ></q-tab>
      <q-tab name="videos" label="Videos" ></q-tab>
      <q-tab name="articles" label="Articles" ></q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab" animated swipeable class='full-height'>

      <q-tab-panel swipeable name="images" style="background:red">
        <div class="text-h6">Mails</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <div style="background:black;color:white;width:100px;height:85%;">An image which wants to use the a percentage of the page</div>
      </q-tab-panel>

      <q-tab-panel swipeable name="videos" style="background:green">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel swipeable name="articles" style="background:blue">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

    </q-tab-panels>
  </q-page>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      tab: 'mails',
      full_height: false
    }
  }
}
</script>

<style scoped>

</style>
