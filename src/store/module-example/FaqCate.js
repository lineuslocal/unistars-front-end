const state = {
    cates: [
        {
            id: 1,
            name: "Sample",
            kr_Name: 'Korean',
            note: `Synonymous`,
            categories: [
            {
                id: 1,
                name: 'Sample',
                kr_Name: 'Korea',
                note: 'Synonymous',
            }
            ],
                products: [
                    {
                    id: 1,
                    name: 'Sample',
                    kr_Name: 'Korea',
                    note: 'Synonymous',
                    }
            ]
        },
        {
            id: 2,
            name: "Beginning",
            kr_Name: 'Korean',
            note: `Antioxidant`,
            categories: [
                {
                id: 2,
                name: 'Beginning',
                kr_Name: 'ChilKorea',
                note: 'Antioxidant',
                }   
                ],
                products: [
                    {
                    id: 2,
                    name: 'Sample',
                    kr_Name: 'Korea',
                    note: 'Synonymous', 
                    }
                ]
        },
        { 
            id: 3,
            name: "Intermeditate",
            kr_Name: 'Korean',
            note: `Cell`,
            categories: [
                {
                    id: 3,
                    name: 'Intermeditate',
                    kr_Name: 'Korea',
                    note: 'Cell',
                }   
                ],
                products: [
                    {
                    id: 3,
                    name: 'Sample',
                    kr_Name: 'Korea',
                    note: 'Synonymous', 
                    }
                ]
        },
        { 
            id: 4,
            name: "Advanced",
            kr_Name: 'Korean',
            note: `Essentials`,
            categories: [
                {
                    id: 4,
                    name: 'Advanced',
                    kr_Name: 'Korea',
                    note: 'Essentials',
                }   
                ],
                products: [
                    {
                    id: 4,
                    name: 'Sample',
                    kr_Name: 'Korea',
                    note: 'Synonymous', 
                    }
                ]
        }
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
    saveCategoriesCate( state, changedcates ) {
        state.cates.categories.forEach(catego => {
            if ( catego.id ==  changedcates.id ) {
            catego.name = changedcates.name
            catego.kr_Name = changedcates.kr_Name
            catego.note = changedcates.note
            }
          })
    },
    createCate (state, cate) {
        state.cates.push(cate)    
    },
    createChilCate (state, cate) {
        state.cates.categories.push(cate)    
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

  