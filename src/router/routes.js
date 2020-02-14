
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
      { path: '/study', component: () => import('pages/client/Study_manager.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/admin/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/EventManage.vue') },
      { path: '/admin/applicant-manage', component: () => import('pages/admin/ApplicantManage.vue') },
      { path: '/admin/applicant-manage/:id&:index', component: () => import('pages/admin/ApplicantList.vue') },
      { path: '/admin/new-event', component: () => import('pages/admin/NewEvent.vue') },
      { path: '/admin/edit-event/:id', component: () => import('pages/admin/NewEvent.vue') }
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
