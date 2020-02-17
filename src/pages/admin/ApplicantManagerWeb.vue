<template>
  <div style="margin-top:50px">
    <div class="cus-title-table">
      <q-icon name="event_available"/>&nbsp;&nbsp;&nbsp;Applicant - List
    </div>
    <div class="cus-container">
          <div class="row flex justify-between">
            <div>
              <q-btn color="white" text-color="black" icon="refresh" class="cus-btn"/>
            </div>
            <q-input dense v-model="filterEvent" placeholder="Title">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <q-item v-ripple class="row" style="font-weight:bold">
            <q-item-section class="col-1">
              <q-checkbox size="xs" v-model="del" />
            </q-item-section>
            <q-item-section class="col-1">#</q-item-section>
            <q-item-section class="col-4">
              <q-item-label @click='sortByName'>Name</q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-item-label @click='sortByStatus'>Status</q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-item-label @click="sortByDate">Reg.date</q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-item-label>Update</q-item-label>
            </q-item-section>
          </q-item>
          <q-list class="bg-white" separator bordered>
            <q-item
              v-for="(applicant, index) in applicants"
              :key="applicant.id"
              v-ripple
              class="row"
            >
              <q-item-section class="col-1">
                <q-checkbox
                  size="xs"
                  v-model="applicantChosen[index]"
                />
              </q-item-section>
              <q-item-section class="col-1">
                <q-item-label>{{index+1}}</q-item-label>
              </q-item-section>
              <q-item-section class="col-4">
                <q-item-label style="color:#1976D2" @click.stop="toDetailApplicant(applicant.id)">{{applicant.name}}</q-item-label>
              </q-item-section>
              <q-item-section class="col-2">
                <q-item-label>{{applicant.state}}</q-item-label>
              </q-item-section>
              <q-item-section class="col-2">
                <q-item-label>{{applicant.appliedDate}}</q-item-label>
              </q-item-section>
              <q-item-section class="col-2">
                <q-btn
                  size="xs"
                  color="primary"
                  label="Update"
                  :to="'/admin/edit-applicant/' + applicant.id"
                  style="width:50%"
                />
              </q-item-section>
            </q-item>
          </q-list>
          <div class="flex flex-center">
            <q-pagination
              size="xs"
              v-model="current"
              :max="5"
              :input="true"
            >
            </q-pagination>
          </div>
        </div>
      
  </div>
</template>

<script>
export default {
  name: "ApplicantManager",
  data() {
    return {
      current: 1,
      filterEvent: "",
      applicantChosen: [],
      del: false,
      sortName: 'ascending',
      sortDate: 'ascending',
      sortStatus: 'ascending'
    }
  },
  methods: {
    sortByName() {
      if (this.sortName == 'ascending') {
        this.$store.commit('Applicant/sortAscByName')
        this.sortName = 'descending'
      }
      else{
        this.$store.commit('Applicant/sortDesByName')
        this.sortName = 'ascending'
      }
    },
    sortByDate() {
      if (this.sortDate == 'ascending') {
        this.$store.commit('Applicant/sortAscByDate')
        this.sortDate = 'descending'
      }
      else{
        this.$store.commit('Applicant/sortDesByDate')
        this.sortDate = 'ascending'
      }
    },
    sortByStatus() {
      if (this.sortStatus == 'ascending') {
        this.$store.commit('Applicant/sortAscByStatus')
        this.sortStatus = 'descending'
      }
      else{
        this.$store.commit('Applicant/sortDesByStatus')
        this.sortStatus = 'ascending'
      }
    },
    toDetailApplicant(id) {
      this.$router.push("/admin/detail-applicant/" + id)
    }
  },
  computed: {
    applicants() {
      this.$store.state.Applicant.applicants.filter(applicant => {
        return (
          applicant.name.toLowerCase().match(this.filterEvent.toLowerCase())
        )
      })
      .forEach(element => {
        this.applicantChosen.push(false)
      });
      
      return this.$store.state.Applicant.applicants.filter(applicant => {
        return (
          applicant.name.toLowerCase().match(this.filterEvent.toLowerCase())
        )
      })
    }
  },
};
</script>

<style scoped>
.cus-container {
  padding: 20px 15px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 12px;
}
.cus-btn {
  width: 35px;
  height: 35px;
  margin-right: 12px;
  color: rgba(0, 0, 0, 0.12);
}
.cus-title-table {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  margin-top: 15px;
  padding-left: 15px;
}
.cus-title {
  font-size: 18px;
  font-weight: bold;
}
</style>