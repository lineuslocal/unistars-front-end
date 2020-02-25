const state = {
    cates: [
        {
            id: 1,
            name: "Sample",
            kr_Name: 'Korean',
            note: `Synonymous`,
            categories: [
                {
                    id: 2,
                    name: ' categories',
                    kr_Name: 'Korea',
                    note: 'Synonymous',
                    products: [
                        {
                            id: 3,
                            name: ' products',
                            kr_Name: 'Korea',
                            note: 'Synonymous',
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "Begining",
            kr_Name: 'Korean',
            note: `Synonymous`,
            categories: [
                {
                    id: 3,
                    name: ' categories',
                    kr_Name: 'Korea',
                    note: 'Synonymous',
                    products: [
                        {
                            id: 4,
                            name: ' products',
                            kr_Name: 'Korea',
                            note: 'Synonymous',
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: "Intermediate",
            kr_Name: 'Korean',
            note: `Synonymous`,
            categories: [
                {
                    id: 4,
                    name: ' categories',
                    kr_Name: 'Korea',
                    note: 'Synonymous',
                    products: [
                        {
                            id: 5,
                            name: ' products',
                            kr_Name: 'Korea',
                            note: 'Synonymous',
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            name: "Advanced",
            kr_Name: 'Korean',
            note: `Synonymous`,
            categories: [
                {
                    id: 5,
                    name: ' categories',
                    kr_Name: 'Korea',
                    note: 'Synonymous',
                    products: [
                        {
                            id: 6,
                            name: ' products',
                            kr_Name: 'Korea',
                            note: 'Synonymous',
                        }
                    ]
                }
            ]
        },
    ],
    currentCate: {}
}
const mutations = {
    saveCate( state, changedcates ) {
        state.cates.forEach(cate => {
            if ( cate.id ==  changedcates.id ) {
            cate.name = changedcates.name
            cate.kr_Name = changedcates.kr_Name
            cate.note = changedcates.note
            }
          })
    },
    saveCategories( state, changeCategories ) {
        state.cates.categories.forEach(ct => {
            if (ct.id == changeCategories.id){
                ct.name = changeCategories.name
                ct.kr_Name = changeCategories.kr_Name
                ct.note = changeCategories.note
            }
        })
    },
    createCate (state, cate) {
        state.cates.push(cate)    
    },
    createcategoriesCate (state, id) {
    state.cates.forEach((e, index)=>{
            if (e.id == id){
              e.categories.push({   
                id: state.cates[index].categories.length + 1,
                name: "",
                kr_Name: '',
                note: '',
                products: []
            })
            }
          })  
    },
    createproductsCate (state, cate){
        state.cates.categories.products.push(cate)
    },
    changeCurrentcate (state, cate) {
        state.currentCate = cate
    },
    changeCurrentChilcate (state, cate) {
        state.currentCate = cate
    },
    deleteCate (state, delList) {
        delList.forEach(id => {
            state.cates.forEach( (cate, index) => {
                if (cate.id == id ) {
                    state.cates.splice(index, 1)
                }
            })
        })
    },
    deleteCategoriesCate (state, delList) {
        delList.forEach(id => {
            state.cates.categories.forEach( (cate, index) => {
                if (cate.id == id ) {
                    state.cates.categories.splice(index, 1)
                }
            })
        })
    },
    sortAscByName (state) {
        state.cates.sort( (a, b) => {
            var x = a.title.toLowerCase()
            var y = b.title.toLowerCase()
            if ( x < y) {return 1}
            if ( x > y) {return -1}
            return 0
          })
    },
    sortAscByChilName (state) {
        state.cates.chilcates.sort( (a, b) => {
            var x = a.title.toLowerCase()
            var y = b.title.toLowerCase()
            if ( x < y) {return 1}
            if ( x > y) {return -1}
            return 0
          })
    },
    sortDesByName (state) {
        state.cates.sort( (a, b) => {
            var x = a.title.toLowerCase()
            var y = b.title.toLowerCase()
            if ( x < y) {return 1}
            if ( x > y) {return -1}
            return 0
          })
        state.cates.reverse()
    },
    sortDesByChilName (state) {
        state.cates.chilcates.sort( (a, b) => {
            var x = a.title.toLowerCase()
            var y = b.title.toLowerCase()
            if ( x < y) {return 1}
            if ( x > y) {return -1}
            return 0
          })
        state.cates.categories.reverse()
    }
}

export default {
    namespaced: true,
    state,
    mutations
}