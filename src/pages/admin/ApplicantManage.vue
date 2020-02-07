<template>
  <q-page class="column">
    <p class="text-h6 cus-text">Event List</p>
    <div class="container">
      <q-toolbar class="bg-primary text-white rounded-borders flex justify-between">
        <q-input dark dense standout v-model="filterEvent" input-class="text-right" >
          <template v-slot:append>
            <q-icon v-if="filterEvent === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="filterEvent = ''" />
          </template>
        </q-input>
      </q-toolbar>
      <div class="cus-event">
        <q-list class="bg-white" separator bordered>
          <q-item v-ripple class="row cus-event-detail">
            <q-item-section class="col-1">
            </q-item-section>
            <q-item-section class="col-5">
              <q-item-label @click="sortByName">Name</q-item-label>
            </q-item-section>
            <q-item-section class="col-3">
              <q-item-label @click="sortByDate">Created at</q-item-label>
            </q-item-section>
             <q-item-section class="col-2">
              <q-item-label @click="sortByParticipant">Participant</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-for="(event, index) in events" :key="event.id" v-ripple class="row cus-event-detail">
            <q-item-section class="col-1">
              <q-avatar size="md">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section class="col-5 ">
              <q-item-label clickable @click="toDetailApplicantList(event.id, index)">{{event.name}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-3">
              <q-item-label>{{event.createdDate}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-item-label class="text-center">{{event.currentParticipant}}/{{event.maxParticipant}}</q-item-label>
            </q-item-section>
            
          </q-item>
        </q-list>
      </div>
    </div>
     <!-- <div class="flex justify-end">
      <q-pagination
        v-model="current"
        :max="3"
        size= "12px"
      >
      </q-pagination>
     </div> -->
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filterEvent: "",
      sortname: 'ascending',
      sortDate: 'descending',
      sortParticipant: 'ascending'
    }
  },
  
  methods: {
    toDetailApplicantList (id, index) {
      this.$router.push('/admin/applicant-manage/' + id + '&' + index)
      //this.$store.commit('Event/changeCurrentEvent', this.events[index])
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
    },
    sortByParticipant () {
      if (this.sortParticipant == 'ascending') {
        this.$store.commit('Event/sortAscByCurParticipant')
        this.sortParticipant = 'descending'
      }
      else{
        this.$store.commit('Event/sortDesByCurParticipant')
        this.sortParticipant = 'ascending'
      }
    }
  },
  computed: {
    events () {
      return this.$store.state.Event.events.filter( event => {
        return ( event.name.toLowerCase().match( this.filterEvent.toLowerCase() ) || event.createdDate.match( this.filterEvent ))
      })
    }
  },
  created () {
    this.$store.commit('changeTitle', 'Applicant Management')
    this.$store.commit('changeBack', false)
  }
}
</script>

<style lang="scss">
  .cus-text {
    font-size: 16px;
    margin: 20px 10px;
    color: $primary;
  }
  .container {
    margin: 0 10px 10px 10px;
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
