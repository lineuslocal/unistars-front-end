<template>
  <q-layout view="hHr Lpr fFf">
    <q-header elevated >
      <q-toolbar class="cus-toolbar row flex justify-between">
        <div class="flex justify-between col-3" style="max-width:280px">
          <h5  style="padding:0px; margin:0px">LOGO</h5>
          <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            icon="menu"
            aria-label="Menu"
          />
        </div>
        <q-avatar  side="right">
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
      </q-toolbar>
    </q-header>
 
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list padding >
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="dashboard" color="primary" />
          </q-item-section>
          <q-item-section>
            DASHBOARD
          </q-item-section>
        </q-item>
        <q-expansion-item  @click="isActive[0] = !isActive[0]">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="supervisor_account" />
            </q-item-section>
            <q-item-section v-bind:class="{ active: isActive[0] }">
              Account
            </q-item-section>
          </template>
        </q-expansion-item>
        <q-expansion-item @click="isActive[1] = !isActive[1]">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-folder-open" />
            </q-item-section>
            <q-item-section v-bind:class="{ active: isActive[1] }">
              Contents
            </q-item-section>
          </template>
        </q-expansion-item>
        <q-expansion-item  @click="isActive[2] = !isActive[2]">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-layer-group" />
            </q-item-section>
            <q-item-section v-bind:class="{ active: isActive[2] }">
              Lecture
            </q-item-section>
          </template>
        </q-expansion-item>
        <q-expansion-item @click="isActive[3] = !isActive[3]">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="notifications_active" />
            </q-item-section>
            <q-item-section v-bind:class="{ active: isActive[3] }">
              Education Event
            </q-item-section>
          </template>
          <q-list>
            <q-item clickable v-for="(catalog, index) in catalogs" :key="catalog.id" class="cus-sub-menu" @click="toEvenList(catalog.id, index)" :class="{'clickMenu': isClick[index]}">
              <q-item-section avatar>
                <q-icon size="xs" name="event_available" />
              </q-item-section>
              <q-item-section style="margin-left:-20px">
                {{catalog.Name_event}}
              </q-item-section>
            </q-item>
          </q-list>
          
        </q-expansion-item>
       <q-expansion-item @click="isActive[4] = !isActive[4]">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="help" />
            </q-item-section>
            <q-item-section v-bind:class="{ active: isActive[4] }">
              FAQ
            </q-item-section>
          </template>
           <q-list>
            <q-item clickable  class="cus-sub-menu" @click="toFaq('Category','collections_bookmark', catalogs.length + 0)" :class="{'clickMenu': isClick[catalogs.length + 0]}">
              <q-item-section avatar>
                <q-icon size="xs" name="collections_bookmark" />
              </q-item-section>
              <q-item-section style="margin-left:-20px">
               Category
              </q-item-section>
            </q-item>
          </q-list>
          <q-list>
            <q-item clickable class="cus-sub-menu" @click="toFaq('Keyword','keyboard', catalogs.length + 1)" :class="{'clickMenu': isClick[catalogs.length + 1]}">
              <q-item-section avatar>
                <q-icon size="xs" name="keyboard" />
              </q-item-section>
              <q-item-section style="margin-left:-20px">
               Keyword
              </q-item-section>
            </q-item>
          </q-list>
          <q-list>
            <q-item clickable  class="cus-sub-menu" @click="toFaq('FAQ','help', catalogs.length + 2)" :class="{'clickMenu': isClick[catalogs.length + 2]}">
              <q-item-section avatar>
                <q-icon size="xs" name="help" />
              </q-item-section>
              <q-item-section style="margin-left:-20px">
               FAQ
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item @click="isActive[5] = !isActive[5]">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-credit-card" />
            </q-item-section>
            <q-item-section v-bind:class="{ active: isActive[5] }">
              Purchase
            </q-item-section>
          </template>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container >
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-toolbar class="flex justify-end">
        <div class="cus-toolbar row">
          <div class="vertical-middle">
            <q-select outlined v-model="model" :options="options" dense bg-color="white" style="width: 300px; padding: 7px 0px; margin-right: 50px"/>
          </div>
          <p>Version 0.0.1</p>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>

export default {
  name: 'AdminLayout',

  data () {
    return {
      isActive: [false, false, false, false, false, false],
      model: 'English',
      options: [
        'Korean','English'
      ],
      leftDrawerOpen: false,
    }
  },
  computed: {
    isClick() {
      return this.$store.state.isClick
    },
    catalogs() {
      this.$store.state.Catalogue.catalog.forEach(e=>{
        //this.isClick.push(false)
        this.$store.commit("addIsClick")
      })
      // Faq sub menu is static, with 3 elements 
      this.$store.commit("addIsClick")
      this.$store.commit("addIsClick")
      this.$store.commit("addIsClick")
      return this.$store.state.Catalogue.catalog
    }
  },
  methods: {
    toEvenList( cat_id, indexClick) {
      this.$store.commit("changeStateIsClick", {index: this.$store.state.currentMenu, val: false})
      this.$store.commit("setCurrentMenu", indexClick)
      this.$store.commit("changeStateIsClick", {index: indexClick, val: true})
      if(!(this.$store.state.allCurrentTab.includes(cat_id))){
        this.$store.commit("addTab", cat_id)
        this.$store.state.Catalogue.catalog.forEach((cat, index) => {
          if( cat.id == cat_id) {
            this.$store.commit("addCatalog", this.$store.state.Catalogue.catalog[index])
          }
        })
      }
      var historyExist = false
      this.$store.state.urlHistory.forEach( (e, index) => {
        if (e.id == cat_id ){
          historyExist = true
          if(this.$route.path != this.$store.state.urlHistory[index].url){
            this.$router.push(this.$store.state.urlHistory[index].url)
          }
        }
      })
      if(!historyExist){
        this.$router.push('/admin/event/list/' + cat_id) 
      }
    },
    toFaq(nameTopic, iconTopic, indexClick) {
      this.$store.commit("changeStateIsClick", {index: this.$store.state.currentMenu, val: false})
      this.$store.commit("setCurrentMenu", indexClick)
      this.$store.commit("changeStateIsClick", {index: indexClick, val: true})

      var existedTopic = false
      var existedHistory = false
      this.$store.state.faq.forEach( e=> {
        if(e.name == nameTopic){
          existedTopic = true
          if(e.urlHistory != '' && e.urlHistory != this.$route.path){
            this.$router.push(e.urlHistory)
          }
        }
      })
      if(!existedTopic) {
        this.$store.commit("addFaq",{name: nameTopic, icon: iconTopic, urlHistory: '/admin/faq/' + nameTopic + '/list' })
        this.$router.push('/admin/faq/' + nameTopic + '/list' )
      }
    }
  }
}
</script>
<style scoped>
  .cus-toolbar {
    /* height: 50px; */
    height: 5vh;
    line-height: 50px;
  }
  .cus-sub-menu{
    padding-left:70px;
    margin:-10px 0px
  }
  .active{
    font-weight: bold;
    color: #1976D2;
  }
  .clickMenu{
    background-color: #E6F1Fc;
    color: #1976D2;
    border-radius: 15px;
  }
</style>
