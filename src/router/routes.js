
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CapteursPage.vue') },
      { path: '/salles', component: () => import('pages/SallesPage.vue') },
      { path: '/capteurs/:id', component: () => import('pages/CapteursPageDetails.vue') },
      { path: '/auth', component: () => import('pages/AuthPage.vue') },
      { path: '/account', component: () => import('pages/ComptePage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
