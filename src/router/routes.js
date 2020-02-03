
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EventManage.vue') },
      { path: '/applicant-manage', component: () => import('pages/ApplicantManage.vue') },
      { path: '/applicant-manage/:id&:index', component: () => import('pages/ApplicantList.vue') }
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
