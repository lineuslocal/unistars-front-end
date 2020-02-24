<template>
  <q-page class="cus-layout">
   <div class="cus-title">
          <q-icon name="fas fa-question"/>&nbsp;&nbsp;&nbsp;FAQ
        </div>
        <div class="cus-title-table text-bold">
          <q-icon name="fas fa-question"/>&nbsp;&nbsp;&nbsp;FAQ - Insert
        </div>
        <q-form @submit="onSubmit" @reset="onReset" class="cus-form">
          <div class="row">

            <!-- main picture of event -->

            <!-- Input Title -->
            <div class="offset-sm-1 col-sm-10 col-12 offset-0 row">
              <p class="col-sm-2 col-12 cus-text">Title &nbsp;&nbsp;&nbsp;&nbsp;*</p>
                <q-input
                class="col-sm-10 col-12"
                outlined
                v-model="subfaq.title"
                dense
                lazy-rules
                placeholder="Enter a Place"
                :rules="[ val =>val !== null && val !== '' || 'Please enter your title']"
              />
      <!--  @input="authorichange" -->
              <p class="col-sm-2 col-12 cus-text" >Access authority&nbsp;*</p>
              
              <q-select
              dense
                class="col-sm-10 col-12"
                clearable
                outlined
                v-model="subfaq.level"
                :label="subfaq.level? undefined :'Level - Select'"
                :options="optionaa"
                />
                <!-- Status select -->
                 <p class="col-sm-2 col-12 cus-text">Status &nbsp;&nbsp;&nbsp;&nbsp;*</p>
              <q-select
              dense
                clearable
               outlined
                class="col-sm-10 col-12"
               v-model="subfaq.status"
               :label="subfaq.status? undefined :'Status - Select'"
              :options="statusOption"
               />
      <!-- Category select -->
              <p class="col-sm-2 col-12 cus-text">Category &nbsp;&nbsp;&nbsp;&nbsp;*</p>
              <q-select
               dense
               clearable
               class="col-sm-3 col-3"
               outlined
               style="margin-right:2.5vw;"
               v-model="subfaq.subject"
               :label="subfaq.subject? undefined :'Subject - Select'"
               :options="optionsb"
               />
              <q-select
               dense
              clearable
              class="col-sm-3 col-3"
              style="margin-right:2.5vw;"
              outlined
              v-model="subfaq.category"
              :label="subfaq.category ? undefined :'Category - Select'"
              :options="optioncate"
              />
             <q-select
              dense
              clearable
              class="col-sm-3 col-3"
              outlined
              v-model="subfaq.product"
              :label="subfaq.product? undefined :'Product - Select'"
              :options="optionprod"
             />
      <!-- Key word input -->
              <p class="col-sm-2 col-12 cus-text">Keyword &nbsp;&nbsp;&nbsp;&nbsp;*</p>
              <q-select
              dense
              multiple
              use-chips
                clearable
               outlined
                class="col-sm-10 col-12"
               v-model="subfaq.KeyWords"
               :label="subfaq.KeyWords? undefined :'Keyword - Select'"
              :options="listKeyword"
               />
               <!--  v-for="keywords in listKey" :key="keywords.id" keywords.keyword -->
              <div class="col-sm-2 col-12" style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">Answer &nbsp;&nbsp;&nbsp;&nbsp;*</div>
               <q-input
                class="col-sm-10 col-12"
                outlined
                lazy-rules
                v-model="subfaq.content"
                filled
                type="textarea"
                placeholder="Enter your question"
                :rules="[ val =>val && val.length > 0 || 'Please enter your answer']"
                />
              <div class="col-sm-2 col-12" style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;"></div>
              <q-file clearable
              class="col-sm-10 col-12"
              v-model="subfaq.IMGs"
              :label="subfaq.IMGs? undefined :'Click to select img'"
              filled
              use-chips
              multiple
             >
    <template v-slot:prepend>
          <q-icon name="far fa-images" @click.stop/>
        </template>
        <template v-slot:append>
          <q-icon name="fas fa-plus-circle" color="orange" @click.stop/>
        </template>
        </q-file>
            </div>   
          </div>
          <div class="text-center" style="margin-top:30px">
            <q-btn style="margin-right:15px;" label="Save"  color="primary"/>
            <q-btn label="Cancel" type="cancel" color="primary" to="/admin/faq/FAQ/list"/>
          </div>
    </q-form>
  </q-page>
</template>
<script>
export default {
  name: "EventManager",
  
  data() {
    return {
      text: null,
      files: null,
      title: '',
      modela: null,

      optionaa: [
        'PC', 'Basic', 'Advanced', 'Executive', 'Diamond'
      ],
      statusOption: ['Active','InActive'],
      optionsb: [],
      optioncate: [],
      // optionprod: [],
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

                        // src = /viewPNG/+ 6451;
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
      subfaq: {
        id: '',
        title: '',   
        subject: '',
        level: '',
        category: '',
        product: '',
        status: '',
        regDate: '',
        content: '',
        IMGs:[],
        KeyWords: []
      },
      listImg: [],
      listKey: [],
      listKeyword: [],
      listKeywords: [{
  id: "8218ba7c5709f8c9b16d728be10d7347",
  keyword: "Lorazepam",
  note: "id turpis integer aliquet massa id lobortis convallis tortor risus",
  createdDate: "2020-02-26"
}, {
  id: "f81ae6aa4eb5ee5722e86f2d5116dd70",
  keyword: "Acyclovir",
  note: "amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere",
  createdDate: "2020-03-03"
}, {
  id: "40b1ed490791d570df1ae9248d1a705b",
  keyword: "Pain Relief PM",
  note: "eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse",
  createdDate: "2020-03-15"
}, {
  id: "a42d7decd3e8d2cf3e291d884598422d",
  keyword: "acid",
  note: "orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu",
  createdDate: "2020-02-24"
}, {
  id: "1b251ea1b4cd88debe69bf20b3f105da",
  keyword: "Medique",
  note: "integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo",
  createdDate: "2020-03-10"
}],
      tab: "abc",
    }
  },
   methods: {
    onSubmit() {
      var a = new Date()
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        timeout: 1000,
        message: "Create Event Successfull"
      })
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
            this.$router.push("/admin")
          })
          .onCancel(() => {
            
          })
    }
  },
  computed: {
    // valueArray: [gggg]
   optionprod(){
     var a = []
        if (this.subfaq.subject === null) {
         this.subfaq.category = null
         this.optioncate = []
         this.subfaq.product = null
         return []
      } if(this.subfaq.subject !== null) {
        this.optioncate = []
         this.subject.forEach(el => {
            if (el.name === this.subfaq.subject) {
              el.categories.forEach(el1 => {
                this.optioncate.push(el1.name)
                if (this.subfaq.category === el1.name) {
                  el1.products.forEach(el2 => {
                    a.push(el2.name)
                  })
                } if (this.subfaq.category === null) {
                  this.subfaq.product = null
                }
              })
            }
          })
          return a
      }
   }
  },
  watch: {
  },
  created() {
    var Id = this.$route.params.id
    var IMG = []
    var Kw = []
    this.listKeywords.forEach(el =>{
      this.listKeyword.push(el.keyword)
    })
    // faq list
    this.subject.forEach(el => {
      this.optionsb.push(el.name)
      el.categories.forEach(el1 => {
        // 
        // 
        el1.products.forEach(el2 => {
          el2.faqs.forEach(el3 => {
            if (el3.status === 'Active' && this.$route.params.id !== undefined && el3.id === Id ) {
              this.subfaq.id = el3.id
              this.subfaq.title = el3.title
              this.subfaq.subject = el.name
              this.subfaq.level = el3.level
              this.subfaq.category = el1.name
              this.subfaq.product = el2.name
              this.subfaq.status = el3.status
              this.subfaq.regDate = el3.createdDate
              this.subfaq.content = el3.content
              el3.images.forEach(el4 => {
                IMG.push(el4)
              })
              el3.keywords.forEach(el5 => {
                Kw.push(el5.keyword)
              })
            }
            if (this.subfaq.subject === el.name) {
               this.optioncate.push(el1.name)             
            } 
          })
        })
      })
    })
    this.listImg = IMG
    this.subfaq.IMGs = IMG
    this.subfaq.KeyWords = Kw
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
</style>