// State : données du magasin
import { tempapi } from 'boot/axios'
import { Loading } from 'quasar'
import { errorDialog } from 'src/functions/erreurs'
import { successNotify } from 'src/functions/notification'

const state = {
  salles: []
}

const mutations = {
  /**
   * Change la liste des salles dans le state
   * @param state
   * @param salles
   */
  setSalles (state, salles) {
    Loading.hide()
    state.salles = salles
  }
}

const actions = {
  /**
   * Récupère la liste de toutes les salles de la base de donnée
   * @param commit
   * @param state
   * @param rootState
   * @constructor
   */
  GET_ALL_SALLES ({ commit, state, rootState }) {
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

  /**
   * Ajoute une salle dans la base et retourne la réponse de l'API
   * @param dispatch
   * @param rootState
   * @param salle salle à ajouter
   * @returns {Promise<AxiosResponse<any>>} réponse de l'API
   * @constructor
   */
  CREATE_SALLE ({ dispatch, rootState }, salle) {
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

  /**
   * Modifie une salle dans la base de donnée et retourne la réponse de l'API
   * @param dispatch
   * @param rootState
   * @param salle sallle à modifier
   * @returns {Promise<AxiosResponse<any>>} réponse de l'API
   * @constructor
   */
  MODIFY_SALLE ({ dispatch, rootState }, salle) {
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

  /**
   * Supprime une salle dans la base de donnée
   * @param dispatch
   * @param rootState
   * @param idSalle id de la salle à supprimer
   * @constructor
   */
  DELETE_SALLE ({ dispatch, rootState }, idSalle) {
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

const getters = {
  /**
   * Récupère la liste des noms des salles (uniquement les noms)
   * @param state
   * @returns {(string|string|*)[]}
   */
  getSimpleSalles: state => {
    return state.salles.map(({ id, ...item }) => item.nom)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
