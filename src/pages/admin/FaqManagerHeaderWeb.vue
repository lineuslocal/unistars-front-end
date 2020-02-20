<template>
  <q-page class="cus-layout">
    <q-tabs
      v-model="tab" 
      dense
      class="text-grey"
      active-color="primary"
      align="left"
      inline-label
      indicator-color="transparent"
    >
      <q-tab v-for="topic in faq" :key="topic.name"  :name="topic.name" :label="topic.name" :icon="topic.icon" class="cus-tab" @click="changeTab(topic.name)">
        <q-icon name="fas fa-times" size="10px" style="margin: 0px 0px 2px 10px" @click.stop="closeTab(topic.name)" />
      </q-tab>
    </q-tabs>
   
    <q-tab-panels v-model="tab" animated class="cus-tab-section"> 
        <q-tab-panel v-for="topic in faq" :key="topic.name" :name="topic.name">
          <router-view></router-view>
        </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
export default {
  name: "EventManagerHeader",
  data() {
    return {
      tab: 0,
    }
  },
  computed: {
    faq() {
      return this.$store.state.faq
    }
  },
  methods: {
    closeTab(nameTopic) {
      var indexTopic = 0
      this.$store.state.faq.forEach( (e, index) =>{
        if( e.name == nameTopic){
          indexTopic = index
        }
      })
      this.$store.commit("removeFaq", indexTopic)
      if ( this.$store.state.faq.length > 0 ){
        // tab list is not null after delete
        if(  nameTopic == this.tab){
          // deleted tab is current tab
          if( this.$store.state.faq[indexTopic-1] != undefined){
            //deleted tab is not the first tab
            this.tab = this.$store.state.faq[indexTopic-1].name
          }
          else{
            // deleted tab is the first tab
            this.tab = this.$store.state.faq[indexTopic].name
          }
        }
        //change url corresponding to current tab
        this.$store.state.faq.forEach(e => {
          if (e.name == this.tab && e.urlHistory != this.$route.path){
            this.$router.push(e.urlHistory)
          }
        })
      }
      else{
        // tab list is null after delete
        this.$router.push('/admin/faq')
      }
    },
    changeTab(nameTopic){
      this.$store.state.faq.forEach(e => {
        if (e.name == nameTopic && e.urlHistory != this.$route.path){
          this.$router.push(e.urlHistory)
          }
        })
    }
  },
  watch: {
    $route(to, from) {
      var nameTemp = ''
      var iconTemp = ''
      var haveNameInList = false
      if (to.path.indexOf('Category') != -1){
        nameTemp = 'Category'
        iconTemp = 'collections_bookmark'
      }
      else if (to.path.indexOf('Keyword') != -1){
        nameTemp = 'Keyword'
        iconTemp = 'keyboard'
      }
      else if (to.path.indexOf('FAQ') != -1){
        nameTemp = 'FAQ'
        iconTemp = 'help'
      }
      if( nameTemp != '') {
        this.$store.state.faq.forEach(e => {
          if (e.name == nameTemp){
            this.tab = nameTemp
            this.$store.commit("changeUrlFaq", {name: nameTemp, url: to.path})
            haveNameInList = true
          }
        })
        if(!haveNameInList) {
          this.$store.commit("addFaq",{name: nameTemp, icon: iconTemp, urlHistory: to.path})
          this.tab = nameTemp
        }
      }
    }
  },
  created() {
    var nameTemp = ''
    var iconTemp = ''
    var haveNameInList = false
    if (this.$route.path.indexOf('Category') != -1){
      nameTemp = 'Category'
      iconTemp = 'collections_bookmark'
    }
    else if (this.$route.path.indexOf('Keyword') != -1){
      nameTemp = 'Keyword'
      iconTemp = 'keyboard'
    }
    else if (this.$route.path.indexOf('FAQ') != -1){
      nameTemp = 'FAQ'
      iconTemp = 'help'
    }
    if( nameTemp != '') {
      this.$store.state.faq.forEach(e => {
        if (e.name == nameTemp){
          this.tab = nameTemp
          
          this.$store.commit("changeUrlFaq", {name: nameTemp, url: this.$route.path})
          haveNameInList = true
        }
      })
      if(!haveNameInList) {
        this.$store.commit("addFaq",{name: nameTemp, icon: iconTemp, urlHistory: this.$route.path})
        this.tab = nameTemp
      }
    }
  }
}
</script>

<style scoped>
  .cus-tab {
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-bottom: none;
    border-radius: 10px 10px 0px 0px
  }
  .cus-layout {
    margin-top:20px
  }
  .cus-tab-section {
    border-top: 1px solid rgba(0, 0, 0, 0.12)
  }
</style>