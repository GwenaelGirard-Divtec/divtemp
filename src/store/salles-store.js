// State : données du magasin
import { tempapi } from 'boot/axios'
import { Loading } from 'quasar'
import { errorDialog } from 'src/functions/erreurs'
import { successNotify } from 'src/functions/notification'

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

  createSalle ({ dispatch, rootState }, salle) {
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }

    return tempapi.post('/salles', salle, config)
      .then(response => {
        dispatch('getAllSalles')
        successNotify('Salle créée !')
        return response
      })
      .catch(error => {
        errorDialog('Une erreur est survenue lors de la création de la salle')
        throw error
      })
  },

  modifySalle ({ dispatch, rootState }, salle) {
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }

    return tempapi.put(`/salles/${salle.id}`, salle, config)
      .then(response => {
        dispatch('getAllSalles')
        successNotify('Salle modifiée')
        return response
      })
      .catch(error => {
        errorDialog('Une erreur est survenue lors de la modification de la salle')
        throw error
      })
  },

  deleteSalle ({ dispatch, rootState }, idSalle) {
    Loading.show()
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }

    tempapi.delete(`/salles/${idSalle}`, config)
      .then(response => {
        Loading.hide()
        dispatch('getAllSalles')
      })
      .catch(error => {
        Loading.hide()
        errorDialog('Suppression de la salle impossible.')
        throw error
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
