import { Notify } from 'quasar'

export function successNotify (message) {
  Notify.create({
    message,
    timeout: 1000,
    color: 'positive',
    html: true
  })
}
