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

    <span class="text-subtitle1 text-weight-medium">{{ this.complete ? 'Mesures' : 'Dernières mesures' }}</span>

    <q-table
      :rows="this.complete ? this.filteredDate(this.filterDate) : this.mesures.slice(0, 2)"
      :columns="this.complete ? this.columnsComplete : this.columnsNormal"
      row-key="date"
      flat
      dense
      class="bg-grey-1"
      :hide-bottom="!this.complete"
      no-data-label="Aucune mesures..."
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

      columnsNormal: [
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
          name: 'id',
          required: true,
          label: 'Id',
          align: 'left',
          field: row => row.id,
          format: val => val,
          sortable: true
        },
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
