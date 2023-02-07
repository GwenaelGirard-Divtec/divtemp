// State : données du magasin
import { tempapi } from 'boot/axios'
import { successNotify } from 'src/functions/notification'
import { Loading, LocalStorage } from 'quasar'
import { errorDialog } from 'src/functions/erreurs'

const state = {
  user: null,
  token: null
}

/*
Mutations : méthodes qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  setUser (state, user) {
    state.user = user
  },

  setToken (state, token) {
    state.token = token
  }
}

/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  login ({ dispatch, state }, payload) {
    Loading.show()
    tempapi.post('/login', payload)
      .then(response => {
        dispatch('setUser', response.data)
        successNotify('Bienvenue ' + state.user.prenom + ' !')
      })
      .catch(error => {
        Loading.hide()
        errorDialog('Une erreur est survenue !</br> Vérifier l\'adresse mail et le mot de passe')
        throw error
      })
  },

  logout ({ commit, state }) {
    const config = {
      headers: { Authorization: 'Bearer ' + state.token }
    }
    Loading.show()
    tempapi.post('/logout', {}, config)
      .then(response => {
        console.log(response)
        Loading.hide()
        successNotify(response.data.message)
      })
      .catch(error => {
        errorDialog('Erreur lors de la déconnexion')
        throw error
      })
      .finally(() => {
        commit('setUser', null)
        commit('setToken', null)

        LocalStorage.clear()

        Loading.hide()
      })
  },

  setUser ({ commit, dispatch }, data) {
    commit('setUser', data.user)
    commit('setToken', data.access_token)

    LocalStorage.set('user', data.user)
    LocalStorage.set('token', data.access_token)

    Loading.hide()
    this.$router.push('/')
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
