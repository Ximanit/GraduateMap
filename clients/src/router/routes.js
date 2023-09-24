import OldMap from 'pages/OldMap.vue'
import NewMap from 'pages/NewMap.vue'

import MainLayoutVue from 'layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayoutVue,
    children: [
      {
        path: 'oldmap',
        component: OldMap,
        name: 'oldmap'
      },
      {
        path: 'newmap',
        component: NewMap,
        name: 'newmap'
      }
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
