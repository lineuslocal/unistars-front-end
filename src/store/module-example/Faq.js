const state = {
    faqs: [
        { 
            id: 1,
            keyword: "Synonymous",
            createdDate: "2020-08-28 11:00",
            currentParticipant: 0,
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            catalog_id: 999999
        },
        { 
            id: 2,
            keyword: "Antioxidant",
            createdDate: "2020-08-28 11:00",
            currentParticipant: 0,
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            catalog_id: 999999
        },
        { 
            id: 3,
            keyword: "Cell",
            createdDate: "2020-08-28 11:00",
            currentParticipant: 0,
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            catalog_id: 999999
        },
        { 
            id: 4,
            keyword: "Essentials",
            createdDate: "2020-08-28 11:00",
            currentParticipant: 0,
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            catalog_id: 999999
        }
    ],
    currentFaq: {}
}
const mutations = {
    saveFaq( state, changedFaq ) {
        state.faqs.forEach(faq => {
            if ( faq.id ==  changedFaq.id ) {
              faq.keyword = changedFaq.keyword
              faq.description = changedFaq.description
              faq.createdDate = changedFaq.createdDate
            }
          })
    },
    createFaq (state, faq) {
        state.faqs.push(faq)
        state.faqs.forEach(element => {
            console.log(element)
        });
        
    },
    changeCurrentFaq (state, faq) {
        state.currentFaq = faq
    },
    deleteFaq (state, delList) {
        delList.forEach(id => {
            state.faqs.forEach( (faq, index) => {
                if (faq.id == id ) {
                    state.faqs.splice(index, 1)
                }
            })
        })
    },
    sortAscByName (state) {
        state.faqs.sort( (a, b) => {
            var x = a.title.toLowerCase()
            var y = b.title.toLowerCase()
            if ( x < y) {return 1}
            if ( x > y) {return -1}
            return 0
          })
    },
    sortDesByName (state) {
        state.faqs.sort( (a, b) => {
            var x = a.title.toLowerCase()
            var y = b.title.toLowerCase()
            if ( x < y) {return 1}
            if ( x > y) {return -1}
            return 0
          })
        state.faqs.reverse()
    },
    sortAscByDate (state) {
        state.faqs.sort( (a, b) => {
           return  parseInt(a.createdDate.split('-').join('')) -  parseInt(b.createdDate.split('-').join(''))
        })
    },
    sortDesByDate (state) {
        state.faqs.sort( (a, b) => {
           return  parseInt(b.createdDate.split('-').join('')) -  parseInt(a.createdDate.split('-').join(''))
        })
    },
    sortAscByCurParticipant (state) {
        state.faqs.sort( (a, b) => {
            return a.currentParticipant - b.currentParticipant
        } )
    },
    sortDesByCurParticipant (state) {
        state.faqs.sort( (a, b) => {
            return b.currentParticipant - a.currentParticipant
        } )
    }
}

export default {
    namespaced: true,
    state,
    mutations
}

  