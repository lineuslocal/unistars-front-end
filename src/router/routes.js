const routes = [
  {
    path: '/',
    component: () => import('layouts/client/ClientLayout.vue'),
    children: [
      { path: '', name: 'Login', component: () => import('pages/client/Login.vue') },
      { path: '/register', name: 'Register', component: () => import('pages/client/Register.vue') },
      { path: '/reset', name: 'Reset', component: () => import('pages/client/Reset.vue') },
      { path: '/verify', name: 'verify', component: () => import('pages/client/Verify.vue') },
      { path: '/home', name: 'HomePage', component: () => import('pages/client/Index.vue') },
      { path: '/event', component: () => import('pages/client/Event.vue') },
      { path: '/event-style/:id', component: () => import('pages/client/Event-style.vue') },
      { path: '/event-style/search/:key', component: () => import('pages/client/Event-style.vue') },
      { path: '/event-detail/:id', component: () => import('pages/client/Event-detail.vue') },
      { path: '/reset-manager', component: () => import('pages/client/rs_manager.vue') },
      { path: '/reset-manager-add', component: () => import('pages/client/rs_manager-add.vue') },
      { path: '/reset-manager-month', component: () => import('pages/client/rs_manager-month.vue') },
      { path: '/reset-manager-AdProd', component: () => import('pages/client/RS_manager-AdProd.vue') },
      { path: '/study', component: () => import('pages/client/Study_manager.vue') },
      { path: '/Apply', component: () => import('pages/client/Apply.vue') }, 
      { path: '/ApplicationHistory',component: () => import('pages/client/ApplicationHistory.vue') },
      { path: '/ApplicationHistory/Confirm/:id', component: () => import('pages/client/ApplicationConfirm.vue') },
      { path: '/ApplicationHistory/Survey/:id', component: () => import('pages/client/Survey.vue') },
      { path: '/ApplicationHistory/Edit/', component: () => import('pages/client/Edit.vue') },
      { path: '/faqs', component: () => import('pages/client/FAQ.vue') }, 
      { path: '/faq/:id', component: () => import('pages/client/FAQDetail.vue')}
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/admin/AdminLayoutWeb.vue'),
    children: [
      { path: 'event', //  => event here
        component: () => import('pages/admin/EventManagerHeaderWeb.vue'),
        children: [
          { path: 'create/:cat_id', component: () => import('pages/admin/EventCreateUpdateWeb.vue') },
          { path: 'update/:cat_id/:event_id', component: () => import('pages/admin/EventCreateUpdateWeb.vue') },
          { path: 'detail/:cat_id/:event_id', component: () => import('pages/admin/EventDetailWeb.vue') },
          { path: 'list/:cat_id', 
            component: () => import('pages/admin/EventListWeb.vue'),
            children:[
              { path: 'applicant/list/:event_id', component: () => import('pages/admin/ApplicantListWeb.vue') },
              { path: 'applicant/update/:event_id/:applicant_id', component: () => import('pages/admin/ApplicantUpdateWeb.vue') },
              { path: 'applicant/detail/:event_id/:applicant_id', component: () => import('pages/admin/ApplicantDetailWeb.vue') }
            ] 
          }
        ] 
      },
      { path: 'faq', // => faq here
        component: () => import('pages/admin/FaqManagerHeaderWeb.vue'),
        children: [
          //url of Keyword must to include "Keyword" keyword
          { path: 'Keyword/list', component: () => import('pages/admin/FaqKeywordWeb.vue') },
          { path: 'Keyword/insert', component: () => import('pages/admin/FaqKeywordInsert.vue') },
          { path: 'Keyword/edit/:id', component: () => import('pages/admin/FaqKeywordEdit.vue') },
          { path: 'Keyword/detail/:id', component: () => import('pages/admin/FaqKeywordDetail.vue') },

           //url of Category must to include "Category" keyword
          { path: 'Category/list', component: () => import('pages/admin/FaqCategoryWeb.vue') },

          //url of FAQ must to include "FAQ" keyword
          { path: 'FAQ/list', component: () => import('pages/admin/FaqFAQWeb.vue') },
          { path: 'FAQ/faq-detail/:id', component: () => import('pages/admin/FAQDetail.vue') },
          { path: 'FAQ/add-new-faq', component: () => import('pages/admin/NewFAQ.vue') },
          { path: 'FAQ/edit-faq/:id', component: () => import('pages/admin/NewFAQ.vue') }

        ]

      }

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
