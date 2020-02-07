
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/EventManage.vue') },
      { path: '/applicant-manage', component: () => import('pages/admin/ApplicantManage.vue') },
      { path: '/applicant-manage/:id&:index', component: () => import('pages/admin/ApplicantList.vue') },
      { path: '/new-event', component: () => import('pages/admin/NewEvent.vue') },
      { path: '/edit-event/:id', component: () => import('pages/admin/NewEvent.vue') }
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
