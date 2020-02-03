const state = {
    applicants: [
        { id: 1, name: 'Mark Zuckerberg', date: '2020.01.01', order_no: 1, state: 'reg' },
        { id: 2, name: 'Mark Zuckerberg', date: '2020.01.01', order_no: 2, state: 'reg' },
        { id: 3, name: 'Mark Zuckerberg', date: '2020.01.01', order_no: 3, state: 'reg' },
        { id: 4, name: 'Mark Zuckerberg', date: '2020.01.01', order_no: 4, state: 'reg' },
        { id: 5, name: 'Mark Zuckerberg', date: '2020.01.01', order_no: 5, state: 'reg' },
        { id: 6, name: 'Mark Zuckerberg', date: '2020.01.01', order_no: 6, state: 'reg' },
        { id: 7, name: 'Mark Zuckerberg', date: '2020.01.01', order_no: 7, state: 'reg' },
        { id: 8, name: 'Mark Zuckerberg', date: '2020.01.01', order_no: 8, state: 'reg' },
        { id: 9, name: 'Mark Zuckerberg', date: '2020.01.01', order_no: 9, state: 'reg' },
        { id: 10, name: 'Mark Zuckerberg', date: '2020.01.01', order_no: 10, state: 'reg' }
      ]
}
const mutations = {
    changeState (state, [index, val]) {
        state.applicants[index].state = val
    }
}
export default {
    namespaced: true,
    state,
    mutations
}

  