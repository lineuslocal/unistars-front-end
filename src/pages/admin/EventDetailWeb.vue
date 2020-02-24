<template>
  <q-page class="cus-layout">
    <div class="cus-title">
      <q-icon name="event_available"/>&nbsp;&nbsp;&nbsp;{{catalog.Name_event}}
    </div>
    <div class="cus-title-table">
      <q-icon name="event_available"/>&nbsp;&nbsp;&nbsp;{{catalog.Name_event}} - {{title}}
    </div>
    <div class="cus-form">
          <div class="row">

            <!-- main picture of event -->
            <div class="col-sm-3 col-12">
              <p class="cus-text">Profile Picture</p>
              <img src="https://cdn.quasar.dev/img/avatar.png" style="width:100%">
            </div>

            <!-- Input information of event -->
            <div class="offset-sm-1 offset-0 col-sm-8 col-12 row">
              <p class="col-2 cus-text">Title</p>
              <p class="offset-1 col-9">{{event.title}}</p>
              <p class="col-2 cus-text" >Place</p>
              <p class="offset-1 col-9">{{event.place}}</p>
              <p class="col-2 cus-text">Personnel</p>
              <p class="offset-1 col-9">{{event.maxParticipant}}</p>
              <p class="col-2 cus-text">Lecturer</p>
              <p class="offset-1 col-9">{{event.lecturer}}</p>
              <p class="col-2 cus-text">Dates-Time</p>
              <p class="offset-1 col-9">{{event.startTime}} ~ {{event.endTime}}</p>
              <p class="col-2 cus-text" >Deadline</p>
              <p class="offset-1 col-9">{{event.endRegTime}}</p>
              <q-item v-for="(infor, index) in event.addInfors" :key="index" style="padding:0;" class="col-12" v-if="haveAddInfor=='yes'">
                <p class="col-2 cus-text" style="">Additional Information {{ index + 1 }}:</p>
                <p class="offset-1">{{infor.question}}<span v-if="infor.isRequired" style="color:red">&nbsp;(Required)</span></p>
              </q-item>
              <div class="col-2 cus-text">Description</div>
              <p class="offset-1 col-9">{{event.description}}</p>
              
            </div>

            <!-- picture of event -->
            <div class="col-12 row flex justify-between" style="margin-top: 30px">
              <div class="col-sm-3 col-12">
                <p class="cus-text">How to register</p>
                <img src="https://cdn.quasar.dev/img/avatar.png" style="width:100%">
              </div>
              <div class="col-sm-3 col-12">
                <p class="cus-text">Attendance Guide</p>
                <img src="https://cdn.quasar.dev/img/avatar.png" style="width:100%">
              </div>
              <div class="col-sm-3 col-12">
                <p class="cus-text">Lecturer Information</p>
                <img src="https://cdn.quasar.dev/img/avatar.png" style="width:100%">
              </div>
            </div>

            <!-- survey -->
            <p class="col-2 cus-text" style="margin-top: 30px" v-if="haveSurvey == 'yes'">Survey</p>
             <!-- Question -->
            <q-item v-for="(survey, survey_index) in event.surveys" :key="survey_index" v-if="haveSurvey=='yes'" style="padding:0;" class="col-12">
              <div class="col-12 cus-question row">
                <p class="cus-text" style="margin-bottom:10px">Question&nbsp; {{survey_index +1}} </p> <br/>
                <div class="col-12" style="padding-bottom: 0px">
                  <p style="padding-left:10px; margin-bottom:0px;">{{survey.queSurvey}}</p>
                 
                  <!-- selection -->
                  <div class="col-11 cus-selection">
                    <q-item dense v-for="(selection, index) in survey.selections" :key="index" style="padding: 0px;">
                      <q-radio size="xs" disable :label="survey.selections[index]" value="A" val=''/>
                    </q-item>
                  </div>
                </div>
              </div>
            </q-item>
          </div>

          <div class="text-center" style="margin-top:30px">
            <q-btn label="OK"  color="primary" :to="'/admin/event/list/' + this.$route.params.cat_id"/>
          </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "EventManager",
  
  data() {
    return {
      title: 'Detail',
      tab: "event",
      event: {
        id: 0,
        title: "",
        place: "",
        lecturer: "",
        maxParticipant: null,
        currentParticipant: null,
        startTime: "",
        endTime: "",
        endRegTime: "",
        addInfors: [],
        surveys: [],
        description: "",
        photoEvent: "",
        photoHowToReg: "",
        photoAttGuide: "",
        photoLecInf: "",
        createdDate: ""
      },
      haveAddInfor: "no",
      haveSurvey: "no",
      role: ''
    }
  },
  methods: {
   loadEvent(id) {
     this.$store.state.Event.events.forEach(event => {
      if ( event.id == id ) {
        this.event.id = event.id
        this.event.title = event.title
        this.event.place = event.place
        this.event.lecturer = event.lecturer
        this.event.maxParticipant = event.maxParticipant
        this.event.currentParticipant = event.currentParticipant
        this.event.startTime = event.startTime
        this.event.endTime = event.endTime
        this.event.startRegTime = event.startRegTime
        this.event.endRegTime = event.endRegTime
        this.event.addInfors = []
        event.addInfors.forEach( (e, index) => {
          this.event.addInfors.push({question: "", isRequired: false})
          this.event.addInfors[index].question = e.question
          this.event.addInfors[index].isRequired = e.isRequired
        })
        this.event.surveys = []
        event.surveys.forEach( (e, index) => {
          this.event.surveys.push({queSurvey: "", selections: []})
          this.event.surveys[index].queSurvey = e.queSurvey
          e.selections.forEach( (s, s_index) => {
            this.event.surveys[index].selections[s_index] = s
          })
        })
        this.event.description = event.description
        this.event.photoEvent = event.photoEvent
        this.event.photoHowToReg = event.photoHowToReg
        this.event.photoAttGuide = event.photoAttGuide
        this.event.photoLecInf = event.photoLecInf
        this.event.createdDate = event.createdDate

        if(this.event.addInfors.length > 0){
          this.haveAddInfor = 'yes'
        }
        if(this.event.surveys.length > 0){
          this.haveSurvey =  'yes'
        }
      }
    })
   }
  },
  computed: {
    catalog() {
      var a
      this.$store.state.Catalogue.catalog.forEach(e => {
        if( e.id == this.$route.params.cat_id) {
          a = e
        }
      })
      return a
    }
  },
  watch: {
    $route(to, from) {
      this.loadEvent(this.$route.params.event_id) 
    }
  },
  created() {
    this.loadEvent(this.$route.params.event_id) 
  },
}
</script>

<style scoped>
.cus-text{
 font-weight: bold;
}
 .cus-btn{
    width: 35px;
    height:35px; 
    margin-right: 12px;
    color: rgba(0, 0, 0, 0.12);
 }
 .cus-title-table{
   width: 100%;
   border: 1px solid rgba(0, 0, 0, 0.12);
   height: 48px;
   line-height: 48px;
   font-size: 18px;
   margin-top: 15px;
   padding-left: 15px;
 }
 .cus-title{
   font-size: 18px;
   font-weight: bold;
 }
 .cus-form{
   border: 1px solid rgba(0, 0, 0, 0.12);
   padding: 30px 15px;
 }
 .cus-col{
   padding-right: 15px;
 }
 .cus-question {
   padding: 10px 15px;
   border: 1px solid rgba(0, 0, 0, 0.12);
   margin-bottom: 10px;
 }
 .cus-selection {
   padding: 0px 20px;
 }
 .cus-layout {
    margin-top:20px;
  }
</style>