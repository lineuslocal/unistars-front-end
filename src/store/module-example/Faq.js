const state = {
    faqs: [
        { 
            id: 1,
            keyword: "Synonymous",
            createdDate: "2020-02-20 11:00",
            note: `Synonymous`,
        },
        { 
            id: 2,
            keyword: "Antioxidant",
            createdDate: "2020-02-20 11:00",
            note: `Antioxidant`,
        },
        { 
            id: 3,
            keyword: "Cell",
            createdDate: "2020-02-20 11:00",
            note: `Cell`,
        },
        { 
            id: 4,
            keyword: "Essentials",
            createdDate: "2020-02-20 11:00",
            note: `Essentials`,
        }
    ],
    currentFaq: {}
}
const mutations = {
    saveFaq( state, changedFaq ) {
        state.faqs.forEach(faq => {
            if ( faq.id ==  changedFaq.id ) {
              faq.keyword = changedFaq.keyword
              faq.note = changedFaq.note
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
}

export default {
    namespaced: true,
    state,
    mutations
}