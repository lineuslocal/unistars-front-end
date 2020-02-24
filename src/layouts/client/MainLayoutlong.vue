<template>
  <q-layout view="hHr lpR fFr">
    <q-header elevated>
      <q-toolbar class="cus-toolbar">
        <q-btn v-go-back.single flat dense round icon="fas fa-chevron-left" style="font-size:10px;"/>
        <q-toolbar-title class="text-center">
          {{title}}
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="more_vert"
        />
      </q-toolbar>
    </q-header>
  <q-page-container>
      <router-view />
  </q-page-container>
  </q-layout>
</template>
<script>
export default {
  computed: {
    title () {
      let currentPath = this.$route.fullPath
      if (currentPath == '/event') return 'Education Envent'
      else if (currentPath == '/event-style/' + this.$route.params.id){
       var a ='';
       this.$store.state.Catalog.catalog.forEach((element) => {  
        if(this.$route.params.id == element.id){
          a = element.Name_event
        }      
      });
      return a;
      } 
      else if (currentPath == '/event-detail/' + this.$route.params.id) return 'Education Detail'
      else if (currentPath == '/event-style/search/' + this.$route.params.key) return 'Education Envent'
    }
  }
}
</script>
<style>
hr {
    color:red;
}
</style>
