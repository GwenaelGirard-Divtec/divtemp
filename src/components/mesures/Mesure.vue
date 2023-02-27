<template>
<q-table
  title="Mesures"
  :rows="this.mesures.slice(0, 5)"
  :columns="columns"
  row-key="date"
  flat
  dense
  hide-bottom

/>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'Mesure',
  data () {
    return {
      columns: [
        {
          name: 'date',
          required: true,
          label: 'Date',
          align: 'left',
          field: row => row.date,
          format: val => this.formatDate(val),
          sortable: false
        },
        {
          name: 'humidite',
          required: true,
          label: '💧',
          align: 'center',
          field: row => row.humidite,
          format: val => `${val}%`,
          sortable: false
        },
        {
          name: 'temperature',
          required: true,
          label: '🌡️',
          align: 'center',
          field: row => row.temperature,
          format: val => `${val}°C`,
          sortable: false
        }
      ]
    }
  },

  props: {
    mesures: {
      type: Array,
      required: true
    }
  },

  methods: {
    formatDate (dateStr) {
      const dateDate = new Date(dateStr)
      return date.formatDate(dateDate, 'DD.MM.YY - HH:MM')
    }
  }
}
</script>

<style scoped>

</style>
