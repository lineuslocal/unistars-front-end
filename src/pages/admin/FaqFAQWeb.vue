<template>
  <q-page class="cus-layout">
     <div class="cus-title">
            <q-icon name="fas fa-question" />&nbsp;&nbsp;&nbsp;FAQ
          </div>
          <div class="cus-title-table text-bold">
            <q-icon name="fas fa-question" />&nbsp;&nbsp;&nbsp;FAQ - List
          </div>
          <div class="cus-container">
            <div class="row flex justify-between" style="margin-bottom: 5vh;">
              <div>
                <q-btn color="white" style="width:30px; height:30px" size="xs" text-color="black" icon="fas fa-sync-alt" class="cus-btn"/>
                <q-btn
                  color="white"
                  size="xs"
                  text-color="black"
                  icon="fas fa-plus"
                  style="width:30px; height:30px; margin-right: 12px;"
                  to="/admin/faq/FAQ/add-new-faq"
                />
                <q-btn
                  color="white"
                  size="xs"
                  text-color="black"
                  icon="fas fa-trash-alt"
                  style="width:30px;height:30px;"
                  @click="deleteFAQ"
                />
              </div>
              <q-input dense outlined v-model="filterFAQ" placeholder="Title">
                <template v-slot:append>
                </template>
              </q-input>
              <q-select
      dense
      clearable
         style="width:10vw;"
        outlined
        v-model="modela"
        :label="modela? undefined :'Access authority - Select'"
        :options="optionaa"
      >
      <!--  @input="authorichange" -->
      </q-select>
      <q-select
      dense
      clearable
         style="width:10vw;"
        outlined
        v-model="models"
        :label="models? undefined :'Subject - Select'"
        :options="optionsb"
        @input="subchange"
      >
      </q-select>

      <q-select
      dense
         style="width:10vw;"
        outlined
        clearable
        v-model="modelc"
        :label="modelc ? undefined :'Category - Select'"
        :options="optioncate"
      >
      <!-- @filter="filterFn" -->
      </q-select>
<q-select
     dense
     clearable
        outlined
        v-model="modelp"
         style="width:10vw;"
        :label="modelp? undefined :'Product - Select'"
        :options="optionprod"
      >
      </q-select>
            </div>
            <q-item v-ripple class="row" style="font-weight:bold">
              <q-item-section class="col-1">
                <q-checkbox size="xs" v-model="del">#</q-checkbox>
              </q-item-section>
              <q-item-section class="col-3">
                <q-item-label>Title</q-item-label>
              </q-item-section>
              <q-item-section class="col-1">
                <q-item-label>Acess authority</q-item-label>
              </q-item-section>
              <q-item-section class="col-1">
                <q-item-label >Subject</q-item-label>
              </q-item-section>
              <q-item-section class="col-1">
                <q-item-label>Category</q-item-label>
              </q-item-section>
              <q-item-section class="col-1">
                <q-item-label>Product</q-item-label>
              </q-item-section>
              <q-item-section class="col-1">
                <q-item-label>Status</q-item-label>
              </q-item-section>
              <q-item-section class="col-1">
                <q-item-label>Reg.date</q-item-label>
              </q-item-section>
              <q-item-section class="col-2">
                <q-item-label>Update</q-item-label>
              </q-item-section>
            </q-item>
            <q-list class="bg-white" separator bordered>
              <q-item
                v-for="(faq, index) in filteredList"
                :key="faq.id"
                v-ripple
                class="row"
                clickable
                @click="[faq.id]"
              >
                <q-item-section class="col-1">
                  <q-checkbox
                    size="xs"
                    v-model="canDelFAQ[index].selected">
                    {{index+1}}
                  </q-checkbox>
                </q-item-section>
                <q-item-section class="col-3">
                  <q-item-label style="color:#1976D2" @click.stop="toFAQDetail(faq.id)">{{faq.title}}</q-item-label>
                </q-item-section>
                <q-item-section class="col-1">
                <q-item-label>{{faq.level}}</q-item-label>
              </q-item-section>
                 <q-item-section class="col-1">
                <q-item-label>{{faq.subject}}</q-item-label>
              </q-item-section>
              <q-item-section class="col-1">
                <q-item-label>{{faq.category}}</q-item-label>
              </q-item-section>
              <q-item-section class="col-1">
                <q-item-label>{{faq.product}}</q-item-label>
              </q-item-section>
              <q-item-section class="col-1">
                <q-item-label>{{faq.status}}</q-item-label>
              </q-item-section>
                <q-item-section class="col-1">
                  <q-item-label>{{faq.regDate}}</q-item-label>
                </q-item-section>
                <q-item-section class="col-2">
                  <q-btn
                    size="xs"
                    color="primary"
                    icon="fas fa-pen"
                    style="width:60%"
                  label="Update"
                  :to="'/admin/faq/FAQ/edit-faq/'+[faq.id]"
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
  name: 'faqManager',
  data () {
    return {
      models: null,
      modelc: null,
      modelp: null,
      modela: null,

      optionaa: [
        'PC', 'Basic', 'Advanced', 'Executive', 'Diamond'
      ],
      optionsb: [],
      optioncate: [],
      optionprod: [],
      // test
      temp: [],
      // test
      subject: [
        {
          id: '486c5fc3-d287-4a07-8345-e6f1159d14af',
          name: 'subject0',
          categories: [
            {
              id: 'eab6dba7-8df0-4f31-8696-f7f982ee6f6c',
              name: 'cat0',
              products: [
                {
                  id: 'd6feadf8-be3e-4e0c-8a87-1b38acc052ac',
                  name: 'prod0',
                  faqs: [
                    {
                      id: 'a3e036ce-3ff1-47f8-b3c0-976a16bf0513',
                      title: 'title0',
                      content: 'This is a dummy FAQ',
                      level: 'Advanced',
                      status: 'Active',
                      createdDate: '2020-02-13',
                      keywords: [
                        {
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
                      images: [
                        {
                          id: '6415be2b-d7db-476c-bae9-4cfdeee65429',
                          fileName: 'fileName0',
                          fileType: 'PNG'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'c1f56a59-bf74-4b3f-8d78-b94b8f913335',
          name: 'subject1',
          categories: [
            {
              id: '4d4c875c-5187-4cae-bd0a-c9be22dcf36f',
              name: 'cat1',
              products: [
                {
                  id: '77b9c553-af86-4ddf-87f7-ec534ed53321',
                  name: 'prod1',
                  faqs: [
                    {
                      id: '3b1f71da-7a43-4ab5-a3b6-521c46033adf',
                      title: 'title1',
                      content: 'This is a dummy FAQ',
                      level: 'Advanced',
                      status: 'Active',
                      createdDate: '2020-02-13',
                      keywords: [
                        {
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
                      images: [
                        {
                          id: 'bc2c5853-344c-4013-abf9-98401f3c97d9',
                          fileName: 'fileName1',
                          fileType: 'PNG'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      faqs: [],
      // faq data
      current: 1,
      tab: [],
      filterFAQ: '',
      canDelFAQ:[],
      del: false,
      subfaq: {
        id: '',
        title: '',
        level: '',
        subject: '',
        category: '',
        product: '',
        status: '',
        regDate: ''
      }
    }
  },
  created () {
    this.tab = this.$route.params.cat_id
    // faq list
    var a = []
    this.subject.forEach(el => {
      this.optionsb.push(el.name)
      el.categories.forEach(el1 => {
        // this.optioncate.push(el1.name)
        el1.products.forEach(el2 => {
          // this.optionprod.push(el2.name)
          el2.faqs.forEach(el3 => {
            if (el3.status === 'Active') {
              this.subfaq.id = el3.id
              this.subfaq.title = el3.title
              this.subfaq.subject = el.name
              this.subfaq.level = el3.level
              this.subfaq.category = el1.name

              this.subfaq.product = el2.name

              this.subfaq.status = el3.status
              this.subfaq.regDate = el3.createdDate
              a.push(this.subfaq)
              this.subfaq = []
            }
          })
        })
      })
    })
    this.faqs = a
  },
  computed: {
    filteredList () {
      if (this.modela !== null) {
        if (this.models !== null && this.modelc === null && this.modelp === null) {
        // take option
          this.optionprod = []
          this.modelp = null
          this.subject.forEach(el => {
            if (el.name === this.models) {
              el.categories.forEach(el1 => {
                this.optioncate.push(el1.name)
              })
            }
          })
          this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.subject.toLowerCase().includes(this.models.toLowerCase()) && fAq.level.toLowerCase().includes(this.modela.toLowerCase())
          }).forEach(e=>{
            var x ={id: e.id, selected: false}
            this.canDelFAQ.push(x)
          })
          // end
          return this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.subject.toLowerCase().includes(this.models.toLowerCase()) && fAq.level.toLowerCase().includes(this.modela.toLowerCase())
          })
          // TH1
        } if (this.modelc !== null && this.models !== null && this.modelp === null) {
          this.optionprod = []
          this.modelp = null
          this.subject.forEach(el => {
            if (el.name === this.models) {
              el.categories.forEach(el1 => {
                if (el1.name === this.modelc) {
                  el1.products.forEach(el2 => {
                    this.optionprod.push(el2.name)
                  })
                }
              })
            }
          })
          this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.category.toLowerCase().includes(this.modelc.toLowerCase()) && fAq.level.toLowerCase().includes(this.modela.toLowerCase())
          }).forEach(e=>{
            var x ={id: e.id, selected: false}
            this.canDelFAQ.push(x)
          })


          return this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.category.toLowerCase().includes(this.modelc.toLowerCase()) && fAq.level.toLowerCase().includes(this.modela.toLowerCase())
          })
          // TH2
        } if (this.modelp !== null && this.modelc !== null && this.models !== null) {
          this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.product.toLowerCase().includes(this.modelp.toLowerCase()) && fAq.level.toLowerCase().includes(this.modela.toLowerCase())
          }).forEach(e=>{
            var x ={id: e.id, selected: false}
            this.canDelFAQ.push(x)
          })
          return this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.product.toLowerCase().includes(this.modelp.toLowerCase()) && fAq.level.toLowerCase().includes(this.modela.toLowerCase())
          })
        } if (this.models === null) {
          this.modelc = null
          this.optioncate = []
          this.modelp = null
          this.optionprod = []
          this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.level.toLowerCase().includes(this.modela.toLowerCase())
          }).forEach(e=>{
            var x ={id: e.id, selected: false}
            this.canDelFAQ.push(x)
          })
          return this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.level.toLowerCase().includes(this.modela.toLowerCase())
          })
          // TH3
        } if (this.models !== null && this.modelc === null) {
          this.modelp = null
          this.optionprod = []
          this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.subject.toLowerCase().includes(this.models.toLowerCase()) && fAq.level.toLowerCase().includes(this.modela.toLowerCase())
          }).forEach(e=>{
            var x ={id: e.id, selected: false}
            this.canDelFAQ.push(x)
          })
          return this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.subject.toLowerCase().includes(this.models.toLowerCase()) && fAq.level.toLowerCase().includes(this.modela.toLowerCase())
          })
          // TH3
        }
      } else {
        if (this.models !== null && this.modelc === null && this.modelp === null) {
        // take option
          this.optionprod = []
          this.modelp = null
          this.subject.forEach(el => {
            if (el.name === this.models) {
              el.categories.forEach(el1 => {
                this.optioncate.push(el1.name)
              })
            }
          })

          // end
          this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.subject.toLowerCase().includes(this.models.toLowerCase())
          }).forEach(e=>{
            var x ={id: e.id, selected: false}
            this.canDelFAQ.push(x)
          })
          // TH4
        } if (this.modelc !== null && this.models !== null && this.modelp === null) {
          this.optionprod = []
          this.modelp = null
          this.subject.forEach(el => {
            if (el.name === this.models) {
              el.categories.forEach(el1 => {
                if (el1.name === this.modelc) {
                  el1.products.forEach(el2 => {
                    this.optionprod.push(el2.name)
                  })
                }
              })
            }
          })
          this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.category.toLowerCase().includes(this.modelc.toLowerCase())
          }).forEach(e=>{
            var x ={id: e.id, selected: false}
            this.canDelFAQ.push(x)
          })
          return this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.category.toLowerCase().includes(this.modelc.toLowerCase())
          })
          // TH5
        } if (this.modelp !== null && this.modelc !== null && this.models !== null) {
          this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.product.toLowerCase().includes(this.modelp.toLowerCase())
          }).forEach(e=>{
            var x ={id: e.id, selected: false}
            this.canDelFAQ.push(x)
          })
          return this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.product.toLowerCase().includes(this.modelp.toLowerCase())
          })
          // TH6
        } if (this.models === null) {
          this.modelc = null
          this.optioncate = []
          this.modelp = null
          this.optionprod = []
          this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase())
          }).forEach(e=>{
            var x ={id: e.id, selected: false}
            this.canDelFAQ.push(x)
          })
          return this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase())
          })
          // TH7
        } if (this.models !== null && this.modelc === null) {
          this.modelp = null
          this.optionprod = []
          this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.subject.toLowerCase().includes(this.models.toLowerCase())
          })
          .forEach(e=>{
            var x ={id: e.id, selected: false}
            this.canDelFAQ.push(x)
          })
          return this.faqs.filter(fAq => {
            return fAq.title.toLowerCase().includes(this.filterFAQ.toLowerCase()) && fAq.subject.toLowerCase().includes(this.models.toLowerCase())
          })
          // TH8
        }
      }
    }
    },
  methods: {
    subchange () {
      var a = this.models
      return a
    },
    deleteFAQ () {
      var deleteIdList = []
      this.canDelFAQ.forEach(e =>{
        if (e.selected == true){
          deleteIdList.push(e.id)
        }
      })
      console.log(deleteIdList)
    },
    toFAQDetail (id) {
      this.$router.push('/admin/faq/FAQ/faq-detail/' + id)
    },
    alertUpdate (index) {
      this.$q
        .dialog({
          title: 'Alert',
          message:
              `You cannot update this faq because there 
              ${this.faqs[index].currentParticipant > 1 ? 'are ' : 'is '} 
              ${this.faqs[index].currentParticipant}
              ${this.faqs[index].currentParticipant > 1 ? ' persons' : ' person'} applied.`,
          persistent: true
        })
    }
  },
  watch: {
    del: function (val) {
       if(val === true){
         this.canDelFAQ.forEach(e =>{
           e.selected = true
         })
       }
       else{
         this.canDelFAQ.forEach(e =>{
           e.selected = false
         })
       }
    },
    $route (to, from) {
      // this.tab= this.$route.params.cat_id
    }

  }
  // test
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
