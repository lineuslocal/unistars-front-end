<template>
  <q-page class="column">
    <p class="text-h6 cus-text">Applicant List</p>
    <div class="container">
      <q-toolbar class="bg-primary text-white rounded-borders flex justify-between">
        <q-input dark dense standout v-model="text" input-class="text-right" >
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
      </q-toolbar>
      <div class="cus-event">
        <q-list class="bg-white" separator bordered>
          <q-item v-ripple class="row cus-event-detail">
            <q-item-section class="col-1">
            </q-item-section>
            <q-item-section class="col-5 ">
              <q-item-label>Name</q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-item-label>Applied at</q-item-label>
            </q-item-section>
             <q-item-section class="col-2">
              <q-item-label>Order No</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-for="(applicant, index) in applicants" :key="applicant.id" clickable v-ripple class="row cus-event-detail">
            <q-item-section class="col-1">
              <q-avatar size="md">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section class="col-5 ">
              <q-item-label>{{applicant.name}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-item-label>{{applicant.date}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-1">
              <q-item-label class="text-center">{{applicant.order_no}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-1">
              <q-btn v-if ="applicant.state == 'reg'" rounded color="orange" label="Confirm" size="8px"  @click.stop="clickConfirm(index)" class="cus-btn"/>
              <q-btn v-if ="applicant.state == 'confirmed'" rounded color="green" label="Confirmed" size="8px"  @click.stop="clickConfirmed(index)" class="cus-btn"/>
              <q-btn v-if ="applicant.state == 'attended'" rounded color="primary" label="Attended" size="8px"  @click.stop="clickAttended(index)" class="cus-btn"/>
              <q-btn v-if ="applicant.state == 'missed'" rounded color="red" label="Missed" size="8px"  @click.stop="clickMissed(index)" class="cus-btn"/>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      text: '',
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
    }
  },
  computed: {
    applicants () {
      return this.$store.state.Applicant.applicants
    }
  },
  created () {
    var index = this.$route.params.index
    this.$store.commit('changeTitle', this.$store.state.Event.events[index].title)
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
  .cus-btn {
    width: 60px;
  }
</style>
