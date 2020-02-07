<template>
  <q-page class="column">
    <p class="text-h6 cus-text">Event List</p>
    <div class="container">
      <q-toolbar class="bg-primary text-white rounded-borders flex justify-between">
        <q-input dark dense standout v-model="filterEvent" input-class="text-right">
          <template v-slot:append>
            <q-icon v-if="filterEvent === ''" name="search"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="filterEvent = ''" />
          </template>
        </q-input>
        <q-btn outline rounded color="white" label="AddNew" size="sm" to="/admin/new-event" />
        <q-btn outline rounded color="white" label="Delete" size="sm" @click="deleteEvent" />
      </q-toolbar>
      <div class="cus-event">
        <q-list class="bg-white" separator bordered>
          <q-item v-ripple class="row cus-event-detail">
            <q-item-section class="col-1">
              <q-checkbox size="xs" v-model="del"/>
            </q-item-section>
            <q-item-section class="col-1"></q-item-section>
            <q-item-section class="col-5">
              <q-item-label @click="sortByName">Name</q-item-label>
            </q-item-section>
            <q-item-section class="col-3">
              <q-item-label @click="sortByDate">Created at</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="(event, index) in events"
            :key="event.id"
            clickable
            v-ripple
            class="row cus-event-detail"
          >
            <q-item-section class="col-1">
              <q-checkbox size="xs" v-model="canDelEvent[index].chosen" v-if="canDelEvent[index].canDel"/>
              <q-checkbox size="xs" v-model="canDelEvent[index].chosen" disable v-if="!(canDelEvent[index].canDel)"/>
            </q-item-section>
            <q-item-section class="col-1">
              <q-avatar size="md">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section class="col-5">
              <q-item-label>{{event.name}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-3">
              <q-item-label>{{event.createdDate}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-1">
              <q-btn flat round color="primary" dense icon="edit" @click="toEditEvent(event.id)" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      filterEvent: "",
      canDelEvent: [],
      del: false,
      sortName: 'ascending',
      sortDate: 'descending'
    };
  },
  computed: {
    events() {
      this.canDelEvent = []
      this.$store.state.Event.events.filter( event => {
        return ( event.name.toLowerCase().match(this.filterEvent.toLowerCase() ) || event.createdDate.match(this.filterEvent ))
      })
        .forEach(element => { 
          if( element.currentParticipant > 0) {
            this.canDelEvent.push({id: element.id, canDel: false, chosen: false})  
          }
          else {
            this.canDelEvent.push({id: element.id, canDel: true, chosen: false})
          }
        })
      return this.$store.state.Event.events.filter( event => {
        return ( event.name.toLowerCase().match(this.filterEvent.toLowerCase() ) || event.createdDate.match(this.filterEvent ))
      })
    }
  },
  methods: {
    deleteEvent() {
      var delList = []
      this.canDelEvent.forEach(event => {
        if(event.chosen == true){
          delList.push(event.id)
        }
      })
      if( delList.length  > 0){
        if( delList.length > 1 ) {
          var text = delList.length + " events"
        }
        else{
           var text = delList.length + " event"
        }
        this.$q
          .dialog({
            title: "Alert",
            message:
              "if you delete, you cannot find it again. Do you really want to delete " + text ,
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            console.log(">>>> OK");
            console.log(delList)
            this.$store.commit('Event/deleteEvent', delList)
            this.canDelEvent = []
          })
          .onCancel(() => {
            console.log(">>>> Cancel");
          })
      }
      else {
        this.$q
        .dialog({
          title: "Alert",
          message:
            "Please check event that you want to delete" ,
          persistent: true,
        })
        .onOk(() => {
        })
      }
    },
    toEditEvent (id) {
      this.$router.push('/admin/edit-event/' + id)
    },
    sortByName () {
      if (this.sortName == 'ascending') {
        this.$store.commit('Event/sortAscByName')
        this.sortName = 'descending'
      }
      else{
        this.$store.commit('Event/sortDesByName')
        this.sortName = 'ascending'
      }
    },
    sortByDate () {
      if (this.sortDate == 'ascending') {
        this.$store.commit('Event/sortAscByDate')
        this.sortDate = 'descending'
      }
      else{
        this.$store.commit('Event/sortDesByDate')
        this.sortDate = 'ascending'
      }
    }
  },
  watch: {
    del: function (val) {
      if( val == true) {
        this.canDelEvent.forEach(event => {
          if(event.canDel == true) {
            event.chosen = true
          }
        })
      }
      else{
        this.canDelEvent.forEach(event => {
          if(event.canDel == true) {
            event.chosen = false
          }
        })
      }
    },
    // events: function (val) {
    //   console.log(val)
    //   val.forEach(element => { 
    //   if( element.currentParticipant > 0) {
    //     this.canDelEvent.push({id: element.id, canDel: false, chosen: false})  
    //   }
    //   else {
    //     this.canDelEvent.push({id: element.id, canDel: true, chosen: false})
    //   }
    // });
    // }
  },
  created() {
    this.$store.commit("changeTitle", "Event Management");
    this.$store.commit("changeBack", false);
    // this.$store.state.Event.events.forEach(element => { 
    //   if( element.currentParticipant > 0) {
    //     this.canDelEvent.push({id: element.id, canDel: false, chosen: false})  
    //   }
    //   else {
    //     this.canDelEvent.push({id: element.id, canDel: true, chosen: false})
    //   }
    // });
  },
};
</script>

<style lang="scss">
.cus-text {
  font-size: 16px;
  margin: 20px 10px;
  color: $primary;
}
.container {
  margin: 0 5px 10px 5px;
  border: 1px solid $primary;
  border-radius: 10px;
}
.cus-event {
  font-size: 14px;
}
.cus-event-detail {
  padding: 12px 5px;
}
</style>
