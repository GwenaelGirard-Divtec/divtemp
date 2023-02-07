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
  /**
   * Enregistre un utilisateur dans le magasin ET dans le localStorage
   * @param state
   * @param user utilisateur à enregistrer
   *
   */
  setUser (state, user) {
    state.user = user
    LocalStorage.set('user', user)
  },

  /**
   * Enregistre le token d'accès dans le magasin ET dans le localStorage
   * @param state
   * @param token
   */
  setToken (state, token) {
    state.token = token
    LocalStorage.set('token', token)
  }
}

/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  /**
   * Connecte un utilisateur auprès de l'API
   * @param dispatch
   * @param state
   * @param payload informations de connexion de l'utilisateur
   */
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

  /**
   * Déconnecte un utilisateur auprès de l'API en fonction de son token
   * @param commit
   * @param state
   */
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
        // efface les valeurs du magasin
        commit('setUser', null)
        commit('setToken', null)

        // efface le localstorage
        LocalStorage.clear()

        Loading.hide()
      })
  },

  /**
   * Enregistre un utilisateur et un token
   * @param commit
   * @param dispatch
   * @param data information de l'utilisateur et du token
   */
  setUser ({ commit, dispatch }, data) {
    commit('setUser', data.user)
    commit('setToken', data.access_token)

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
