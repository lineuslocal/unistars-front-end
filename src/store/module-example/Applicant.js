const state = {
    applicants: [
        {
            id: 1,
            name: 'Mark Zuckerberg',
            email: 'example@gmail.com',
            phone:'0123456789',
            belongs: 'The Player',
            appliedDate: '2020-01-01 08:30',
            orderNo: 3,
            state: 'Applied',
            NumOfTicket: 5,
            addInfors: [
                { question: "How old are you?", isRequired: true, answer: "18" },
                { question: "How long do you spend to exercise in every weekend?", isRequired: false, answer: "30 minutes" },
                { question: "what is your weight?", isRequired: true, answer: "100 kgs" },
            ],
            surveys:[
                {queSurvey: "Your satisfaction level?", selections: ["good", "normal", "bad"], selected: "bad"},
                {queSurvey: "Your satisfaction level?", selections: ["good", "normal", "bad"], selected: "normal"}
            ]
        },
        {
            id: 2,
            name: 'Steve McManaman',
            email: 'example@gmail.com',
            phone:'0123456789',
            belongs: 'The Player',
            appliedDate: '2020-01-01 08:30',
            orderNo: 3,
            state: 'Attended',
            NumOfTicket: 5,
            addInfor: [
                { question: "How old are you?", isRequired: true, answer: "18" },
                { question: "How long do you spend to exercise in every weekend?", isRequired: false, answer: "30 minutes" },
                { question: "what is your weight?", isRequired: true, answer: "100 kgs" },
            ],
            survey:[
                {queSurvey: "Your satisfaction level?", selections: ["good", "normal", "bad"], selected: "normal"}
            ]
        }
    ]
}
const mutations = {
    changeState(state, [index, val]) {
        state.applicants[index].state = val
    },
    sortAscByName(state) {
        state.applicants.sort((a, b) => {
            var x = a.name.toLowerCase()
            var y = b.name.toLowerCase()
            if (x < y) { return 1 }
            if (x > y) { return -1 }
            return 0
        })
    },
    sortDesByName(state) {
        state.applicants.sort((a, b) => {
            var x = a.name.toLowerCase()
            var y = b.name.toLowerCase()
            if (x < y) { return 1 }
            if (x > y) { return -1 }
            return 0
        })
        state.applicants.reverse()
    },
    sortAscByDate(state) {
        state.applicants.sort((a, b) => {
            return parseInt(a.appliedDate.split('-').join('')) - parseInt(b.appliedDate.split('-').join(''))
        })
    },
    sortDesByDate(state) {
        state.applicants.sort((a, b) => {
            return parseInt(b.appliedDate.split('-').join('')) - parseInt(a.appliedDate.split('-').join(''))
        })
    },
    sortAscByStatus(state) {
        state.applicants.sort((a, b) => {
            if (a.state < b.state) { return 1 }
            if (a.state > b.state) { return -1 }
            return 0
        })
    },
    sortDesByStatus(state) {
        state.applicants.sort((a, b) => {
            if (a.state < b.state) { return 1 }
            if (a.state > b.state) { return -1 }
            return 0
        })
        state.applicants.reverse()
    },
}
export default {
    namespaced: true,
    state,
    mutations
}

