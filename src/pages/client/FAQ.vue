<template>
 <div class="q-pa-md doc-container" style="height: 100vh">
   <!-- start menu sub-cate-pro -->
   <div class="row justify-center bg-primary" style="height: 25vh">
      <div class="col-6 colmenu1 ">
        <q-carousel
      animated
      v-model="slide"
      height="20vh"
        class="bg-primary text-white"
      >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-scroll-area
        style="height: 100%"
      >
        <q-list :name=1 dense padding class="rounded-borders">
      <q-item v-for="(task) in mater || filterBy "
      :key="task.id"
      arrows
      clickable
      v-ripple>
        <q-item-section>
          <p @click="takeList(task)">{{task.name}}</p>
        </q-item-section>
      </q-item>
    </q-list>
        </q-scroll-area>
      </q-carousel-slide>
        </q-carousel>
      </div>
      <!-- start btn back -->
      <div  class="backs">
        <q-btn class="bg-primary" style="margin-top: 10vh" @click="back()">
          <q-icon name="arrow_back_ios" style="font-size: 2vh"/></q-btn></div>
      <!-- end btn back -->
       <div class="col-6 colmenu2">
        <q-carousel
      animated
      v-model="slide"
      height="20vh"
        class="bg-primary text-white"
      >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-scroll-area
        style="height: 100%"
      >
        <q-list :name=1 dense padding class="rounded-borders" id="listSub">
      <q-item v-for="(child) in childs"
      :key="child.id"
      arrows
      clickable
      v-ripple>
        <q-item-section>
          <p @click="takeChild(child)">{{child.name}}</p>
        </q-item-section>
      </q-item>
    </q-list>
        </q-scroll-area>
      </q-carousel-slide>
        </q-carousel>
      </div>
   </div>
    <!-- end menu sub-cate-pro -->
    <!-- start Search -->
    <div class="q-gutter-y-md" style="height: 5vh">
      <q-toolbar class="bg-primary text-white">
          <q-select
                dense
                class="q-mr-xs col-3 bg-white"
                outlined
                v-model="searchType"
                :options="searchvalue"
                ></q-select>
              <!--end search content -->
              <!-- start search text-->
        <q-input borderless dense debounce="300" v-model="search" placeholder="Search" style="background-color: white;width:80%">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
    </div>
       <!-- end Search text-->
       <!-- Start List FAQ -->
       <div class="row-xl cus-1" >
          <div class="row text-bold text-center">
      <div class="col-2">No.</div>
      <div class="col-10">Title</div>
    </div>
         <q-carousel
      animated
      v-model="slide"
        class="bg-primary text-white cus-1"
      >
      <q-carousel-slide name="style" class="column">
       <q-scroll-area
      >
        <q-list>
      <q-item
      v-for="(faq,index) in filteredList"
      :key="faq.id"
      clickable
      v-ripple>
        <q-item-section class="col-2">
          {{index +1}}
        </q-item-section>
        <q-item-section class="col-10" @click.stop="checkLevel(faq.id,faq.level)">
          [{{faq.level}}] {{faq.title}}
        </q-item-section>
      </q-item>
    </q-list>
        </q-scroll-area>
      </q-carousel-slide>
         </q-carousel>

    </div>
    <!-- End List FAQ -->
 </div>
    <!--  -->
 <!-- asd -->
</template>
<script>

export default {
  data() {
      return {
          search: '',
          searchType: 'Title',
          searchvalue: ['Title', 'Content','Level'],
          slide: 'style',
          small: false,
          faqs: [],
          navhistorymater: [],
          childs: [],
          accessAuthority: [
            {id: 1,
            name: 'PC'
            },
            {id: 2,
            name: 'Basic'
            },
            {id: 3,
            name: 'Advanced'
            },
            {id: 4,
            name: 'Executive'
            },
            {id: 5,
            name: 'Diamond'
            }
          ],
          subject: [{
                  id: '486c5fc3-d287-4a07-8345-e6f1159d14af',
                  name: 'subject0',
                  categories: [{
                      id: 'eab6dba7-8df0-4f31-8696-f7f982ee6f6c',
                      name: 'cat0',
                      products: [{
                          id: 'd6feadf8-be3e-4e0c-8a87-1b38acc052ac',
                          name: 'prod0',
                          faq: [{
                              id: 'a3e036ce-3ff1-47f8-b3c0-976a16bf0513',
                              title: 'title0',
                              content: 'This is a dummy FAQ',
                              level: 'Advanced',
                              status: 'Active',
                              createdDate: '2020-02-13',
                              keywords: [{
                                      id: '17584bcb-9361-4059-9c59-e3f0fb2489c9',
                                      keyword: 'keyword0',
                                      note: 'note for keyword0',
                                      createdDate: '2020-02-13'
                                  },
                                  {
                                      id: '66bd2231-caed-42d2-951b-590b33beb096',
                                      keyword: 'keyword7',
                                      note: 'note for keyword7',
                                      createdDate: '2020-02-13'
                                  }
                              ],
                              images: [{
                                  id: '6415be2b-d7db-476c-bae9-4cfdeee65429',
                                  fileName: 'fileName0',
                                  fileType: 'PNG'
                              }]
                          }]
                      }]
                  }]
              },
              {
                  id: 'c1f56a59-bf74-4b3f-8d78-b94b8f913335',
                  name: 'subject1',
                  categories: [{
                      id: '4d4c875c-5187-4cae-bd0a-c9be22dcf36f',
                      name: 'cat1',
                      products: [{
                          id: '77b9c553-af86-4ddf-87f7-ec534ed53321',
                          name: 'prod1',
                          faq: [{
                              id: '3b1f71da-7a43-4ab5-a3b6-521c46033adf',
                              title: 'title1',
                              content: 'This is a dummy FAQ',
                              level: 'Advanced',
                              status: 'Active',
                              createdDate: '2020-02-13',
                              keywords: [{
                                      id: '17584bcb-9361-4059-9c59-e3f0fb2489c9',
                                      keyword: 'keyword1',
                                      note: 'note for keyword0',
                                      createdDate: '2020-02-13'
                                  },
                                  {
                                      id: '66bd2231-caed-42d2-951b-590b33beb096',
                                      keyword: 'keyword6',
                                      note: 'note for keyword7',
                                      createdDate: '2020-02-13'
                                  }
                              ],
                              images: [{
                                  id: 'bc2c5853-344c-4013-abf9-98401f3c97d9',
                                  fileName: 'fileName1',
                                  fileType: 'PNG'
                              }]
                          }]
                      }]
                  }]
              }
          ]
      }
  },
  mater: [],
  created: function() {
    this.$store.commit("changeTitle", "FAQ")
    this.$store.commit("changeShowBack", true)
    this.$store.commit("changeShowMenu", true)

      var a = []
      this.mater = this.subject
      this.subject.forEach(el => {
          el.categories.forEach(el1 => {
              el1.products.forEach(el2 => {
                  el2.faq.forEach(el3 => {
                      if (el3.status === 'Active') {
                          a.push(el3)
                      }
                  })
              })
          })
      })
      this.faqs = a
  },
  methods: {
    checkLevel(id,lv){
      var a = 0
      var c = []
      var b = 'Advanced'
      this.accessAuthority.forEach(el =>{
        if (b === el.name) {
          c.push(el.id)
        }
        if (lv === el.name) {
          a = el.id
          if (a > c) {
           this.$q
          .dialog({
            title: "FAQ",
            message:
              "You can check after completting the basic training.",
            persistent: true,
          })
          }else{
            this.$router.push('/faq/'+id)
          }
        }
      })
    
    },
      // menu sub-cate-pro
      takeList(task) {
          if (this.navhistorymater.length > 0) {
              var lastE = this.navhistorymater[this.navhistorymater.length - 1]
              if (lastE.id === task.id) {
                  task.parentList = []
                  this.mater.forEach(e => task.parentList.push(e))
                  this.navhistorymater.push(task)
              }
          } else {
              task.parentList = []
              this.mater.forEach(e => task.parentList.push(e))
              this.navhistorymater.push(task)
          }

          var a = []
          if ('categories' in task) {
              this.childs = []
              task.categories.forEach(e => {
                  this.childs.push(e)
                  e.products.forEach(p => {
                      p.faq.forEach(f => {
                          if (f.status === 'Active') {
                              a.push(f)
                          }
                      })
                  })
              })
          } else if ('products' in task) {
              this.childs = []
              task.products.forEach(e => {
                  this.childs.push(e)
                  e.faq.forEach(p => {
                      if (p.status === 'Active') {
                          a.push(p)
                      }
                  })
              })
          } else {
              this.childs = []
              a = []
          }
          this.faqs = a
      },
      takeChild(lt) {
          var a = []
          if ('products' in lt) {
              this.mater = this.childs
              this.childs = []
              lt.products.forEach(e => {
                  this.childs.push(e)
                  e.faq.forEach(p => {
                      if (p.status === 'Active') {
                          a.push(p)
                      }
                  })
              })
          } else if ('faq' in lt) {
              lt.faq.forEach(e => {
                  if (e.status === 'Active') {
                      a.push(e)
                  }
              })
          } else {
              a = []
          }
          this.faqs = a
      },
      back() {
          var e = this.navhistorymater.pop()
          if (e) {
              this.mater = e.parentList
              this.childs = []

              var a = []
              if ('categories' in e) {
                  e.categories.forEach(e => {
                      this.childs.push(e)
                      e.products.forEach(p => {
                          p.faq.forEach(f => {
                              if (f.status === 'Active') {
                                  a.push(f)
                              }
                          })
                      })
                  })
                  this.faqs = a
              } else if ('products' in e) {
                  e.products.forEach(e => {
                      this.childs.push(e)
                      e.faq.forEach(p => {
                          if (p.status === 'Active') {
                              a.push(p)
                          }
                      })
                  })
                  this.faqs = a
                      // }
              }
          } else {
              this.childs = []
              var b = []
              this.subject.forEach(el => {
                  el.categories.forEach(el1 => {
                      el1.products.forEach(el2 => {
                          el2.faq.forEach(el3 => {
                              if (el3.status === 'Active') {
                                  b.push(el3)
                              }
                          })
                      })
                  })
              })
              this.faqs = b
          }
      }
  },
  // search funtion
  computed: {
      filteredList() {
          var e = this.searchType
          if (e === 'Content') {
              return this.faqs.filter(fAq => {
                  return fAq.content.toLowerCase().includes(this.search.toLowerCase())
              })
          } else if (e === 'Title' || e == null) {
              return this.faqs.filter(fAq => {
                  return fAq.title.toLowerCase().includes(this.search.toLowerCase())
              })
          } else {
              return this.faqs.filter(fAq => {
                  return fAq.level.toLowerCase().includes(this.search.toLowerCase())
              })
          }
      }
  }
}

</script>
<style lang="sass" scoped>
.row > div
.doc-container > div + div
  margin-top: 1rem
</style>
<style lang="scss">
.cus-1{
  height: 45 vh;
}
.colmenu2 {
  padding-left: 20px;
  border-left: 10px solid white;
}
.colmenu1 {
  padding-left: 20px;
  border-right: 10px solid white;
}
.backs{
  height: 20vh;
  z-index: 3;
  position: absolute;
}
.btnback{
  background-color: white;
}
 
  .searchfaq{
    height: 5%;
    border: 1px solid red;
  }
</style>
