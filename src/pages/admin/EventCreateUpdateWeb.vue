<template>
  <q-page class="cus-layout">
    <div class="cus-title">
      <q-icon name="event_available"/>&nbsp;&nbsp;&nbsp;{{catalog.Name_event}}
    </div>
    <div class="cus-title-table">
      <q-icon name="event_available"/>&nbsp;&nbsp;&nbsp;{{catalog.Name_event}} - {{title}}
    </div>
    <q-form @submit="onSubmit" @reset="onReset" class="cus-form">
          <div class="row">

            <!-- main picture of event -->
            <div class="col-sm-3 col-12">
              <q-uploader
                url="http://localhost:4444/upload"
                label="Add main photo for 'Event'"
                style=" width: 100%; height:auto; "
                accept=".jpg, image/*"
              />
            </div>

            <!-- Input information of event -->
            <div class="offset-sm-1 col-sm-8 col-12 offset-0 row">
              <p class="col-sm-2 col-12 cus-text">Title*</p>
              <q-input
                class="col-sm-10 col-12"
                outlined
                v-model="event.title"
                dense
                lazy-rules
                placeholder="Enter Event's title"
                :rules="[ val =>  val !== null && val !== '' || 'Please type a name']"
              />
              <p class="col-sm-2 col-12 cus-text" >Place*</p>
              <q-input
                class="col-sm-10 col-12"
                outlined
                v-model="event.place"
                dense
                lazy-rules
                placeholder="Enter a Place"
                :rules="[ val =>val !== null && val !== '' || 'Please type a place']"
              />
              <p class="col-sm-2 col-12 cus-text">Personnel*</p>
              <q-input
                class="col-sm-10 col-12"
                outlined
                type="personnel"
                v-model="event.maxParticipant"
                dense
                placeholder="Enter a number of people who can apply"
                lazy-rules
                :rules="[
                  val => val !== null && val !== '' || 'Please type number',
                  val => val > 0  || 'number is not correct'
                ]"
              />
              <p class="col-sm-2 col-12 cus-text">Lecturer*</p>
              <q-input
                class="col-sm-10 col-12"
                outlined
                v-model="event.lecturer"
                dense
                lazy-rules
                placeholder="Enter lecturer' name"
                :rules="[ val => val !== null && val !== '' || 'Please type a place']"
              />
               <p class="col-sm-2 col-12 cus-text">Start Time*</p>
              <q-input class="col-sm-10 col-12" outlined dense v-model="event.startTime" style="margin-bottom:20px" placeholder="Enter Date and Time (YYYY-MM-DD HH:mm)">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-date v-model="event.startTime" mask="YYYY-MM-DD HH:mm" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-time v-model="event.startTime" mask="YYYY-MM-DD HH:mm" format12h />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
               <p class="col-sm-2 col-12 cus-text" >End Time*</p>
              <q-input class="col-sm-10 col-12" outlined dense v-model="event.endTime" style="margin-bottom:20px" placeholder="Enter Date and Time (YYYY-MM-DD HH:mm)">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-date v-model="event.endTime" mask="YYYY-MM-DD HH:mm" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-time v-model="event.endTime" mask="YYYY-MM-DD HH:mm" format12h />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
               <p class="col-sm-2 col-12 cus-text" >Deadline*</p>
              <q-input class="col-sm-10 col-12" dense outlined v-model="event.endRegTime" style="margin-bottom:20px" placeholder="Enter Date and Time (YYYY-MM-DD HH:mm)">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-date v-model="event.endRegTime" mask="YYYY-MM-DD HH:mm" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-time v-model="event.endRegTime" mask="YYYY-MM-DD HH:mm" format12h />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <div class="col-12 row flex justify-between" >
                <p class="col-7 cus-text">Need Additional Information?</p>
                <q-btn-toggle
                  style="height:37px;"
                  v-model="haveAddInfor"
                  toggle-color="primary"
                  :options="[
                      {label: 'Yes', value: 'yes'},
                      {label: 'No', value: 'no'},
                  ]"
                />
              </div>
              <q-item v-for="(infor, index) in event.addInfors" :key="index" style="padding:0;" class="col-12 row" v-if="haveAddInfor=='yes'">
                <q-input
                class="col-8"
                outlined
                v-model="infor.question"
                dense
                lazy-rules
                placeholder="Enter your question"
                :rules="[ val => val !== null && val !== '' || 'Please type something']"
                />
                <q-checkbox size="xs" v-model="infor.isRequired" label="required" style="height:40px; line-height:40px;"/>
                <q-btn flat round color="primary"  icon="add_circle" style="height:40px; line-height:40px;" v-if="!(index < event.addInfors.length -1)" @click="addMoreInfor"/>
                <q-btn flat round color="negative"  icon="remove_circle" style="height:40px; line-height:40px;" v-if="index < event.addInfors.length -1" @click="removeInfor(index)"/>
              </q-item>
              <div class="col-sm-2 col-12" style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">Description*</div>
              <q-input
                class="col-sm-10 col-12"
                outlined
                v-model="event.description"
                dense
                lazy-rules
                type="textarea"
                placeholder="Enter description for event (0/1500)"
                :rules="[ val => val !== null && val !== '' || 'Please type something']"
              />
            </div>

            <!-- picture of event -->
            <div class="col-12 row flex justify-between" style="margin-top: 30px">
                <q-uploader
                  class="col-sm-3 col-12"
                  url="http://localhost:4444/upload"
                  label="How to register"
                  accept=".jpg, image/*"
                />
                <q-uploader
                  class="col-sm-3 col-12"
                  url="http://localhost:4444/upload"
                  label="Attendance Guide"
                  accept=".jpg, image/*"
                />
                <q-uploader
                  class="col-sm-3 col-12"
                  url="http://localhost:4444/upload"
                  label="Lecturer Information"
                  accept=".jpg, image/*"
                />
            </div>

            <!-- survey -->
            <div class="col-12 row flex justify-between" style="margin-top: 30px">
              <p class="col-7 cus-text">Survey</p>
              <q-btn-toggle
                style="height:37px;"
                v-model="haveSurvey"
                toggle-color="primary"
                :options="[
                    {label: 'Yes', value: 'yes'},
                    {label: 'No', value: 'no'},
                ]"
                />
            </div>
             <!-- Question -->
            <q-item v-for="(survey, survey_index) in event.surveys" :key="survey_index" v-if="haveSurvey=='yes'" style="padding:0;" class="col-12">
              <div class="col-12 cus-question row">
                <p style="margin-bottom:10px">Question&nbsp; {{survey_index +1}} </p> <br/>
                <div class="col-12 row" style="padding-bottom: 0px">
                  <q-input
                    class="col-11"
                    outlined
                    v-model="survey.queSurvey"
                    dense
                    lazy-rules
                    placeholder="Enter your question"
                    :rules="[ val => val !== null && val !== '' || 'Please type something']"
                  />
                  <q-btn class="col-1" flat round color="primary"  icon="add_circle" style="height:40px; line-height:40px;" v-if="!(survey_index < event.surveys.length -1)" @click="addSurvey"/>
                  <q-btn class="col-1" flat round color="negative"  icon="remove_circle" style="height:40px; line-height:40px;" v-if="survey_index < event.surveys.length - 1" @click="removeSurvey(survey_index)"/>

                  <!-- selection -->
                  <div class="col-11 cus-selection">
                    <q-item v-for="(selection, index) in survey.selections" :key="index" style="padding: 0">
                      <p class="col-2" style="height:40px; line-height:40px; margin-bottom:0px">Selection&nbsp; {{index+1}}</p>
                      <q-input
                        class="col-9"
                        outlined
                        v-model="survey.selections[index]"
                        dense
                        lazy-rules
                        placeholder="Enter selection"
                        :rules="[ val => val !== null && val !== '' || 'Please type something']"
                      />
                      <q-btn class="col-1" flat round color="primary"  icon="add_circle" style="height:40px; line-height:40px;" v-if="!(index < survey.selections.length -1)" @click="addSelect(survey_index)"/>
                      <q-btn class="col-1" flat round color="negative"  icon="remove_circle" style="height:40px; line-height:40px;" v-if="index < survey.selections.length -1" @click="removeSelect(survey_index, index)"/>
                 
                    </q-item>
                  </div>
                </div>
              </div>
            </q-item>
          </div>

          <div class="text-center" style="margin-top:30px">
            <q-btn label="Save"  color="primary" v-if="role == 'edit'" @click="saveEvent" style="margin-right: 10px"/>
            <q-btn label="Create" type="submit" color="primary" v-if="role == 'create'" style="margin-right: 10px"/>
            <q-btn label="Cancel" type="reset" color="primary"/>
          </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "EventManager",
  
  data() {
    return {
      title: '',
      tab: "event",
      event: {
        id: 20,
        title: "",
        place: "",
        lecturer: "",
        maxParticipant: null,
        currentParticipant: null,
        startTime: "",
        endTime: "",
        startRegTime: "",
        endRegTime: "",
        price: 0,
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
    onSubmit() {
      var a = new Date()
      this.event.createdDate = a.getFullYear() + '-' 
                              + ( a.getMonth() + 1 < 10 ? '0' + (a.getMonth() + 1) : a.getMonth() +1 ) + '-'
                              + ( a.getDate() < 10 ? '0' + a.getDate() : a.getDate() ) + ' ' 
                              + ( a.getHours() < 10 ? '0' + a.getHours() : a.getHours() ) + ':' 
                              + ( a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes() )
      this.$store.commit('Event/createEvent', this.event)
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        timeout: 1000,
        message: "Create Event Successful"
      });
      this.event  = {
        id: this.event.id + 1,
        title: null,
        place: null,       
        lecturer: null,
        maxParticipant: null,
        currentParticipant: null,
        startTime: null,
        endTime: null,
        startRegTime: null,
        endRegTime: null,
        addInfors: [],
        surveys: [],
        description: null,
        photoEvent: null,
        photoHowToReg: null,
        photoAttGuide: null,
        photoLecInf: null
      }
    },
    onReset() {
      this.$q
          .dialog({
            title: "Alert",
            message:
              "Canceling will delete all entered values. Do you really want to cancel?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            this.$router.push("/admin/event/event-list/" + this.$route.params.cat_id)
          })
          .onCancel(() => {
            
          })
    },
    addMoreInfor() {
      this.event.addInfors.push({question: '', isRequired: false})
    },
    removeInfor( index ) {
      this.event.addInfors.splice(index, 1)
    },
    addSurvey() {
      this.event.surveys.push({queSurvey: "", selections: ["", ""]})
    },
    removeSurvey( survey_index ) {
      this.event.surveys.splice(survey_index, 1)
    },
    addSelect( survey_index ) {
      this.event.surveys[survey_index].selections.push("")
    },
    removeSelect( survey_index, index ) { 
      if ( this.event.surveys[survey_index].selections.length > 2 ) {
        this.event.surveys[survey_index].selections.splice(index, 1)
      }
      else {
        this.$q
          .dialog({
            title: "Alert",
            message:
              "Survey must to have least 2 selections, you cannot remove this selection",
            persistent: true,
          })
          .onOk(() => {
         
          })
      }
    },
    saveEvent() {
      this.$store.commit('Event/saveEvent', this.event)
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        timeout: 1000,
        message: "Edit Event Successful"
      });
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
    haveAddInfor: function(val) {
      if( val == 'yes' ) {
        if( this.event.addInfors === null || this.event.addInfors.length == 0){
          this.event.addInfors.push({question: '', isRequired: false})
        }
      }
    },
    haveSurvey: function(val) {
      if( val == 'yes') {
        if( this.event.surveys === null || this.event.surveys == 0){
          this.event.surveys.push({queSurvey: "", selections: ["", ""]})
        }
      }
    }
  },
  created() {
    if( this.$route.params.event_id === undefined) {
      this.title = 'Insert'
      this.role = 'create'
    }
    else {
      this.$store.state.Event.events.forEach(event => {
        if ( event.id == this.$route.params.event_id ) {
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
          event.addInfors.forEach( (e, index) => {
            this.event.addInfors.push({question: "", isRequired: false})
            this.event.addInfors[index].question = e.question
            this.event.addInfors[index].isRequired = e.isRequired
          })
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
        this.role = 'edit'
        this.title = 'Update'
    }
  }
}
</script>

<style scoped>
.cus-text{
  height: 40px;
  line-height: 40px;
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
   margin-top: 15px;
   padding: 10px 15px;
   border: 1px solid rgba(0, 0, 0, 0.12);
 }
 .cus-selection {
   padding: 10px 15px;
   border: 1px solid rgba(0, 0, 0, 0.12);

 }
 .cus-layout {
    margin-top:20px;
  }
</style>