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
      <q-tab v-for="catalog in catalogs" :key="catalog.id"  :name="catalog.id" :label="catalog.Name_event" icon="event_available" class="cus-tab" @click="changeTab(catalog.id)">
        <q-icon name="fas fa-times" size="10px" style="margin: 0px 0px 2px 10px" @click.stop="closeTab(catalog.id)" />
      </q-tab>
    </q-tabs>
    <!-- <q-separator /> -->
   
    <q-tab-panels v-model="tab" animated class="cus-tab-section"> 
        <q-tab-panel v-for="catalog in catalogs" :key="catalog.id" :name="catalog.id">
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
      urlHistory: [],
    }
  },
  computed: {
    catalogs() {
      //console.log(this.$store.state.catalogs)
      return this.$store.state.catalogs
      
    },
    allCurrentCat() {
      return this.$store.state.allCurrentCat
    }
  },
  methods: {
    closeTab( cat_id) {
      var indexCat = 0
      this.$store.state.allCurrentTab.forEach( (e, index) =>{
        if( e == cat_id){
          indexCat = index
        }
      })
      this.$store.commit("removeTab", indexCat)
      this.$store.commit("removeCatalog", indexCat)
      
        if ( this.$store.state.allCurrentTab.length > 0 ){
          // tab list is not null after delete
          if(  cat_id == +this.$route.params.cat_id){
            // deleted tab is current tab
            if( this.$store.state.allCurrentTab[indexCat-1] != undefined){
              //deleted tab is not the first tab
              this.tab = this.$store.state.allCurrentTab[indexCat-1]
            }
            else{
              // deleted tab is the first tab
              this.tab = this.$store.state.allCurrentTab[indexCat]
            }
          }
          //change url corresponding to current tab
          this.$store.state.urlHistory.forEach(e => {
            if (e.id == this.tab && e.url != this.$route.path){
              this.$router.push(e.url)
            }
          })
        }
        else{
          // tab list is null after delete
          this.$router.push('/admin/event')
        }
    },
    changeTab(cat_id){
      this.$store.state.urlHistory.forEach(e => {
        if (e.id == cat_id && e.url != this.$route.path){
          this.$router.push(e.url)
          }
        })
    }
  },
  watch: {
    $route(to, from) {
      //console.log('doi url ne')
      if(to.params.cat_id != undefined) {
        if( !(this.$store.state.allCurrentTab.includes(+to.params.cat_id)) ) {
          //console.log('so sanh voi tab ne')
          this.$store.state.Catalogue.catalog.forEach(cat => {
            if (cat.id == this.$route.params.cat_id){
              this.$store.commit("addCatalog", cat)
              this.$store.commit("addTab", cat.id)
              this.tab = cat.id   
            }
          })
        }
        else{
          this.tab = +to.params.cat_id
        }
        //console.log('co cat id')
        var isExist = false
        this.$store.state.urlHistory.forEach( (e, index) => {
          if(e.id == +from.params.cat_id) {
            //console.log('lap history: ' + e.id)
            //console.log('co id truoc do')
            this.$store.commit("changeUrl", {index: index, url: from.path })
            isExist = true
          }
        })
        if(!isExist) {
          //console.log('them id vao')
          var x =  {id: from.params.cat_id , url: from.path}
          this.$store.commit("addUrlHistory", x)
          
        }
      }
    },
  },
  created() {
    // if(this.catalogs != undefined && this.catalogs.length > 0 ){
    //   this.tab = this.catalogs[0].id
    // }
    if(this.$route.params.cat_id != undefined){
      if( !(this.$store.state.allCurrentTab.includes(+this.$route.params.cat_id)) ) {
        //console.log('so sanh voi tab ne')
        this.$store.state.Catalogue.catalog.forEach(cat => {
          if (cat.id == +this.$route.params.cat_id){
            this.$store.commit("addCatalog", cat)
            this.$store.commit("addTab", cat.id)
            this.tab = cat.id   
          }
        })
      }
      else{
        this.tab = +this.$route.params.cat_id
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