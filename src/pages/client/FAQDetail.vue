<template>
<div class="q-pa-md doc-container">
<div class="q-px-lg q-pb-md">
     <div class="row text-bold">
      <div class="col-3">Title</div>
      <div class="col-9">[{{faqs.level}}]{{faqs.title}}</div>
    </div>
    <div class="row">
      <div class="col-3 text-bold">Date create</div>
      <div class="col-9">{{faqs.createdDate}}</div>
    </div>
 <q-card class="my-card">
      <q-card-section class="q-pt-none">
        {{ faqs.content }}
      </q-card-section>
      <q-carousel
      swipeable
      animated
      v-model="sle"
      thumbnails
      infinite
    >
      <q-carousel-slide v-for="(lisimg, indext) in listImg" :key="lisimg.id" :name="indext" :img-src="'/faq/view'+ lisimg.fileType +'/'+lisimg.id" />
    </q-carousel>
    </q-card>
</div>
<div class="q-px-lg">
     <div class="row" style="border-top-style: dotted">
     <q-list>
      <q-item
      v-for="(lfaq,index) in listFaqsame"
      :key="lfaq.id"
      :to="/details/+lfaq.id"
      clickable
      v-ripple>
        <q-item-section class="col-2">
          {{index%2+1}}
        </q-item-section>
        <q-item-section class="col-10">
          [{{lfaq.level}}] {{lfaq.title}}
        </q-item-section>
      </q-item>
    </q-list>
     </div>
</div>
  </div>
</template>
<style lang="sass" scoped>
.doc-container > div + div
  margin-top: 1rem
.row > div
 
  padding: 10px 15px
.row + .row
  margin-top: 1rem
.my-card
  margin-top: 1rem
  background: rgba(86,61,124,.15)
  width: 100%
</style>
<script>
export default {
  data () {
    return {
      sle: 1,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
                id: 'bc2c5853-344c-4013-abf9-98401f3c97d9',
                fileName: 'fileName1',
                fileType: 'PNG'
              }]
            }]
          }]
        }]
      }
      ],
      listFaqsame: [],
      faqs: [],
      listImg: []
    }
  },
  created: function () {
    this.$store.commit("changeTitle", "FAQ")
    this.$store.commit("changeShowBack", true)
    this.$store.commit("changeShowMenu", true)
    
    var iD = this.$route.params.id
    var lk = []
    var allFaq = []
    var iMG = []
    var faqSame = []
    this.subject.forEach(el => {
      el.categories.forEach(el1 => {
        el1.products.forEach(el2 => {
          el2.faq.forEach(el3 => {
            if (el3.id === iD) {
              this.faqs = el3
              el3.keywords.forEach(el4 => {
                lk.push(el4)
              })
              el3.images.forEach(el5 => {
                iMG.push(el5)
              })
            } else {
              allFaq.push(el3)
            }
          })
        })
      })
    })
    this.listImg = iMG
    allFaq.forEach(fa => {
      fa.keywords.forEach(fa1 => {
        lk.forEach(lkey => {
          if (lkey.keyword === fa1.keyword) {
            faqSame.push(fa)
          }
        })
      })
    })
    this.listFaqsame = faqSame
  }
}
</script>
