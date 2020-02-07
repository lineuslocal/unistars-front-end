const state = {
    applicants: [
        {
            id: 1,
            name: 'Mark Zuckerberg',
            email: 'example@gmail.com',
            phone:'0123456789',
            belongs: 'The Player',
            appliedDate: '2020-01-01',
            orderNo: 3,
            state: 'registered',
            addInfor: [
                { question: "How old are you?", isRequired: true, answer: "18" },
                { question: "How long do you spend to exercise in every weekend?", isRequired: false, answer: "30 minutes" },
                { question: "what is your weight?", isRequired: true, answer: "100 kgs" },
            ],
        },
        {
            id: 2,
            name: 'Nelson Mandela',
            email: 'example@gmail.com',
            phone:'0123456789',
            belongs: 'The Player',
            appliedDate: '2020-12-01',
            orderNo: 5,
            state: 'registered',
            addInfor: [
                { question: "How old are you?", isRequired: true, answer: "18" },
                { question: "How long do you spend to exercise in every weekend?", isRequired: false, answer: "30 minutes" },
                { question: "what is your weight?", isRequired: true, answer: "100 kgs" },
                { question: "How old are you?", isRequired: true, answer: "18" },
                { question: "How long do you spend to exercise in every weekend?", isRequired: false, answer: "30 minutes" },
                { question: "what is your weight?", isRequired: true, answer: "100 kgs" },
            ],
        },
        {
            id: 3,
            name: 'Franklin D. Roosevelt',
            email: 'example@gmail.com',
            phone:'0123456789',
            belongs: 'The Player',
            appliedDate: '2019-01-03',
            orderNo: 2,
            state: 'registered',
            addInfor: [

            ],
        },
        {
            id: 4,
            name: 'Mahatma Gandhi',
            email: 'example@gmail.com',
            phone:'0123456789',
            belongs: 'The Player',
            appliedDate: '2020-01-05',
            orderNo: 4,
            state: 'registered',
            addInfor: [
                { question: "How old are you?", isRequired: true, answer: "18" },
            ],
        },
        {
            id: 5,
            name: 'Bill Gates',
            email: 'example@gmail.com',
            phone:'0123456789',
            belongs: 'The Player',
            appliedDate: '2018-10-30',
            orderNo: 1,
            state: 'registered',
            addInfor: [
                { question: "How old are you?", isRequired: true, answer: "18" },
                { question: "How long do you spend to exercise in every weekend?", isRequired: false, answer: "30 minutes" },
            ],
        },
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
    sortAscByOrder(state) {
        state.applicants.sort((a, b) => {
            return a.orderNo - b.orderNo
        })
    },
    sortDesByOrder(state) {
        state.applicants.sort((a, b) => {
            return b.orderNo - a.orderNo
        })
    },
}
export default {
    namespaced: true,
    state,
    mutations
}

