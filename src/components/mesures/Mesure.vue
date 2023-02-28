<template>
  <div>
    <div class="header q-mb-md" v-if="complete">
      <q-input clearable filled v-model="filterDate" hint="DD.MM.YYYY" hide-hint label="Date" mask="##.##.####">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover :breakpoint="2000000" transition-show="scale" transition-hide="scale">
              <q-date v-model="filterDate" today-btn mask="DD.MM.YYYY">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <q-table
      title="Mesures"
      :rows="this.complete ? this.filteredDate(this.filterDate) : this.mesures.slice(0, 5)"
      :columns="this.complete ? this.columnsComplete : this.columns"
      row-key="date"
      flat
      dense
      no-data-label="Aucune mesures..."
      :hide-bottom="!this.complete"
      :rows-per-page-options="this.complete ? [50, 100, 500, 0] : [0]"

    />
  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'Mesure',
  data () {
    return {

      sortingElem: 'date',
      sortingOrder: 'asc',

      filterDate: null,

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
      ],

      columnsComplete: [
        {
          name: 'date',
          required: true,
          label: 'Date',
          align: 'left',
          field: row => row.date,
          format: val => this.formatDateComplete(val),
          sortable: true
        },
        {
          name: 'sequence',
          required: true,
          label: 'Sequence',
          align: 'left',
          field: row => row.sequence,
          format: val => `${val}`,
          sortable: true
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
    },

    complete: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    formatDate (dateStr) {
      const dateDate = new Date(dateStr)
      return date.formatDate(dateDate, 'DD.MM.YY - HH:MM')
    },

    formatDateComplete (dateStr) {
      const dateDate = new Date(dateStr)
      return date.formatDate(dateDate, 'DD.MM.YYYY - HH:MM')
    },

    filteredDate (dateToFilter) {
      if (dateToFilter === null || dateToFilter === '') {
        return this.mesures
      } else {
        return this.mesures.filter((el) => date.formatDate(new Date(el.date), 'DD.MM.YYYY').startsWith(dateToFilter))
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
