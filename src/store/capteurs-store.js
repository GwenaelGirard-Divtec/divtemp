// State : données du magasin
import { tempapi } from 'boot/axios'

const state = {
  capteurs: null,
  mesuresOfActualCapteurs: null
}

/*
Mutations : méthodes qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  setCapteurs (state, capteurs) {
    state.capteurs = capteurs
  },

  setMesures (state, mesures) {
    state.mesuresOfActualCapteurs = mesures
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

  getMesuresOfCapteurs ({ commit, rootState }, id) {
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }

    tempapi.get(`/capteurs/${id}/all`, config)
      .then(response => {
        commit('setMesures', response.data)
      })
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
