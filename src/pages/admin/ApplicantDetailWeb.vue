<template>
  <q-page style="margin-top:30px">
    <div class="cus-title-table">
      <q-icon name="perm_contact_calendar"/>&nbsp;&nbsp;&nbsp;Applicant - Update
    </div>
    <div class="cus-form">
      <div class="row">
        <!-- main picture of event -->
        <div class="col-sm-3 col-12 ">
            <p class="cus-text">Profile Picture</p>
            <img src="https://cdn.quasar.dev/img/avatar.png" style="width:100%; max-width:300px;">
        </div>

        <!-- Input information of event -->
        <div class="offset-sm-1 col-sm-8 offset-0 col-12 row">
          <p class="col-2 cus-text">Name</p>
          <p class="offset-1 col-9">{{applicant.name}}</p>
          <p class="col-2 cus-text" >Email</p>
          <p class="offset-1 col-9">{{applicant.email}}</p>
          <p class="col-2 cus-text">Phone No.</p>
          <p class="offset-1 col-9">{{applicant.phone}}</p>
          <p class="col-2 cus-text">Belongs</p>
          <p class="offset-1 col-9">{{applicant.belongs}}</p>
          <div class="col-11" style="border-bottom: 2px solid rgba(0, 0, 0, 0.12); margin-bottom:14px"></div>

          <q-item v-for="(infor, index) in applicant.addInfors" :key="index" style="padding:0;" class="col-12" v-if="haveAddInfor=='yes'">
            <p class="col-5 cus-text">{{infor.question}}<span v-if="infor.isRequired" >*</span></p>
            <p pclass="offset-1 col-6" >{{infor.answer}}</p>
          </q-item>
          
           <div class="col-11" style="border-bottom: 2px solid rgba(0, 0, 0, 0.12); margin-bottom:14px"></div>
        
           <p class="col-5 cus-text" >Number of tickets</p>
           <p class="offset-1 col-6">{{applicant.NumOfTicket}}</p>
           <p class="col-12 cus-text" style="margin-bottom:5px" >Pull Results</p>
          <q-item v-for="(survey, index) in applicant.surveys" :key="survey.id" class="col-12">
            <div style="width:100%">
              <p class="cus-text col-12" style="margin-bottom:5px">Q{{index + 1}}. {{survey.queSurvey}}</p>
              <p class="col-sm-6 col-12" style="padding-left:10px; margin-bottom: 0px">{{index + 1}}.&nbsp;{{survey.selected}}</p>
            </div>
          </q-item>
        </div>
      </div>
    </div>
    <div class="text-center" style="margin-top:15px">
        <q-btn label="OK"  color="primary" v-go-back.single/>
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
</style>