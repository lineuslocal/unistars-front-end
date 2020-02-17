
const routes = [
  {
    path: '/',
    component: () => import('layouts/client/MainLayoutlong.vue'),
    children: [
      { path: '/', component: () => import('pages/client/Login.vue') },
      { path: '/signup', component: () => import('pages/client/Signup.vue') },
      { path: '/resetpass', component: () => import('pages/client/Resetpass.vue') },
      { path: '/event', component: () => import('pages/client/Event.vue') },
      { path: '/event-style', component: () => import('pages/client/Event-style.vue') },
      { path: '/event-detail', component: () => import('pages/client/Event-detail.vue') },
      { path: '/reset-manager', component: () => import('pages/client/rs_manager.vue') },
      { path: '/reset-manager-add', component: () => import('pages/client/rs_manager-add.vue') },
      { path: '/reset-manager-month', component: () => import('pages/client/rs_manager-month.vue') },
      { path: '/reset-manager-AdProd', component: () => import('pages/client/RS_manager-AdProd.vue') },
      { path: '/study', component: () => import('pages/client/Study_manager.vue') },
      { path: '/Apply', component: () => import('pages/client/Apply.vue') }, 
      { path: '/ApplicationHistory', component: () => import('pages/client/ApplicationHistory.vue')}, 
      { path: '/ApplicationHistory/:id', component: () => import('pages/client/ApplicationConfirm.vue')}
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/admin/AdminLayoutWeb.vue'),
    children: [
      { path: '/admin/edu-event/:cat_id', 
        component: () => import('pages/admin/EventManagerWeb.vue'),
        children: [
          { path: '/admin/applicant-manager/:id', component: () => import('pages/admin/ApplicantManagerWeb.vue') },
          { path: '/admin/detail-applicant/:id', component: () => import('pages/admin/ApplicantDetailWeb.vue') }
        ] 
      },
      { path: '/admin/event-detail/:id', component: () => import('pages/admin/EventDetailWeb.vue') },
      { path: '/admin/edit-event/:id', component: () => import('pages/admin/NewEventWeb.vue') },
      { path: '/admin/add-event', component: () => import('pages/admin/NewEventWeb.vue') }
    ]
  }
]
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
