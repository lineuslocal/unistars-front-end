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
    <q-list bordered class="col-3">
      <q-item-label header  >
          <div>
                <q-btn color="white" text-color="black" icon="sync" class="cus-btn"/>
                <q-btn
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
                   @click="deleteCate()"
                />
              </div>
              <br>
                <q-input dense outlined v-model="filterFaq" placeholder="Type to filter">
                <template v-slot:append>
                </template>
              </q-input>
      </q-item-label>
      <q-list class="bg-white q-mt-md" separator bordered>
              <q-item
                v-for="(category, index) in cates"
                :key="category.id"
                class="row"
                clickable
               @click.stop="showCate(category.id)"
              >
                <q-fab size="md" flat icon="keyboard_arrow_down" direction="down">
                </q-fab>
                <q-item-section class="col-1">
                  <q-checkbox
                    size="md"
                    v-model="canDelFaq[index].chosen"
                  />
                </q-item-section>
                   <q-item-section class="col-2"> 
          </q-item-section>
                <q-item-section class="col-5">
                  <q-item-label >{{category.name}}</q-item-label>
                </q-item-section>
                  <q-btn flat round icon="add" @click.stop="add" />
              </q-item>
            </q-list>
             <q-list>
               
      </q-list>
    </q-list>
     
   <q-form @submit="onSubmit" @reset="onReset" class=" offset-2 flex flex-center margin-right">
      <div class="row offset-2 col-6">
          <p class="col-sm-3 col-12 cus-text"> Category Name * </p>
            <div class="offset-sm-0 col-sm-12 col-10 offset-0 row">
              <p class="col-sm-2 col-12 cus-text text-center">English </p>
              <br>
              <q-input
                v-model="cate.name"
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
                v-model="cate.kr_Name"
                class="col-sm-10 col-12"
                outlined
                dense
                lazy-rules
                placeholder="Category Name"
                :rules="[ val =>  val !== null && val !== '' || 'Please type a name']"
              />
              <div class="col-sm-3 col-11" style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">Note ( For administrator)*</div>
              <q-input
                class="col-sm-12 col-12"
                outlined
                v-model="cate.note"
                dense
                lazy-rules
                type="textarea"
                placeholder="Note ( For administrator)"
                :rules="[ val => val !== null && val !== '' || 'Please type something']"
              />
            </div>
            </div>
       </q-form>
  </div>
  </div>
    <div class="text-right" style="margin-top:30px">
            <q-btn label="Save"  color="primary" @click="saveCate" />
          </div>
            <br>    
  </q-page>
</template>

<script>
export default {
  name: "FaqCategory",
  data() {
    return {
      Name: 'Category',
      current: 1,
      cate: {
      id: 0,
      name: '',
      kr_Name: '',
      note: '',
      },
      tab: 'Category',
      filterFaq: "",
      canDelFaq: [],
      del: false,
    };
  },
  computed: {
   cates() {
     this.canDelFaq = [];
     this.$store.state.FaqCate.cates
     .filter(sate => {
       return(
         sate.name.toLowerCase().match(this.filterFaq.toLowerCase())
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
     return this.$store.state.FaqCate.cates.filter( cate => {
       return (
         cate.name.toLowerCase().match(this.filterFaq.toLowerCase())
       );
     });
   },
   created() {
     if( this.$route.params.id === undefined ){
       this.name = 'Insert'
       this.role = 'create'
     }
     else {
       this.$store.state.FaqCate.cates.forEach(cate => {
         if (cate.id == this.$route.params.id) {
           this.cate.id = cate.id
           this.cate.name = cate.name
           this.cate.kr_Name = cate.kr_Name
           this.cate.note = cate.note
         }
       })
       this.role = 'edit'
        this.name = 'Update'
     }
   }
  },
  methods: {
    onSubmit() {
    
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
            this.$router.push("/admin/faq/Category/list")
          })
          .onCancel(() => {
            
          })
    },
    //Add
    add: function(){
     var x = this.$store.state.FaqCate.cates.length + 1
      this.$store.commit("FaqCate/createCate", { 
            id: x,
            name: "",
            kr_Name: '',
            note: '',
        })

   },
   //Save
    saveCate(){
      console.log('save: ')
      console.log( this.cate)
      this.$store.commit('FaqCate/saveCate', this.cate)
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        timeout: 1000,
        message: "Save Successfully"
      })
    },
  showCate(id){
    var x
    this.cates.forEach( (e, index) => {
      if(e.id == id){
       // this.cat = e
      x= index
      }
    })
    this.cate.id = this.cates[x].id
    this.cate.name = this.cates[x].name 
    this.cate.kr_Name = this.cates[x].kr_Name 
    this.cate.note = this.cates[x].note 
  },
    deleteCate() {
      var delList = [];
      this.canDelFaq.forEach(faq => {
        if (faq.chosen == true) {
          delList.push(faq.id);
        }
      });
      console.log (delList)
      if (delList.length > 0) {
        if (delList.length > 1) {
          var text = delList.length + "cates";
        } else {
          var text = delList.length + "cates";
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
        this.$store.commit("FaqCate/deleteCate", delList);
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
     sortByCate() {
       if (this.sortkey == "ascending") {
         this.$store.commit("FaqCate/sortAscByName");
         this.sortkey = "descending";
       }else {
         this.$store.commit("FaqCate/sortDesByName");
         this.sortkey = "ascending";
       }
     },
  },
  watch: {
    del: function(val) {
      if (val == true) {
        this.canDelFaq.forEach(faq => {
          faq.chosen = true;
        });
      } else {
        this.canDelFaq.forEach(faq => {
          faq.chosen = false;
        });
      }
    },
    $route(to, from) {
      //this.tab= this.$route.params.cat_id
    },
  },
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