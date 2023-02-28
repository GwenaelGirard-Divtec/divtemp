// State : données du magasin
import { tempapi } from 'boot/axios'
import { Loading } from 'quasar'

const state = {
  salles: [],
  actualSalle: []
}

/*
Mutations : méthodes qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  setSalles (state, salles) {
    Loading.hide()
    state.salles = salles
  },

  setActualSalle (state, actualSalle) {
    state.actualSalle = actualSalle
  }
}

/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  getAllSalles ({ commit, state, rootState }) {
    if (!state.salles) {
      Loading.show()
    }

    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }

    tempapi.get('/salles', config)
      .then(response => {
        commit('setSalles', response.data)
      })
  },

  getActualSalle ({ commit, rootState }, id) {
    commit('setActualSalle', [])
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }

    tempapi.get(`/salles/${id}/capteurs`, config)
      .then(response => {
        commit('setActualSalle', response.data)
      })
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace à notre objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
