// State : données du magasin
import { tempapi } from 'boot/axios'
import { Loading, LocalStorage } from 'quasar'
import { errorDialog } from 'src/functions/erreurs'

const state = {
  capteurs: null,
  actualCapteur: null,
  favouriteCapteurs: []
}

const mutations = {
  /**
   * Change la liste des capteurs dans le state
   * @param state
   * @param capteurs liste des capteurs
   */
  setCapteurs (state, capteurs) {
    state.capteurs = capteurs
  },

  /**
   * Change le capteur actuel dans le state
   * @param state
   * @param capteur capteurs actuel
   */
  setActualCapteur (state, capteur) {
    state.actualCapteur = capteur
    Loading.hide()
  },

  /**
   * Ajoute un capteur aux capteurs favoris dans le state et dans le localstorage
   * @param state
   * @param idCapteur id du capteur à ajouter en favoris
   */
  addCapteurToFavorite (state, idCapteur) {
    state.favouriteCapteurs.push(idCapteur)
    LocalStorage.set('favouriteCapteurs', state.favouriteCapteurs)
  },

  /**
   * Supprime un capteur aux capteurs favoris dans le state et dans le localstorage
   * @param state
   * @param idCapteur id du capteur à supprimer en favoris
   */
  removeCapteurFromFavorite (state, idCapteur) {
    state.favouriteCapteurs.splice(state.favouriteCapteurs.indexOf(idCapteur), 1)
    LocalStorage.set('favouriteCapteurs', state.favouriteCapteurs)
  },

  /**
   * Change toutes la listes des capteurs favoris du state et du localstorage
   * @param state
   * @param favouriteCapteurs liste des capteurs favoris
   */
  setFavouriteCapteurs (state, favouriteCapteurs) {
    state.favouriteCapteurs = favouriteCapteurs
  }
}

const actions = {
  /**
   * Récupère tous les capteurs de la base de donnée ainsi que leurs 10 dernières mesures
   * @param commit
   * @param rootState
   * @constructor
   */
  GET_ALL_CAPTEURS ({ commit, rootState }) {
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }

    tempapi.get('/capteurs', config)
      .then(response => {
        commit('setCapteurs', response.data)
      })
      .catch(() => {
        errorDialog('coucou')
      })
  },

  /**
   * Récupère toutes les mesures d'un capteur (capteur actuellement ouvert sur le site) en spécifiant l'id du capteur
   * @param commit
   * @param state
   * @param rootState
   * @param idCapteur id du capteur
   * @constructor
   */
  GET_ACTUAL_CAPTEURS ({ commit, state, rootState }, idCapteur) {
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }

    if (!state.actualCapteur || (state.actualCapteur && state.actualCapteur.id.toString() !== idCapteur)) {
      Loading.show()
    }

    tempapi.get(`/capteurs/${idCapteur}/all`, config)
      .then(response => {
        commit('setActualCapteur', response.data)
      })
  },

  /**
   * Efface les informations du capteurs actuel
   * @param commit
   * @constructor
   */
  CLEAR_ACTUAL_CAPTEUR ({ commit }) {
    commit('setActualCapteur', null)
  },

  /**
   * Ajoute un capteur aux capteurs favoris
   * @param commit
   * @param state
   * @param idCapteur id du capteur à ajouter aux favoris
   * @constructor
   */
  ADD_CAPTEUR_TO_FAVORITES ({ commit, state }, idCapteur) {
    if (state.favouriteCapteurs.indexOf(idCapteur) === -1) {
      commit('addCapteurToFavorite', idCapteur)
    }
  },

  /**
   * Supprime un capteur aux capteurs favoris
   * @param commit
   * @param state
   * @param idCapteur id du capteur à supprimer aux favoris
   * @constructor
   */
  REMOVE_CAPTEUR_FROM_FAVOURITES ({ commit, state }, idCapteur) {
    if (state.favouriteCapteurs.indexOf(idCapteur) !== -1) {
      commit('removeCapteurFromFavorite', idCapteur)
    }
  },

  /**
   * Change toute la liste des capteurs favoris avec une liste passée en paramètres
   * @param commit
   * @param favouriteCapteurs liste des id des capteurs favoris
   * @constructor
   */
  SET_FAVOURITES_CAPTEURS ({ commit }, favouriteCapteurs) {
    commit('setFavouriteCapteurs', favouriteCapteurs)
  }
}

const getters = {
  /**
   * Récupère les capteurs organisés par salle
   *
   * //EXEMPLE FORMAT DE SORTIE:
   * NOM_LA_SALLE {
   *    nom: NOM_DE_LA_SALLE,
   *    capteurs: {
   *      ...
   *    }
   * }
   *
   * @param state
   * @returns {*[]}
   */
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

  /**
   * Récupère la liste détaillée des capteurs favoris
   * @param state
   * @returns {*|*[]}
   */
  favouriteCapteurs: state => {
    if (state.capteurs) {
      return state.capteurs.filter((capteur) => state.favouriteCapteurs.indexOf(capteur.id) !== -1)
    } else {
      return []
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
