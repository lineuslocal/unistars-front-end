<template>
  <q-page class="cus-layout">
    <div class="cus-title">
      <q-icon name="keyboard"/>&nbsp;&nbsp;&nbsp;Keyword 
    </div>
    <div class="cus-title-table">
      <q-icon name="keyboard"/>&nbsp;&nbsp;&nbsp; Keyword - {{title}}
    </div>
    <div class="cus-form">
      <div class="row">
        <!-- Input information of event -->
        <div class="offset-sm-1 offset-0 col-sm-8 col-12 row">
          <p class="col-2 cus-text">Keyword</p>
          <p class="offset-1 col-9">{{faq.keyword}}</p>
          <p class="col-2 cus-text">Reg.Date</p>
          <p class="offset-1 col-9">{{faq.createdDate}}</p>
          <p class="col-6 cus-text">Note ( For administrator )</p>
          <p class="offset-1 col-9">{{faq.note}} </p>
        </div> 
      </div>
      <div class="text-right" style="margin-top:70px">
        <q-btn  label="List"  color="primary" to="/admin/faq/keyword/list"/>
          <q-btn style="margin-left: 15px" label="Update"  color="primary" :to="'/admin/faq/Keyword/edit/' + faq.id"   />
          <q-btn style="margin-left: 15px" label="Delete"  color="primary" @click="deleteFaq"/>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "FaqKeyword",
  data() {
    return {
      title: 'Detail',
      tab: "faq",
      faq: {
        id: 0,
        keyword: "",
        note: "",
        createdDate: ""
      },
    }
  },
  methods: {
   loadFaq(id) {
     this.$store.state.Faq.faqs.forEach(faq => {
      if ( faq.id == id ) {
        this.faq.id = faq.id
        this.faq.keyword = faq.keyword
        this.faq.note = faq.note
        this.faq.createdDate = faq.createdDate
      }
    })
   },
    deleteFaq() {
      var delList = [];
      this.canDelFaq.forEach(faq => {
        if (faq.chosen == true) {
          delList.push(faq.id);
        }
      });
      if (delList.length > 0) {
        if (delList.length > 1) {
          var text = delList.length + "faqs";
        } else {
          var text = delList.length + "faqs";
        }
      
      this.$q
      .dialog({
           title: "Alert",
            message:
              "if you delete, you cannot find it again. Do you really want to delete " +
              text,
            cancel: true,
            persistent: true
      })
      .onOk(() =>{
        this.$store.commit("Faq/deleteFaq", delList);
        this.canDelFaq = [];
      })
      .onCancel(() =>{
      });
      } else {
        this.$q
          .dialog({
            title: "Alert",
            message: "Please check event that you want to delete",
            persistent: true
          })
          .onOk(() => {})
      } 
    },
     deleteFaq() {
       this.$store.commit("Faq/deleteFaq",[this.faq.id])
    }
  },
  computed: {},
  watch: {
    $route(to, from) {
      this.loadFaq(this.$route.params.id) 
    }
  },
  created() {
    this.loadFaq(this.$route.params.id) 
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