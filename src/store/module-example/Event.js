const state = {
    events: [
        { 
            id: 1,
            title: "<Busan> Success Core 5th Recruitment",
            place: "Busan",
            lecturer: "James Gosling",
            maxParticipant: 40,
            currentParticipant: 0,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            endRegTime: "2020-09-28 23:59",
            addInfors: [
                { question: "How old are you?", isRequired: true },
                { question: "How long do you spend to exercise in every weekend?", isRequired: true },
                { question: "what is your weight?", isRequired: false }
            ],
            surveys: [
                {queSurvey: "Your satisfaction level?", selections: ["good", "normal", "bad"]},
                {queSurvey: "Your satisfaction level?", selections: ["good", "normal", "bad"]},
                {queSurvey: "Your satisfaction level?", selections: ["good", "normal", "bad"]}
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-28 11:00",
            catalog_id: 999999
        },
        { 
            id: 2,
            title: "<Tokyo> Success Core 5th Recruitment",
            place: "Busan",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 30,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            endRegTime: "2020-09-28 23:59",
            addInfors: [
              
            ],
            surveys: [
               
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-30 13:20",
        },
        { 
            id: 3,
            title: "<Chuncheon> Success Core 5th Recruitment",
            place: "Chuncheon",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 30,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            endRegTime: "2020-09-28 23:59",
            addInfors: [
              
            ],
            surveys: [
               
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-30 13:20",
        },
        { 
            id: 4,
            title: "<Daegu> Success Core 5th Recruitment",
            place: "Daegu",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 0,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            endRegTime: "2020-09-28 23:59",
            addInfors: [
              
            ],
            surveys: [
               
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-30 13:20",
        },
        { 
            id: 5,
            title: "<Gimcheon> Success Core 5th Recruitment",
            place: "Gimcheon",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 0,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            endRegTime: "2020-09-28 23:59",
            addInfors: [
              
            ],
            surveys: [
               
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-30 13:20",
        },
        { 
            id: 6,
            title: "<Gwangju> Success Core 5th Recruitment",
            place: "Gwangju",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 0,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            endRegTime: "2020-09-28 23:59",
            addInfors: [
              
            ],
            surveys: [
               
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-30 13:20",
        },
        { 
            id: 7,
            title: "<Icheon> Success Core 5th Recruitment",
            place: "Icheon",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 30,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            endRegTime: "2020-09-28 23:59",
            addInfors: [
              
            ],
            surveys: [
               
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-30 13:20",
        },
        { 
            id: 8,
            title: "<Jeju> Success Core 5th Recruitment",
            place: "Jeju",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 30,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            endRegTime: "2020-09-28 23:59",
            addInfors: [
              
            ],
            surveys: [
               
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-30 13:20",
        },
        { 
            id: 9,
            title: "<Namwon> Success Core 5th Recruitment",
            place: "Namwon",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 30,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            endRegTime: "2020-09-28 23:59",
            addInfors: [
              
            ],
            surveys: [
               
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-30 13:20",
        },
        { 
            id: 10,
            title: "<Seoul> Success Core 5th Recruitment",
            place: "Seoul",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 0,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            endRegTime: "2020-09-28 23:59",
            addInfors: [
              
            ],
            surveys: [
               
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-30 13:20",
        },
        { 
            id: 11,
            title: "<Ulsan> Success Core 5th Recruitment",
            place: "Ulsan",
            lecturer: "James Gosling",
            maxParticipant: 50,
            currentParticipant: 0,
            startTime: "2020-10-30 08:30",
            endTime: "2020-10-30 11:30",
            endRegTime: "2020-09-28 23:59",
            addInfors: [
              
            ],
            surveys: [
               
            ],
            description: `Open the evening with a brief welcome and thank all the people and organizations who helped
            put this event together. If cast/crew members are in attendance be sure to mention that there will"
            be a Q&A following the screening`,
            photoEvent: "/statics/img/event.jpg",
            photoHowToReg: "",
            photoAttGuide: "",
            photoLecInf: "",
            createdDate: "2020-08-30 13:20",
        }
    ],
    currentEvent: {}
}
const mutations = {
    saveEvent( state, changedEvent ) {
        state.events.forEach(event => {
            if ( event.id ==  changedEvent.id ) {
              event.title = changedEvent.title
              event.place = changedEvent.place
              event.lecturer = changedEvent.lecturer
              event.maxParticipant = changedEvent.maxParticipant
              event.currentParticipant = changedEvent.currentParticipant
              event.startTime = changedEvent.startTime
              event.endTime = changedEvent.endTime
              event.startRegTime = changedEvent.startRegTime
              event.endRegTime = changedEvent.endRegTime
              event.price = changedEvent.price
              event.addInfors = []
              changedEvent.addInfors.forEach( e => {
                event.addInfors.push(e)
              })
              event.surveys = []
              changedEvent.surveys.forEach( e => {
                event.surveys.push(e)
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
            var x = a.title.toLowerCase()
            var y = b.title.toLowerCase()
            if ( x < y) {return 1}
            if ( x > y) {return -1}
            return 0
          })
    },
    sortDesByName (state) {
        state.events.sort( (a, b) => {
            var x = a.title.toLowerCase()
            var y = b.title.toLowerCase()
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

  