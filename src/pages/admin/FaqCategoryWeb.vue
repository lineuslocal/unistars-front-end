<template>
  <q-page>
          <div class="cus-title">
            <q-icon name="collections_bookmark" />&nbsp;&nbsp;&nbsp;Category
          </div>
          <div class="cus-title-table">
            <q-icon name="collections_bookmark" />&nbsp;&nbsp;&nbsp; {{Name}} - List
          </div>
          <div class="cus-container">
            <div class="row">
    <q-list bordered class="list q-pa-md">
      <q-item-label header class=" q-pa-md"  >
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
            <q-scroll-area style="height: 400px; width: 270px;">
          <div>
                 <q-list class="q-qa-md">
      <div class="q-qa-md q-gutter-sm">
        <q-item
                v-for="(category, index) in cates"
                :key="category.id"
                class="row"
                clickable
              >
          <div  class="row col-12 text-left">
                <q-item-section class="col-4">
                  <q-checkbox
                    no-shadow
                     size="md"
                       v-model="canDelFaq[index].chosen"
                        v-if="canDelFaq[index].canDel"
                   />
                  <q-checkbox
                      size="md"
                      v-model="canDelFaq[index].chosen"
                        disable
                      v-if="!(canDelFaq[index].canDel)"
                   />
                </q-item-section>
                <q-item-section class="col-5">
                  <q-item-label no-ripple  @click.stop="showCate(category.id)" >{{category.name}}</q-item-label>
                </q-item-section>
                <q-btn flat round icon="add" @click.stop="addsub(category.id)" />
               <q-item  v-for="(cat, index1) in cates[index].categories"
                  :key="cat.id" 
                  >
                 <q-item-section class="col-4">
                     <q-checkbox
                        size="md"
                        v-model="canDelFaq[index].chosen"
                        v-if="canDelFaq[index].canDel"
                      />
                      <q-checkbox
                        size="md"
                        v-model="canDelFaq[index].chosen"
                        disable
                        v-if="!(canDelFaq[index].canDel)"
                      />
                  </q-item-section>
                  <q-item-section class="col-9">
                    <q-item-label @click.stop="showChilCate(category.id,cat.id)">
                    {{cat.name}}</q-item-label>
                  </q-item-section>
                  <q-btn flat round icon="add"/>
              </q-item>
           </div>
          </q-item>
        </div>
        </q-list>  
            </div>
          </q-scroll-area>  
     </q-list>
      <div class="form">
   <q-form @submit="onSubmit" @reset="onReset">
      <div class="row offset-2 col-6">
          <p class="col-sm-4 col-12 cus-text"> Category Name * </p>
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
              <div class="col-sm-4 col-12" style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">Note ( For administrator)*</div>
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
        type: []
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
  },
  methods: {
    onSubmit() {
      this.$store.commit('FaqCate/createCate', this.cate)
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        timeout: 1000,
        message: "Create Keyword Successfull"
      });
      this.cate  = {
        id: this.cate.id + 1,
        name: null,
        kr_Name: null,
        note: null,
        type: null 
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
            categories: [],
        })
    },
    addsub: function(id) {
      this.$store.commit("FaqCate/createcategoriesCate", id )
    },
   //Save
    saveCate(){
      this.$store.commit('FaqCate/saveCate', this.cate)
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "done",
        timeout: 1000,
        message: "Save Successfully"
      })
    },
    saveSub() {
      this.$store.commit('FaqCate/saveCategories', this.ct )
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "done",
        timeout: 1000,
        message: "Save Successfully"
      })
    },
    showCate(id){
      var x
      this.cates.forEach( (e, index) => {
        if(e.id == id){
        x= index
        }
      })
      this.cate.id = this.cates[x].id
      this.cate.name = this.cates[x].name 
      this.cate.kr_Name = this.cates[x].kr_Name 
      this.cate.note = this.cates[x].note
      this.cate.type = 'subject' 
    },
    showChilCate(idSubject, idCat) {
      console.log(idSubject, idCat)
      var indexSubject, indexCat
      console.log("this.cates")
      console.log(this.cates)
      this.cates.forEach((f, index ) => {
        if(f.id == idSubject ){
          f.categories.forEach((e, index1) =>{
            if(e.id == idCat){
              indexSubject = index
              indexCat = index1
            }
          })
        
        }
      })
      this.cate.id = this.cates[indexSubject].categories[indexCat].id
      this.cate.name = this.cates[indexSubject].categories[indexCat].name 
      this.cate.kr_Name = this.cates[indexSubject].categories[indexCat].kr_Name 
      this.cate.note = this.cates[indexSubject].categories[indexCat].note
      this.cate.type = 'chil' 
    },
    deleteCate() {
      var delList = [];
      this.canDelFaq.forEach(faq => {
        if (faq.chosen == true) {
          delList.push(faq.id);
        }
      });
      if (delList.length > 0) {
        if (delList.length > 1) {
          var text = delList.length + "cates";
        } else {
          var text = delList.length + "cates";
        }
      
      this.$q
      .dialog({
           title: "Notice",
            message:
              "if you delete, you cannot find it again. Do you really want to delete " +
              text,
            cancel: true,
            persistent: true
      })
      .onOk(() =>{
        this.$store.commit("FaqCate/deleteCate", delList);
        this.canDelFaq = [];
      })
      .onCancel(() =>{
      });
      } else {
        this.$q
          .dialog({
            title: "Warring",
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
    },
  },
  created(){
      if( this.$route.params.id === undefined ){
        this.name = 'Insert'
        this.role = 'create'
      }
      else {
        this.$store.state.FaqCate.cates.forEach(cate => {
          console.log('this.$store.state.FaqCate.cates.forEach')
          if (cate.id == this.$route.params.id) {
              this.cate.id = cate.id
              this.cate.name = cate.name
              this.cate.kr_Name = cate.kr_Name
              this.cate.note = cate.note
              cate.categories.forEach( (cat, index) => {
                console.log(cat)
                var catTemp = { id: cat.id, name: cat.name, kr_Name: cat.kr_Name, note: cat.note, products:[] }
                cat.products.forEach(pro => {
                  console.log(pro)
                  var proTemp = {id: pro.id, name: pro.name, kr_Name: pro.kr_Name, note: pro.note}
                  catTemp.products.push(proTemp)
                })
              this.cate.category.push(catTemp)
            })
          }
          })
          this.role = 'edit'
          this.name = 'Update'
      }
  }
}
</script>

<style scoped>
.cus-container {
  padding: -1px -1px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 15px;
}
.cus-btn {
  width: 35px;
  height: 35px;
  margin-right: 15px;
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
.form {
  width: 60%;
  margin-top: 100px;
  padding-left: 220px;
}
</style>