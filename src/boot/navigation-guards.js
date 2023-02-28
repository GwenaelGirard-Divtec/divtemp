import { LocalStorage } from 'quasar'
import { errorDialog } from 'src/functions/erreurs'

// Récupère l'objet router représentant Vue router
export default ({ router }) => {
  // Avant de rediriger le visiteur
  router.beforeEach((to, from, next) => {
    // Récupère
    const user = LocalStorage.getItem('user')
    // Si PAS connecté et ne vas par vers /connexion on force la redirection
    if (!user && to.path !== '/auth') {
      // Affiche un message d'erreur uniquement si utilisateur tente d'accéder
      // à une autre page après avoir été redirigé vers la connexion une 1re
      // fois.
      if (from.path === '/auth') {
        errorDialog('Page protégée, connexion requise !')
      }
      next('/auth') // Redirige vers /connexion
    } else {
      next() // Continue la navigation normalement
    }
  })
}
