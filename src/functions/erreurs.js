import { Dialog, Notify } from 'quasar'

export function errorDialog (message, erreurs) {
  if (Array.isArray(erreurs) && erreurs.length) {
    message += '<ul><li>' + erreurs.join('</li><li>') + '</li></ul>'
  }
  // Crée et affiche la boite de dialogue
  Dialog.create({
    title: 'Erreur', // Titre de la dialog
    message, // Message de la dialog
    html: true, // Html utilisable dans le message
    color: 'negative'
  })
}

export function errorNotify (message) {
  Notify.create({
    message,
    type: 'negative',
    html: true
  })
}
