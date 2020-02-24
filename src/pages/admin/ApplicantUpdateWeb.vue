<template>
  <q-page style="margin-top:30px">
    <div class="cus-title-table">
      <q-icon name="perm_contact_calendar"/>&nbsp;&nbsp;&nbsp;Applicant - Update
    </div>
    <q-form @submit="onSubmit" @reset="onReset" class="cus-form">
      <div class="row">
        <!-- main picture of event -->
        <div class="col-sm-3 col-12 ">
            <p class="cus-text">Profile Picture</p>
            <div class="text-center">
              <img src="https://cdn.quasar.dev/img/avatar.png" class="cus-avatar">
            </div>
        </div>

        <!-- Input information of event -->
        <div class="offset-sm-1 col-sm-8 offset-0 col-12 row">
          <div style="max-width: 700px" class="row">
            <p class="col-2 text-bold">Name</p>
            <p class="offset-1 col-9">{{applicant.name}}</p>
            <p class="col-2 text-bold" >Email</p>
            <p class="offset-1 col-9">{{applicant.email}}</p>
            <p class="col-2 text-bold">Phone No.</p>
            <p class="offset-1 col-9">{{applicant.phone}}</p>
            <p class="col-2 text-bold">Belongs</p>
            <p class="offset-1 col-9">{{applicant.belongs}}</p>
          </div>
          <div v-if="applicant.addInfors.length > 0" style="margin-bottom:16px; width:100%; max-width: 700px" >
            <div class="col-11" style="border-bottom: 2px solid rgba(0, 0, 0, 0.12); margin-bottom:14px"></div>
            <q-item v-for="infor in applicant.addInfors" :key="infor.question" style="padding:0; " class="col-12 " >
              <p class="col-5 text-bold">{{infor.question}}<span v-if="infor.isRequired" >*</span></p>
              <q-input dense class="offset-1 col-6" outlined v-model="infor.answer"></q-input>
              <!-- <q-input dense class="offset-1 col-6" outlined v-model="applicant.name"></q-input>
              <q-input dense class="offset-1 col-6" outlined v-model="infor.answer" lazy-rules placeholder="Enter your question" :rules="[ val => val !== null && val !== '' || 'Please type something']"></q-input> -->
            </q-item>
          </div>
          <div style="margin-bottom:16px; width: 100%; max-width: 700px; " class="col-12 row" >
            <div class="col-12" style="border-bottom: 2px solid rgba(0, 0, 0, 0.12); margin-bottom:14px;"></div>
            <p class="col-5 text-bold" >Number of tickets</p>
            <p class="offset-1 col-6">{{applicant.NumOfTicket}}</p>
            <p class="col-12 text-bold" style="margin-bottom:5px" v-if="applicant.surveys.length > 0">Pull Results</p>
            <q-item v-for="(survey, index) in applicant.surveys" :key="survey.id" class="col-12">
              <div style="width:100%">
                <p class="text-bold col-12" style="margin-bottom:5px">Q{{index + 1}}. {{survey.queSurvey}}</p>
                <q-select dense outlined v-model="survey.selected" :options="survey.selections" class="col-sm-6 col-12"/>
              </div>
            </q-item>
          </div>
        </div>
      </div>
    </q-form>
    <div class="text-center" style="margin-top:15px">
        <q-btn label="Save"  color="primary" style="margin-right:10px" @click="saveApplicant"/>
        <q-btn label="Cancel"  color="primary" @click="alertCancel"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "EventManager",
  
  data() {
    return {
      applicant: {
        id: 0,
        name: '',
        email: '',
        phone:'',
        belongs: '',
        appliedDate: '',
        orderNo: 0,
        state: '',
        NumOfTicket: 1,
        addInfors: [],
        surveys:[]
      },
      haveAddInfor: 'no',
      haveSurvey: 'no'
    }
  },
  methods: {
    onSubmit(){

    },
    onReset() {

    },
   loadApplicant(id) {
     this.$store.state.Applicant.applicants.forEach(applicant => {
      if ( applicant.id == id ) {
        this.applicant.id = id
        this.applicant.name = applicant.name
        this.applicant.email = applicant.email
        this.applicant.phone = applicant.phone
        this.applicant.belongs = applicant.belongs
        this.applicant.appliedDate = applicant.appliedDate
        this.applicant.orderNo = applicant.orderNo
        this.applicant.state = applicant.state
        this.applicant.NumOfTicket = applicant.NumOfTicket

        this.applicant.addInfors = []
        applicant.addInfors.forEach( (a, index) => {
          this.applicant.addInfors.push({question: "", isRequired: false})
          this.applicant.addInfors[index].question = a.question
          this.applicant.addInfors[index].isRequired = a.isRequired
          this.applicant.addInfors[index].answer = a.answer
        })
        this.applicant.surveys = []
        applicant.surveys.forEach( (e, index) => {
          this.applicant.surveys.push({queSurvey: "", selections: [], selected: ""})
          this.applicant.surveys[index].queSurvey = e.queSurvey
          e.selections.forEach( (s, s_index) => {
            this.applicant.surveys[index].selections[s_index] = s
          })
          this.applicant.surveys[index].selected = e.selected
        })
        if(this.applicant.addInfors.length > 0){
          this.haveAddInfor = 'yes'
        }
        if(this.applicant.surveys.length > 0){
          this.haveSurvey =  'yes'
        }
      }
    })
   },
   alertCancel(){
    this.$q
      .dialog({
        title: "Alert",
        message:
          "Canceling will delete all entered values. Do you really want to cancel?",
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        this.$router.push("/admin/event/list/" + this.$route.params.cat_id + "/applicant/list/" + this.$route.params.event_id)
      })
   },
   saveApplicant(){
     this.$store.commit('Applicant/saveApplicant', this.applicant)
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        timeout: 1000,
        message: "Update Applicant Successful"
      });
   }
  },
  computed: {},
  watch: {
    $route(to, from) {
      this.loadApplicant(this.$route.params.applicant_id) 
    }
  },
  created() {
    this.loadApplicant(this.$route.params.applicant_id) 
  },
}
</script>

<style scoped>
.cus-text-infor{
 /* height: 40px;
 line-height: 40px; */
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
   padding: 30px 15px 15px 15px;
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
 .cus-avatar{
   width:100%; 
   max-width:300px;
 }
 @media only screen and (max-width: 700px) {
    .cus-avatar{
      max-width:200px;
      margin-bottom: 20px;
    }
  }
</style>