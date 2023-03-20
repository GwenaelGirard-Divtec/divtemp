// State : données du magasin
import { tempapi } from 'boot/axios'
import { successNotify } from 'src/functions/notification'
import { Loading, LocalStorage } from 'quasar'
import { errorDialog } from 'src/functions/erreurs'

const state = {
  user: null,
  token: null
}

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
  },

  /**
   * Modifie l'utilisateur connecté
   * @param state
   * @param payload contient l'id de l'utilisateur à modifier et les modifications à effectuer
   */
  updateUser (state, payload) {
    Object.assign(state.user, payload.updates)
    LocalStorage.set('user', payload.updates)
  }
}

const actions = {
  /**
   * Connecte un utilisateur auprès de l'API
   * @param dispatch
   * @param state
   * @param payload informations de connexion de l'utilisateur
   */
  LOGIN ({ dispatch, state }, payload) {
    Loading.show()
    tempapi.post('/login', payload)
      .then(response => {
        console.log(response.data)
        dispatch('SET_USER', response.data)
        successNotify('Bienvenue ' + state.user.prenom + ' !')
        dispatch('capteurs/GET_ALL_CAPTEURS', null, { root: true })
        dispatch('salles/GET_ALL_SALLES', null, { root: true })
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
  LOGOUT ({ commit, state }) {
    const config = {
      headers: { Authorization: 'Bearer ' + state.token }
    }
    Loading.show()
    tempapi.post('/logout', {}, config)
      .then(response => {
        Loading.hide()
        successNotify(response.data.message)
      })
      .catch(error => {
        errorDialog('Erreur lors de la déconnexion')
        throw error
      })
      .finally(() => {
        this.$router.push('/auth')

        // efface les valeurs du magasin
        commit('setUser', null)
        commit('setToken', null)

        // efface le localstorage
        LocalStorage.clear()
        Loading.hide()
      })
  },

  /**
   * Modifie les informations d'un utilisateur
   * @param commit
   * @param state
   * @param payload modifications a effectués
   */
  UPDATE_USER ({ commit, state }, payload) {
    Loading.show()

    const config = {
      headers: { Authorization: 'Bearer ' + state.token }
    }

    tempapi.put('/updateme', payload.updates, config)
      .then(response => {
        payload.updates = response.data
        commit('updateUser', payload)
      }).catch(function (error) {
        errorDialog(
          'Modification de tâche impossible !', Object.values(error.response.data)
        )
        throw error
      })
      .finally(Loading.hide)
  },

  /**
   * Rafraichis le token de l'utilisateur et retourne un boolean qui représente l'état du token
   * @param commit
   * @param state
   * @returns {Promise<boolean>} true si le token a bien été rafraichis, sinon false
   */
  REFRESH_USER ({ commit, state }) {
    const config = {
      headers: { Authorization: 'Bearer ' + state.token }
    }

    return tempapi.post('/refresh', {}, config)
      .then(response => {
        commit('setToken', response.data.access_token)
        return true
      })
      .catch(() => {
        errorDialog('Vous avez été déconnecté')
        this.$router.push('/auth')

        // efface les valeurs du magasin
        commit('setUser', null)
        commit('setToken', null)

        // efface le localstorage
        LocalStorage.clear()
        return false
      }
      )
  },

  /**
   * Enregistre un utilisateur et un token
   * @param commit
   * @param dispatch
   * @param data information de l'utilisateur et du token
   */
  SET_USER ({ commit, dispatch }, data) {
    commit('setUser', data.user)
    commit('setToken', data.access_token)

    Loading.hide()
    this.$router.push('/')
  }
}

const getters = {
  /**
   * Retourne si l'utilisateur est admin ou non
   * @param state
   * @returns {boolean} true s'il est admin, sinon false
   */
  isAdmin: state => {
    if (state.user) {
      return !!state.user.is_admin
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
