const state = {
    events: [
        { id: 1, title: '<Seoul> Success Core 5th Core 5th Core', date: '2020.01.01', reg: 42, maxSeat: 50, del: false },
        { id: 2, title: '<Busan> Success Core 5th Recruitment', date: '2020.01.01', reg: 42, maxSeat: 50, del: false },
        { id: 3, title: '<Osaka> Success Core 5th Recruitment', date: '2020.01.01', reg: 24, maxSeat: 50, del: false },
        { id: 4, title: '<Tokyo> Success Core 5th Recruitment', date: '2020.01.01', reg: 15, maxSeat: 30, del: false },
        { id: 5, title: '<HaNoi> Success Core 5th Recruitment', date: '2020.01.01', reg: 48, maxSeat: 50, del: false },
        { id: 6, title: '<TpHCM> Success Core 5th Recruitment', date: '2020.01.01', reg: 17, maxSeat: 50, del: false },
        { id: 7, title: '<LaoCai> Success Core 5th Recruitment', date: '2020.01.01', reg: 11, maxSeat: 30, del: false },
        { id: 8, title: '<Seoul> Success Core 5th Core 5th Core', date: '2020.01.01', reg: 42, maxSeat: 50, del: false },
        { id: 9, title: '<Busan> Success Core 5th Recruitment', date: '2020.01.01', reg: 42, maxSeat: 50, del: false },
        { id: 10, title: '<Osaka> Success Core 5th Recruitment', date: '2020.01.01', reg: 24, maxSeat: 50, del: false },
        { id: 11, title: '<Tokyo> Success Core 5th Recruitment', date: '2020.01.01', reg: 15, maxSeat: 30, del: false },
        { id: 12, title: '<HaNoi> Success Core 5th Recruitment', date: '2020.01.01', reg: 48, maxSeat: 50, del: false },
        { id: 13, title: '<TpHCM> Success Core 5th Recruitment', date: '2020.01.01', reg: 17, maxSeat: 50, del: false },
        { id: 14, title: '<LaoCai> Success Core 5th Recruitment', date: '2020.01.01', reg: 11, maxSeat: 30, del: false }
    ],
    currentEvent: {}
}
const mutations = {
    changeCurrentEvent (state, event) {
        state.currentEvent = event
    }
}

export default {
    namespaced: true,
    state,
    mutations
}

  