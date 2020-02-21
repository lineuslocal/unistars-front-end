<template>
  <q-page class="cus-layout">
    <div class="cus-title">
      <q-icon name="keyboard" />&nbsp;&nbsp;&nbsp;Keyword
    </div>
    <div class="cus-title-table">
      <q-icon name="keyboard" />&nbsp;&nbsp;&nbsp; {{Name}} - List
    </div>
    <div class="cus-container">
      <div class="row flex justify-between">
        <div>
          <q-btn @click="reloadPage" ref="reload" color="white" text-color="black" icon="sync" class="cus-btn"/>
          <q-btn
            color="white"
            text-color="black"
            icon="add"
            style="width:35px; height:35px; margin-right: 12px;"
            to="/admin/faq/Keyword/insert"
          />
          <q-btn
            color="white"
            text-color="black"
            icon="delete"
            style="width:35px; height:35px"
            @click="deleteFaq()"
          />
        </div>
        <q-input dense v-model="filterFaq" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <br>
      <q-item  flat v-ripple class="row" style="font-weight:bold">
        <q-checkbox size="xs" v-model="del"/>
        <q-item-section class="col-2">
          <q-item-label ></q-item-label>
        </q-item-section>
        <q-item-section class="col-4">
          <q-item-label>Keyword</q-item-label>
        </q-item-section>
        <q-item-section class="col-4">
          <q-item-label>Reg.date</q-item-label>
        </q-item-section>
        <q-item-section class="col-1">
          <q-item-label >Update</q-item-label>
        </q-item-section>
      </q-item>
        <q-list class="bg-white" separator bordered>
        <q-item
          v-for="(faq, index) in pagingEvent"
          :key="faq.id"
          v-ripple
          class="row"
          clickable
        >
          <q-item-section class="col-1">
            <q-checkbox
              size="xs"
              v-model="canDelFaq[index].chosen"
              v-if="canDelFaq[index].canDel"
            />
            <q-checkbox
              size="xs"
              v-model="canDelFaq[index].chosen"
              disable
              v-if="!(canDelFaq[index].canDel)"
            />
          </q-item-section>
          <q-item-section class="col-1">
          </q-item-section>
          <q-item-section class="col-4">
            <q-item-label style="color:#1976D2" @click.stop="toFaqDetail(faq.id)">{{faq.keyword}}</q-item-label>
          </q-item-section>
          <q-item-section class="col-2">
            <q-item-label>{{faq.createdDate}}</q-item-label>
          </q-item-section>
          <q-item-section class="col-2">

          </q-item-section>
          <q-item-section class="col-2">
            <q-btn
              v-if="!(faq.currentParticipant > 0)"
              size="xs"
              color="primary"
              label="Update"
              icon="edit"
              :to="'/admin/faq/Keyword/edit/' + faq.id"
              style="width:50%"
            />
            <q-btn
              v-if="faq.currentParticipant > 0"
              size="xs"
              color="primary"
              label="Update"
              style="width:50%"
              icon="edit"
              @click.stop="alertUpdate(index)"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <div class="flex flex-center">
        <q-pagination
          size="xs"
          v-model="current"
          :max="5"
          :input="true"
        >
        </q-pagination>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "FaqKeyword",
  data() {
    return {
      Name: 'Keyword',
      current: 1,
      tab: 'Keyword',
      filterFaq: "",
      canDelFaq: [],
      del: false,
      sortkey: "ascending",
      sortDate: "descending",
      sortOrder: "ascending"
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
   },
    maxPage() {
      return Math.ceil(this.faqs.length / 5)
    },
    pagingEvent() {
      var startIndex = (this.current-1) * 5
      var endIndex = this.current*5 -1 
      return this.faqs.slice(startIndex, endIndex + 1)
    }
  },
  methods: {
     reloadPage(){
       
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
      this.$router.push('/admin/faq/Keyword/detail/' + id)
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
.cus-layout {
    margin-top:20px;
}
</style>