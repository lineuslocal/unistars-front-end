<template>
  <q-page class="column">
    <p class="text-h6 cus-text">Applicant List</p>
    <div class="container">
      <q-toolbar class="bg-primary text-white rounded-borders flex justify-between">
        <q-input dark dense standout v-model="filterApplicant" input-class="text-right" >
          <template v-slot:append>
            <q-icon v-if="filterApplicant === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="filterApplicant = ''" />
          </template>
        </q-input>
      </q-toolbar>
      <div class="cus-event">
        <q-list class="bg-white" separator bordered>
          <q-item v-ripple class="row cus-event-detail">
            <q-item-section class="col-1">
            </q-item-section>
            <q-item-section class="col-4 ">
              <q-item-label @click.stop="sortByName">Name</q-item-label>
            </q-item-section>
            <q-item-section class="col-3">
              <q-item-label @click.stop="sortByDate">Applied at</q-item-label>
            </q-item-section>
             <q-item-section class="col-1">
              <q-item-label @click.stop="sortByOrder" >Order No</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-for="(applicant, index) in applicants" :key="applicant.id" clickable v-ripple class="row cus-event-detail">
            <q-item-section class="col-1">
              <q-avatar size="md">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section class="col-4 ">
              <q-item-label @click="showDetailApplicant(index)">{{applicant.name}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-3">
              <q-item-label>{{applicant.appliedDate}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-1">
              <q-item-label>{{applicant.orderNo}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-btn v-if ="applicant.state == 'registered'" rounded color="orange" label="Registered" size="8px"  @click.stop="clickConfirm(index)" class="cus-btn"/>
              <q-btn v-if ="applicant.state == 'confirmed'" rounded color="green" label="Confirmed" size="8px"  @click.stop="clickConfirmed(index)" class="cus-btn"/>
              <q-btn v-if ="applicant.state == 'attended'" rounded color="primary" label="Attended" size="8px"  @click.stop="clickAttended(index)" class="cus-btn"/>
              <q-btn v-if ="applicant.state == 'missed'" rounded color="red" label="Missed" size="8px"  @click.stop="clickMissed(index)" class="cus-btn"/>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-dialog v-model="icon" full-width >
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Applicant Information</div>
          </q-card-section>
          <q-card-section class="row items-center q-pb-none">
            <p class="offset-1 col-4 cus-field">Name</p><p class="col-7 ">{{applicant.name}}</p>
            <p class="offset-1 col-4 cus-field">Email</p><p class="col-7 ">{{applicant.email}}</p>
            <p class="offset-1 col-4 cus-field">Phone No.</p><p class="col-7 ">{{applicant.phone}}</p>
            <p class="offset-1 col-4 cus-field">Belongs</p><p class="col-7 ">{{applicant.belongs}}</p>
          </q-card-section>
          <q-card-section class="row items-center q-pb-none">
            <div style="font-size:16px;  font-weight: bold">Additional Information (Option)</div>
          </q-card-section>
          <q-card-section class="row items-center q-pb-none" v-for="(infor, index) in applicant.addInfor" :key="index">
            <p class="offset-1 cus-question" v-if="infor.isRequired">{{index + 1}}.&nbsp;{{infor.question}}<span style="color:red">&nbsp;(Required)</span></p>
            <p class="offset-1 cus-question" v-if="!infor.isRequired">{{index + 1}}.&nbsp;{{infor.question}}<span>&nbsp;(Selection)</span></p>
            <p class="offset-1 col-10 cus-answer">{{infor.answer}}</p>
          </q-card-section>
          <q-card-section class="row items-center text-center justify-center">
            <q-btn dense label="ok" color="primary" v-close-popup style="width:100px"/>
          </q-card-section>
          
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filterApplicant: "",
      sortname: 'ascending',
      sortDate: 'descending',
      sortOrder: 'ascending',
      icon: false,
      applicant: {}
    }
  },
  methods: {
    clickConfirm (index) {
      this.$store.commit('Applicant/changeState', [index, 'confirmed'])
    },
    clickConfirmed (index) {
      this.$store.commit('Applicant/changeState', [index, 'attended'])
    },
    clickAttended (index) {
      this.$store.commit('Applicant/changeState', [index, 'missed'])
    },
    clickMissed (index) {
      this.$store.commit('Applicant/changeState', [index, 'confirmed'])
    },
    sortByName () {
      if (this.sortName == 'ascending') {
        this.$store.commit('Applicant/sortAscByName')
        this.sortName = 'descending'
      }
      else{
        this.$store.commit('Applicant/sortDesByName')
        this.sortName = 'ascending'
      }
    },
    sortByDate () {
      if (this.sortDate == 'ascending') {
        this.$store.commit('Applicant/sortAscByDate')
        this.sortDate = 'descending'
      }
      else{
        this.$store.commit('Applicant/sortDesByDate')
        this.sortDate = 'ascending'
      }
    },
    sortByOrder () {
      if (this.sortOrder == 'ascending') {
        this.$store.commit('Applicant/sortAscByOrder')
        this.sortOrder = 'descending'
      }
      else{
        this.$store.commit('Applicant/sortDesByOrder')
        this.sortOrder = 'ascending'
      }
    },
    showDetailApplicant( index ) {
      this.applicant = this.applicants[index]
      this.icon = true
    }
  },
  computed: {
    applicants () {
      return this.$store.state.Applicant.applicants.filter( applicant => {
        return ( applicant.name.toLowerCase().match( this.filterApplicant.toLowerCase() ) 
              || applicant.appliedDate.match( this.filterApplicant ) 
              || applicant.orderNo.toString().match( this.filterApplicant ) 
              || applicant.state.toLowerCase().match( this.filterApplicant) )
          this.$store.state.Applicant.applicants.forEach(element => {
            console.log(element.name)
          });
      })
      
    }
  },
  created () {
    var index = this.$route.params.index
    this.$store.commit('changeTitle', this.$store.state.Event.events[index].name)
    this.$store.commit('changeBack', true)
    this.$store.commit('changeUrl', '/admin/applicant-manage')
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
    margin: 0 10px 5px 5px;
    border: 1px solid $primary;
    border-radius: 10px;
  }
  .cus-event {
    font-size: 14px;
  }
  .cus-event-detail {
    padding: 12px 5px;
  }
  .cus-btn {
    width: 60px;
  }
  .cus-question {
    margin-bottom: 5px;
  }
  .cus-answer {
    margin-bottom: 5px;
    border-bottom: 2px solid $primary; 
    font-weight: bold;
  }
  .cus-field {
    letter-spacing: 2.5px;
  }
  .cus-infor {
    font-weight: bold;
  }
</style>
