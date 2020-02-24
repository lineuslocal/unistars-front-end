<template>
<q-page>
  <q-page-sticky position="top" expand class="bg-grey-1" style="z-index: 2000;" >
      <q-toolbar>
        <q-input rounded outlined dense v-model="filter"
         class=" event-search text-center"
          placeholder="Search">
          <template v-slot:append>
            <q-btn  @click="search(filter)" flat="flat" dense="dense" round="round" ><q-icon name="search" /></q-btn>
          </template>
        </q-input>
        <q-btn to = "/event-style" flat="flat" dense="dense" round="round" icon="fas fa-history" />
      </q-toolbar>
      <q-separator color="grey" inset style="width:100%;" />
  </q-page-sticky>
    <div class="q-pa-md row items-start q-gutter-md">
      <div class="row" style="width:100%;">
        <div v-for="event in catalog" :key="event.id" v-ripple class="col-6" style="padding:0px 3px;" >
            <q-img :src="event.image" @click="catalogEvent(event.id)" style="height: 160px;"/>
            <q-card-section style="padding:0px;">
              <div
                class="text-h5 q-mt-sm q-mb-xs text-orange-9"
                style="font-size: 18px;"
                @click="catalogEvent(event.id)"
              >{{event.Name_event}} </div>
              <div
                class="text-caption text-grey"
              >{{event.Payment_type}} | {{event.startDate}} ~ {{event.endDate}}</div>
            </q-card-section>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      filter: ''
    }
  },
  computed: {
    catalog(){
      return this.$store.state.Catalog.catalog
    }
  },
  methods: {
    catalogEvent(id) {
      var a;
       this.$store.state.Catalog.catalog.forEach((element) => {  
        if(id == element.id){
          a = this.$router.push("/event-style/" + id);
        }      
      });
      return a;
    },
    search(name) {
      var a; 
      if(name != ''){
        a = this.$router.push("/event-style/search/" + name);
      }
      return a;
    }
  }
}
</script>
<style >
.event-search{
  width: 100%;
}
.q-gutter-md > * {
    margin-top: 60px;
}
.q-field__control {
    color: #027BE3;
}
</style>
