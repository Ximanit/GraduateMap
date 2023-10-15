import OldMap from 'pages/OldMap.vue'
import NewMap from 'pages/NewMap.vue'
import TechSupportVue from 'src/pages/TechSupport.vue'
import SendApplicVue from 'src/pages/SendApplic.vue'

import MainLayoutVue from 'layouts/MainLayout.vue'
import AuthLayout from 'layouts/AuthLayout.vue'
import UserLayout from 'layouts/UserLayout.vue'

import Login from 'components/Login.vue'
import Register from 'components/Regestration.vue'


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
      },
      {
        path: 'help',
        component: TechSupportVue,
        name: 'help'
      },
      {
        path: 'send_appl',
        component: SendApplicVue,
        name: 'send_appl'
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    name: 'auth',
    children: [{
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'registr',
        name: 'registr',
        component: Register
      },

    ]
  },
  {
    path:'/userMain',
    component : UserLayout
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
