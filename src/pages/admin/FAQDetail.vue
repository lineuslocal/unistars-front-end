<template>
  <q-page class="cus-layout">
    <div class="cus-title">
          <q-icon name="fas fa-question"/>&nbsp;&nbsp;&nbsp;FAQ
        </div>
        <div class="cus-title-table text-bold">
          <q-icon name="fas fa-question"/>&nbsp;&nbsp;&nbsp;FAQ - Detail
        </div>
        <div class="cus-form">
          <div class="row">

            <!-- main picture of event -->

            <!-- Input information of event -->
            <div class="offset-sm-1 offset-0 col-sm-8 col-12 row">
              <p class="col-2 cus-text">Title</p>
              <p class="offset-1 col-9">{{subfaq.title}}</p>
              <p class="col-2 cus-text" >Category</p>
              <p class="offset-1 col-9">{{subfaq.subject}} > {{subfaq.category}} > {{subfaq.product}}</p>
              <p class="col-2 cus-text">Access authority</p>
              <p class="offset-1 col-9">{{subfaq.level}}</p>
              <p class="col-2 cus-text">Status</p>
              <p class="offset-1 col-9">{{subfaq.status}}</p>
              <p class="col-2 cus-text">Keyword</p>
              <div class="offset-1 col-9"><p style="float:left;" v-for="kw in listKey" :key="kw.id">#{{kw.keyword}}&nbsp;</p></div>
              <p class="col-2 cus-text" >Reg.date</p>
              <p class="offset-1 col-9">{{subfaq.regDate}}</p>
              <div class="col-2 cus-text">Answer</div>
              <p class="offset-1 col-9">{{subfaq.content}}</p>

            </div>

            <!-- picture of event -->
            <div class="col-12 row flex" style="margin-top: 30px">
                <div class="col-1"></div>
              <div class="col-sm-8 col-9 offset-1">
                <q-card class="my-card">
      <q-card-section>
      </q-card-section>
      <q-carousel
      swipeable
      animated
      v-model="sle"
      thumbnails
      infinite
    >
      <q-carousel-slide v-for="(lisimg, indext) in listImg" :key="lisimg.id" :name="indext" :img-src="lisimg.fileName" />
    </q-carousel>
    </q-card>
              </div>
            </div>
          </div>

          <div class="text-center" style="margin-top:30px;">
            <q-btn style="margin-right:15px;width: 5vw;" label="List"  color="primary" to="/admin/faq/FAQ/list"/>
            <q-btn style="margin-right:15px;width:5vw" label="Update"  color="primary" :to="'/admin/faq/FAQ/edit-faq/'+[subfaq.id]"/>
            <q-btn style="width: 5vw" label="Delete"  color="primary" to="/admin"/>
          </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'EventManager',

  data () {
    return {
      sle: 0,
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
                          fileName: 'https://cdn.quasar.dev/img/mountains.jpg',
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
      title: 'Detail',
      tab: 'event',
      haveAddInfor: 'no',
      haveSurvey: 'no',
      role: '',
      listImg: [],
      listKey: [],
      subfaq: {
        id: '',
        title: '',
        subject: '',
        level: '',
        category: '',
        product: '',
        status: '',
        regDate: '',
        content: ''
      }
    }
  },
  methods: {
  },
  computed: {},
  watch: {
  },
  created () {
    var Id = this.$route.params.id
    var IMG = []
    var Kw = []
    // faq list
    this.subject.forEach(el => {
      el.categories.forEach(el1 => {
        el1.products.forEach(el2 => {
          el2.faqs.forEach(el3 => {
            if (el3.status === 'Active' && el3.id === Id) {
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
                Kw.push(el5)
              })
            }
          })
        })
      })
    })
    this.listKey = Kw
    this.listImg = IMG
  }
}
</script>

<style scoped>
.my-card{
  width: 100%
  }
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
</style>