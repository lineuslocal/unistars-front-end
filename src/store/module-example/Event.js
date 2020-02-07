const state = {
    events: [
        { 
            id: 1,
            name: "<Busan> Success Core 5th Recruitment",
            place: "Busan",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 30,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            startRegTime: "2020-09-01 00:00",
            endRegTime: "2020-09-28 23:59",
            price: 0,
            addInfor: [
                
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-28",
        },
        { 
            id: 2,
            name: "<Seoul> Success Core 5th Recruitment",
            place: "Busan",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 0,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            startRegTime: "2020-09-01 00:00",
            endRegTime: "2020-09-28 23:59",
            price: 25000,
            addInfor: [
                { question: "How old are you?", isRequired: true },
                { question: "How long do you spend to exercise in every weekend?", isRequired: true },
                { question: "what is your weight?", isRequired: true }
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-16",
        },
        { 
            id: 3,
            name: "<Osaka> Success Core 5th Recruitment",
            place: "Busan",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 30,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            startRegTime: "2020-09-01 00:00",
            endRegTime: "2020-09-28 23:59",
            price: 0,
            addInfor: [
                { question: "How old are you?", isRequired: true },
                { question: "How long do you spend to exercise in every weekend?", isRequired: true },
                { question: "what is your weight?", isRequired: true }
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-17",
        },
        { 
            id: 4,
            name: "<Tokyo> Success Core 5th Recruitment",
            place: "Busan",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 0,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            startRegTime: "2020-09-01 00:00",
            endRegTime: "2020-09-28 23:59",
            price: 25000,
            addInfor: [
                { question: "How old are you?", isRequired: true },
                { question: "How long do you spend to exercise in every weekend?", isRequired: true },
                { question: "what is your weight?", isRequired: true }
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-18",
        },
        { 
            id: 5,
            name: "<Tokyo> Success Core 5th Recruitment",
            place: "Busan",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 0,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            startRegTime: "2020-09-01 00:00",
            endRegTime: "2020-09-28 23:59",
            price: 25000,
            addInfor: [
                { question: "How old are you?", isRequired: true },
                { question: "How long do you spend to exercise in every weekend?", isRequired: true },
                { question: "what is your weight?", isRequired: true }
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-18",
        }
    ],
    currentEvent: {}
}
const mutations = {
    saveEvent( state, changedEvent ) {
        state.events.forEach(event => {
            if ( event.id ==  changedEvent.id ) {
              event.name = changedEvent.name
              event.place = changedEvent.place
              event.lecturer = changedEvent.lecturer
              event.maxParticipant = changedEvent.maxParticipant
              event.currentParticipant = changedEvent.currentParticipant
              event.startTime = changedEvent.startTime
              event.endTime = changedEvent.endTime
              event.startRegTime = changedEvent.startRegTime
              event.endRegTime = changedEvent.endRegTime
              event.price = changedEvent.price
              event.addInfor = []
              changedEvent.addInfor.forEach( e => {
                event.addInfor.push(e)
              })
              event.description = changedEvent.description
              event.photoEvent = changedEvent.photoEvent
              event.photoHowToReg = changedEvent.photoHowToReg
              event.photoAttGuide = changedEvent.photoAttGuide
              event.photoLecInf = changedEvent.photoLecInf
              event.createdDate = changedEvent.createdDate
            }
          })
    },
    createEvent (state, event) {
        state.events.push(event)
        state.events.forEach(element => {
            console.log(element)
        });
        
    },
    changeCurrentEvent (state, event) {
        state.currentEvent = event
    },
    deleteEvent (state, delList) {
        delList.forEach(id => {
            state.events.forEach( (event, index) => {
                if (event.id == id ) {
                    state.events.splice(index, 1)
                }
            })
        })
    },
    sortAscByName (state) {
        state.events.sort( (a, b) => {
            var x = a.name.toLowerCase()
            var y = b.name.toLowerCase()
            if ( x < y) {return 1}
            if ( x > y) {return -1}
            return 0
          })
    },
    sortDesByName (state) {
        state.events.sort( (a, b) => {
            var x = a.name.toLowerCase()
            var y = b.name.toLowerCase()
            if ( x < y) {return 1}
            if ( x > y) {return -1}
            return 0
          })
        state.events.reverse()
    },
    sortAscByDate (state) {
        state.events.sort( (a, b) => {
           return  parseInt(a.createdDate.split('-').join('')) -  parseInt(b.createdDate.split('-').join(''))
        })
    },
    sortDesByDate (state) {
        state.events.sort( (a, b) => {
           return  parseInt(b.createdDate.split('-').join('')) -  parseInt(a.createdDate.split('-').join(''))
        })
    },
    sortAscByCurParticipant (state) {
        state.events.sort( (a, b) => {
            return a.currentParticipant - b.currentParticipant
        } )
    },
    sortDesByCurParticipant (state) {
        state.events.sort( (a, b) => {
            return b.currentParticipant - a.currentParticipant
        } )
    }
}

export default {
    namespaced: true,
    state,
    mutations
}

  