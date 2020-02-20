<template>
  <q-page style="margin-top:30px">
          <div class="cus-title">
            <q-icon name="collections_bookmark" />&nbsp;&nbsp;&nbsp;Category
          </div>
          <div class="cus-title-table">
            <q-icon name="collections_bookmark" />&nbsp;&nbsp;&nbsp; {{Name}} - List
          </div>
          <div class="cus-container">
            <div class="row">
    <q-list bordered class="col-2">
      <q-item-label header  >
          <div>
                <q-btn color="white" text-color="black" icon="sync" class="cus-btn"/>
                <q-btn
                  v-model="currentcates"
                  @click="add"
                  color="white"
                  text-color="black"
                  icon="add"
                  style="width:35px; height:35px; margin-right: 12px;"
                />
                <q-btn
                  color="white"
                  text-color="black"
                  icon="delete"
                  style="width:35px; height:35px"
                />
              </div>
              <br>
                <q-input dense outlined v-model="filterFaq" placeholder="Type to filter">
                <template v-slot:append>
                </template>
              </q-input>
      </q-item-label>
      <q-item tag="label" v-for="cate in cates" >
        <q-item-section avatar>
   <q-checkbox size="md" v-model="del"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{cate}}</q-item-label>
        </q-item-section>
        <q-btn round flat  icon="add" />
      </q-item>
    </q-list>
      <div class="row offset-2 col-6">
          <p class="col-sm-3 col-12 cus-text"> Category Name * </p>
            <div class="offset-sm-0 col-sm-12 col-10 offset-0 row">
              <p class="col-sm-2 col-12 cus-text text-center">English </p>
              <br>
              <q-input
                class="col-sm-10 col-12"
                outlined
                dense
                lazy-rules
                placeholder="Category Name"
                :rules="[ val =>  val !== null && val !== '' || 'Please type a name']"
              />
              <br>
              <p class="col-sm-2 col-12 cus-text text-center">Korean</p>
               <q-input
                class="col-sm-10 col-12"
                outlined
                dense
                lazy-rules
                placeholder="Category Name"
                :rules="[ val =>  val !== null && val !== '' || 'Please type a name']"
              />
              <div class="col-sm-5 col-12" style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">Note ( For administrator)*</div>
              <q-input
                class="col-sm-12 col-12"
                outlined
                dense
                lazy-rules
                type="textarea"
                placeholder="Note ( For administrator)"
                :rules="[ val => val !== null && val !== '' || 'Please type something']"
              />
            </div>
            </div>
  </div>
  </div>
    <div class="text-right" style="margin-top:30px">
            <q-btn label="Save"  color="primary" />
          </div>
            <br>    
  </q-page>
</template>

<script>
export default {
  name: "FaqCategory",
  data() {
    return {
      temp:[],
      Name: 'Category',
      current: 1,
      tab: 'Category',
      filterFaq: "",
      canDelFaq: [],
      del: false,
      cates: [''],
      currentcates: ''
    };
  },
  computed: {
   faqs() {
     this.canDelFaq = [];
     this.$store.state.Faq.faqs
     .filter(faq => {
       return(
         faq.keyword.toLowerCase().match(this.filterFaq.toLowerCase())
       );
     })
     .forEach(element => {
       if (element.currentParticipant > 0) {
         this.canDelFaq.push({
         id: element.id,
         canDel: true,
         chosen: false
       });
       }else {
         this.canDelFaq.push({
           id: element.id,
           canDel: true,
           chosen: false
         })
       }
     });
     return this.$store.state.Faq.faqs.filter(faq => {
       return (
         faq.keyword.toLowerCase().match(this.filterFaq.toLowerCase())
       );
     });
   }
  },
  methods: {
   add: function(){
     this.cates.push(this.currentcates)
     this.currentcates = ''
   },
    deleteFaq() {
      var delList = [];
      this.canDelFaq.forEach(faq => {
        if (faq.chosen == true) {
          delList.push(faq.id);
        }
      });
      console.log (delList)
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
        console.log(">>>> Ok");
        console.log(delList);
        this.$store.commit("Faq/deleteFaq", delList);
        this.canDelFaq = [];
      })
      .onCancel(() =>{
        console.log(">>>> Cancel");
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
     sortByKeyword() {
       if (this.sortkey == "ascending") {
         this.$store.commit("Faq/sortAscByName");
         this.sortkey = "descending";
       }else {
         this.$store.commit("Faq/sortDesByName");
         this.sortkey = "ascending";
       }
     },
     sortByDate() {
       if (this.sortDate == "ascending") {
         this.$store.commit("Faq/sortAscByDate");
         this.sortDate = "ascending";
       }
     },
     sortByOrder() {
        if (this.sortOrder == 'ascending') {
        this.$store.commit('Applicant/sortAscByOrder')
        this.sortOrder = 'descending'
      }
      else{
        this.$store.commit('Applicant/sortDesByOrder')
        this.sortOrder = 'ascending'
      }
     },
     toFaqDetail( id ) {
      this.$router.push('/admin/faq-detail/' + id)
    },
      alertUpdate(index) {
      this.$q
          .dialog({
            title: "Alert",
            message:
              `You cannot update this event because there 
              ${this.faqs[index].currentParticipant > 1 ? 'are ' : 'is '} 
              ${this.faqs[index].currentParticipant}
              ${this.faqs[index].currentParticipant > 1 ? ' persons' : ' person'} applied.`,
            persistent: true,
          })
    }
  },
  watch: {
    del: function(val) {
      if (val == true) {
        this.canDelFaq.forEach(faq => {
          if (faq.canDel == true) {
            faq.chosen = true;
          }
        });
      } else {
        this.canDelFaq.forEach(faq => {
          if (faq.canDel == true) {
            faq.chosen = false;
          }
        });
      }
    },
    $route(to, from) {
      //this.tab= this.$route.params.cat_id
    }
  },
  created() {
  }
}
</script>

<style scoped>
.cus-container {
  padding: 20px 15px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 12px;
}
.cus-btn {
  width: 35px;
  height: 35px;
  margin-right: 12px;
  color: rgba(0, 0, 0, 0.12);
}
.cus-title-table {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  margin-top: 15px;
  padding-left: 15px;
}
.cus-title {
  font-size: 18px;
  font-weight: bold;
}
</style>