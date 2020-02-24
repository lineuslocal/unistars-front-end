<template>
  <div style="margin-top:50px">
    <div class="cus-title-table">
      <q-icon name="event_available"/>&nbsp;&nbsp;&nbsp;Applicant - List
    </div>
    <div class="cus-container">
          <div class="row flex justify-between res-menu">
            <div>
              <q-btn color="white" text-color="black" icon="refresh" class="cus-btn"/>
            </div>
            <q-input dense v-model="filterEvent" placeholder="Name">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <q-item v-ripple class="row cus-event-row text-center" style="font-weight:bold">
            <q-item-section class="col-1 res-col">
              <q-checkbox size="xs" v-model="del" />
            </q-item-section>
            <q-item-section class="col-1 res-col" style="max-width: 50px">#</q-item-section>
            <q-item-section class="col-4">
              <q-item-label @click='sortByName' class="cursor-pointer">Name</q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-item-label @click='sortByStatus' class="cursor-pointer">Status</q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-item-label @click="sortByDate" class="cursor-pointer">Reg.date</q-item-label>
            </q-item-section>
            <q-item-section class="col-2 res-update">
              <q-item-label>Update</q-item-label>
            </q-item-section>
          </q-item>
          <q-list class="bg-white cus-list" separator>
            <q-item
              v-for="(applicant, index) in pagingApplicant"
              :key="applicant.id"
              v-ripple
              class="row text-center cus-event-row"
              clickable
            >
              <q-item-section class="col-1 res-col">
                <q-checkbox
                  size="xs"
                  v-model="applicantChosen[index]"
                />
              </q-item-section>
              <q-item-section class="col-1 res-col" style="max-width: 50px">
                <q-item-label>{{index+1 + (current-1)*5}}</q-item-label>
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
                  class="cus-btn-update"
                  size="xs"
                  color="primary"
                  label="Update"
                  @click.stop="toUpdateApplicant(applicant.id)"
                  style="width:50%"
                />
              </q-item-section>
            </q-item>
          </q-list>
          <div class="flex flex-center">
            <q-pagination
              size="xs"
              v-model="current"
              :max= maxPage
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
      sortName: 'descending',
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
      this.$router.push('/admin/event/list/' + this.$route.params.cat_id + '/applicant/detail/' +  this.$route.params.event_id + '/' +id)
    },
    toUpdateApplicant(id) {
      this.$router.push('/admin/event/list/' + this.$route.params.cat_id + '/applicant/update/' +  this.$route.params.event_id + '/' +id)
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
    },
    maxPage() {
      return Math.ceil(this.applicants.length / 5)
    },
    pagingApplicant() {
      var startIndex = (this.current-1) * 5
      var endIndex = this.current*5 -1 
      return this.applicants.slice(startIndex, endIndex + 1)
    }
  },
  watch: {
    del : function(val) {
      if (val == true) {
        this.applicantChosen.forEach((a, index) => {
          this.applicantChosen[index] = true
        })
      }
      else{
        this.applicantChosen.forEach((a, index) => {
          this.applicantChosen[index] = false
        })
      }
    }
  },
  created() {
    this.$store.commit('Applicant/sortAscByName')
  }
};
</script>

<style scoped>
.cus-container {
  padding: 20px 15px 8px 15px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 12px;
  border-top: none;
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
.cus-btn-update{
    max-width: 80px;
    min-width: 34px;
    margin: 0 auto;
}
.cus-list{
  border: 1px solid rgba(0, 0, 0, 0.12);
}
@media only screen and (max-width: 700px) {
  .cus-container{
    padding:20px 0 8px 0;
  }
  .cus-list{
    border-left: none;
    border-right: none;
  }
  .res-menu{
    padding: 0 8px;
  }
  .cus-event-row{
    padding: 8px;
  }
  .res-col{
    max-width: 20px;
  }
  .res-update{
    text-align: left;
  }
  .cus-btn-update{
    margin: 0;
  }
}
</style>