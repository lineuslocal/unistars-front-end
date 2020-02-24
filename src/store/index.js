import Vue from 'vue'
import Vuex from 'vuex'
import Faq from './module-example/Faq'
import FaqCate  from './module-example/FaqCate'
import Catalogue from './module-example/Catalogue'
import Event from './module-example/Event'
import Applicant from './module-example/Applicant'
import Business from './module-example/Business'
import state from './module-example/state'
import * as mutations from './module-example/mutations'
import Auth from './auth'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state,
    mutations,
    modules: {
      Event,
      Applicant,
      Auth, 
      Catalogue,
      Faq,
      FaqCate,
      Business
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
