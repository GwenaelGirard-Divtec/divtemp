// State : données du magasin
import { tempapi } from 'boot/axios'
import { Loading, LocalStorage } from 'quasar'

const state = {
  capteurs: null,
  actualCapteur: null,
  favouriteCapteurs: []
}

/*
Mutations : méthodes qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  setCapteurs (state, capteurs) {
    state.capteurs = capteurs
  },

  setActualCapteur (state, capteur) {
    state.actualCapteur = capteur
    Loading.hide()
  },

  addCapteurToFavorite (state, idCapteur) {
    state.favouriteCapteurs.push(idCapteur)
    LocalStorage.set('favouriteCapteurs', state.favouriteCapteurs)
  },

  removeCapteurFromFavorite (state, idCapteur) {
    state.favouriteCapteurs.splice(state.favouriteCapteurs.indexOf(idCapteur), 1)
    LocalStorage.set('favouriteCapteurs', state.favouriteCapteurs)
  },

  setFavouriteCapteurs (state, favouriteCapteurs) {
    state.favouriteCapteurs = favouriteCapteurs
  }
}

/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  getAllCapteurs ({ commit, rootState }) {
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }

    tempapi.get('/capteurs', config)
      .then(response => {
        commit('setCapteurs', response.data)
      })
  },

  getActualCapteur ({ commit, state, rootState }, id) {
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }

    if (!state.actualCapteur || (state.actualCapteur && state.actualCapteur.id.toString() !== id)) {
      Loading.show()
    }

    tempapi.get(`/capteurs/${id}/all`, config)
      .then(response => {
        commit('setActualCapteur', response.data)
      })
  },

  clearActualCapteur ({ commit }) {
    commit('setActualCapteur', null)
  },

  addCapteurToFavorite ({ commit, state }, idCapteur) {
    if (state.favouriteCapteurs.indexOf(idCapteur) === -1) {
      commit('addCapteurToFavorite', idCapteur)
    }
  },

  removeCapteurFromFavorite ({ commit, state }, idCapteur) {
    if (state.favouriteCapteurs.indexOf(idCapteur) !== -1) {
      commit('removeCapteurFromFavorite', idCapteur)
    }
  },

  setFavouriteCapteurs ({ commit }, favouriteCapteurs) {
    commit('setFavouriteCapteurs', favouriteCapteurs)
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  capteursBySalle: state => {
    const organizedCapteurs = []
    if (state.capteurs) {
      Object.entries(state.capteurs.reduce((map, e) => ({
        ...map,
        [e.salle.nom]: [...(map[e.salle.nom] ?? []), e]
      }), {})).forEach((elem) => {
        organizedCapteurs.push({
          nom: elem[0],
          capteurs: elem[1]
        })
      })
    }

    return organizedCapteurs
  },

  favouriteCapteurs: state => {
    if (state.capteurs) {
      return state.capteurs.filter((capteur) => state.favouriteCapteurs.indexOf(capteur.id) !== -1)
    } else {
      return []
    }
  }
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
