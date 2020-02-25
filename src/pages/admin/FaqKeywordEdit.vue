<template>
  <q-page class="cus-layout">
    <div class="cus-title">
      <q-icon name="keyboard"/>&nbsp;&nbsp;&nbsp;Keyword
    </div>
    <div class="cus-title-table">
      <q-icon name="keyboard"/>&nbsp;&nbsp;&nbsp;Keyword - {{title}}
    </div>
    <q-form @submit="onSubmit" @reset="onReset" class="cus-form">
          <div class="row">
            <!-- Input information of event -->
            <div class="offset-sm-1 col-sm-8 col-12 offset-0 row">
              <p class="col-sm-2 col-12 cus-text">Keyword *</p>
              <q-input
                class="col-sm-10 col-12"
                outlined
                v-model="faq.keyword"
                dense
                lazy-rules
                placeholder="Enter Keyword's"
                :rules="[ val =>  val !== null && val !== '' || 'Please type a name']"
              />
              <div class="col-sm-2 col-12" style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">Note*</div>
      <q-input
                class="col-sm-10 col-12"
                outlined
                v-model="faq.note"
                dense
                lazy-rules
                type="textarea"
                placeholder="Note ( For administrator)"
                :rules="[ val => val !== null && val !== '' || 'Please type something']"
              />
            </div>
          </div>
          <div class="text-right" style="margin-top:30px">
            <q-btn label="Save"  color="primary" v-if="role == 'edit'" @click="saveFaq" to="/admin/faq/Keyword/list"/>
            <q-btn style="margin-left: 15px" label="Cancel"  color="primary" to="/admin/faq/Keyword/list"/>
            <q-btn style="margin-left: 15px" label="Delete"  color="primary" @click="deleteFaq" to="/admin/faq/Keyword/list" />
          </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "FaqKeyword",
  
  data() {
    return {
      title: 'Update',
      tab: "faq",
      faq: {
        id: 20,
        keyword: "",
        maxParticipant: null,
        currentParticipant: null,
        note: "",
        createdDate: ""
      },
    }
  },
   methods: {
    onSubmit() {
      this.faq.createdDate = a.getFullYear() + '-' 
                              + ( a.getMonth() + 1 < 10 ? '0' + (a.getMonth() + 1) : a.getMonth() +1 ) + '-'
                              + ( a.getDate() < 10 ? '0' + a.getDate() : a.getDate() ) + ' ' 
                              + ( a.getHours() < 10 ? '0' + a.getHours() : a.getHours() ) + ':' 
                              + ( a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes() )
      this.$store.commit('Faq/createFaq', this.faq)
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "done",
        timeout: 1000,
        message: "Create Keyword Successfull"
      });
      this.faq  = {
        id: this.faq.id + 1,
        keyword: null,
        maxParticipant: null,
        currentParticipant: null,
        note: null,
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
            this.$router.push("/admin/faq/Keyword/list")
          })
          .onCancel(() => {
            
          })
    },
    saveFaq() {
      this.$store.commit('Faq/saveFaq', this.faq)
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "done",
        timeout: 1000,
        message: "Edit Keyword Successfull"
      });
    },
    deleteFaq() {
       this.$store.commit("Faq/deleteFaq",[this.faq.id])
       this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "done",
        timeout: 1000,
        message: "Delete Keyword Successfull"
      });
    }
  },
  computed: {},
  created() {
    if( this.$route.params.id === undefined) {
      this.keyword = 'Insert'
      this.role = 'create'
    }
    else {
      this.$store.state.Faq.faqs.forEach(faq => {
        if ( faq.id == this.$route.params.id ) {
          this.faq.id = faq.id
          this.faq.keyword = faq.keyword
          this.faq.maxParticipant = faq.maxParticipant
          this.faq.currentParticipant = faq.currentParticipant
          this.faq.note = faq.note
          this.faq.createdDate = faq.createdDate
        }
      })
        this.role = 'edit'
        this.keyword = 'Update'
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