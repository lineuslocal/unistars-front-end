const state = {
    events: [{
        id: 1,
        idUser: 1,
        userName: "An",
        eventName: "<Seoul> Success Core 5th Core 5th Core",
        eventAddress: "Seoul",
        eventImg: "/statics/img/eventPic1.jpg",
        startDate: "2020-03-02 12:30",
        endDate: "2020-03-04 12:30",
        createDate: "2020-03-01 12:00",
        ticketQuan: 1,
        addInfor: [{
            question: "How old are you?",
            isRequired: true,
            answer: "18"
          },
          {
            question: "How long do you spend to exercise in every weekend?",
            isRequired: false,
            answer: "30 minutes"
          },
          {
            question: "what is your weight?",
            isRequired: true,
            answer: "100 kgs"
          },
        ],
        surveys: [{
            queSurvey: "How do you think about the event?",
            selections: ["good", "normal", "bad"],
            selected: ""
          },
          {
            queSurvey: "Your satisfaction level?",
            selections: ["good", "normal", "bad"],
            selected: ""
          }
        ],
        status: "registered"
      },
      {
        id: 2,
        idUser: 1,
        userName: "An",
        eventName: "<HCM> Success Core 1th Core 1th Core",
        eventAddress: "HCM",
        eventImg: "/statics/img/eventPic2.jpg",
        startDate: "2020-01-02 12:30",
        endDate: "2020-01-04 12:30",
        createDate: "2020-01-01 12:00",
        ticketQuan: 1,
        addInfor: [

        ],
        status: "missed"
      },
      {
        id: 3,
        idUser: 1,
        userName: "An",
        eventName: "<New York> Success Core 2th Core 2th Core",
        eventAddress: "New York",
        eventImg: "/statics/img/eventPic3.jpg",
        startDate: "2019-01-02 12:30",
        endDate: "2019-01-04 12:30",
        createDate: "2020-01-01 12:00",
        ticketQuan: 1,
        addInfor: [{
            question: "How old are you?",
            isRequired: true,
            answer: "18"
          },
          {
            question: "How long do you spend to exercise in every weekend?",
            isRequired: false,
            answer: "30 minutes"
          },
          {
            question: "what is your weight?",
            isRequired: true,
            answer: "100 kgs"
          },
          {
            question: "How old are you?",
            isRequired: true,
            answer: "18"
          },
          {
            question: "How long do you spend to exercise in every weekend?",
            isRequired: false,
            answer: "30 minutes"
          },
          {
            question: "what is your weight?",
            isRequired: true,
            answer: "100 kgs"
          },
        ],
        status: "completed"
      },
      {
        id: 4,
        idUser: 1,
        userName: "An",
        eventName: "<India> Success Core 3th Core 3th Core",
        eventAddress: "India",
        eventImg: "/statics/img/eventPic4.jpg",
        startDate: "2020-04-03 12:30",
        endDate: "2020-04-03 12:30",
        createDate: "2020-02-01 12:00",
        ticketQuan: 1,
        addInfor: [{
          question: "How old are you?",
          isRequired: true,
          answer: "18"
        }],
        surveys: [{
            // label: "Very good", value: "good"
            queSurvey: "How do you think about the event?",
            selections: ["good", "normal", "bad"],
            selected: ""
          },
          {
            // label: "Normal", value: "narmal"
            queSurvey: "Your satisfaction level?",
            selections: ["good", "normal", "bad"],
            selected: ""
          },
          {
            // label: "Not so good", value: "not good"
            queSurvey: "Will you registed again for next time?",
            selections: ["yes", "thinking", "no"],
            selected: ""
          }
        ],
        status: "registered"
      },
      {
        id: 5,
        idUser: 1,
        userName: "An",
        eventName: "<Seoul> Success Core 5th Core 5th Core",
        eventAddress: "Seoul",
        eventImg: "/statics/img/eventPic5.jpg",
        startDate: "2019-12-02 12:30",
        endDate: "2019-12-04 12:30",
        createDate: "2019-11-01 12:00",
        ticketQuan: 1,
        addInfor: [{
            question: "How old are you?",
            isRequired: true,
            answer: "18"
          },
          {
            question: "How long do you spend to exercise in every weekend?",
            isRequired: false,
            answer: "30 minutes"
          },
        ],
        status: "completed"
      },
      {
        id: 6,
        idUser: 1,
        userName: "An",
        eventName: "<Seoul> Success Core 5th Core 5th Core",
        eventAddress: "Seoul",
        eventImg: "/statics/img/eventPic1.jpg",
        startDate: "2019-12-02 12:30",
        endDate: "2019-12-04 12:30",
        createDate: "2019-11-01 12:00",
        ticketQuan: 1,
        addInfor: [{
            question: "How old are you?",
            isRequired: true
          },
          {
            question: "How long do you spend to exercise in every weekend?",
            isRequired: true
          },
          {
            question: "what is your weight?",
            isRequired: true
          }
        ],
        status: "completed"
      },
      {
        id: 7,
        idUser: 1,
        userName: "An",
        eventName: "<Seoul> Success Core 5th Core 5th Core",
        eventAddress: "Seoul",
        eventImg: "/statics/img/eventPic2.jpg",
        startDate: "2020-03-02 12:30",
        endDate: "2020-03-03 12:30",
        createDate: "2020-01-01 12:00",
        ticketQuan: 1,
        addInfor: [{
            question: "How old are you?",
            isRequired: true
          },
          {
            question: "How long do you spend to exercise in every weekend?",
            isRequired: true
          },
          {
            question: "what is your weight?",
            isRequired: true
          }
        ],
        status: "registered"
      }
    ]
}
const mutations = {
    createEvent (state, event) {
        state.events.push(event)
        state.events.forEach(element => {
            console.log(element)
        });
        
    },
    changeCurrentEvent (state, event) {
        state.currentEvent = event
    },
    deleteEvent (state) {
            state.events.forEach( (event, index) => {
                if (event.id == id ) {
                    state.events.splice(index, 1)
                }
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
           return parseInt(a.startDate.split('-').join('')) - parseInt(b.startDate.split('-').join(''))
        })
    },
    sortDesByDate (state) {
        state.events.sort( (a, b) => {
           return parseInt(b.startDate.split('-').join('')) - parseInt(a.startDate.split('-').join(''))
        })
    },
    sortDesByNewest (state) {
      state.events.sort((a, b) => {
        return parseInt(b.createDate.split('-').join('')) - parseInt(a.createDate.split('-').join(''))
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

  