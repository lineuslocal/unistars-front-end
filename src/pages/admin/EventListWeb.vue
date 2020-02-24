<template>
  <q-page class="cus-layout">
          <div class="cus-title">
            <q-icon name="event_available" />&nbsp;&nbsp;&nbsp;{{catalog.Name_event}}
          </div>
          <div class="cus-title-table">
            <q-icon name="event_available" />&nbsp;&nbsp;&nbsp;{{catalog.Name_event}} - List
          </div>
          <div class="cus-container">
            <div class="row flex justify-between res-menu">
              <div>
                <q-btn color="white" text-color="black" icon="refresh" class="cus-btn"/>
                <q-btn
                  class="cus-btn"
                  text-color="black"
                  icon="add"
                  :to="'/admin/event/create/' + catalog.id"
                />
                <q-btn
                  class="cus-btn"
                  text-color="black"
                  icon="delete"
                  @click="deleteEvent()"
                />
              </div>
              <q-input dense v-model="filterEvent" placeholder="Title">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <q-item v-ripple class="row cus-event-row text-center" style="font-weight: bold" >
              <q-item-section class="col-1 res-col" >
                <q-checkbox size="xs" v-model="del" />
              </q-item-section>
              <q-item-section class="col-1 res-col" style="max-width: 50px">#</q-item-section>
              <q-item-section class="col-4 res-update">
                <q-item-label @click="sortByName" class="cursor-pointer">Title</q-item-label>
              </q-item-section>
              <q-item-section class="col-2">
                <q-item-label @click="sortByDate" class="cursor-pointer">Personnel</q-item-label>
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
                v-for="(event, index) in pagingEvent"
                :key="event.id"
                v-ripple
                class="row text-center cus-event-row"
                clickable
                @click="toAppplicantList(event.id)"
              >
                <q-item-section class="col-1 res-col" >
                  <q-checkbox
                    size="xs"
                    v-model="canDelEvent[index + (current-1)*5].chosen"
                    v-if="canDelEvent[index + (current-1)*5].canDel"
                  />
                  <q-checkbox
                    size="xs"
                    v-model="canDelEvent[index + (current-1)*5].chosen"
                    disable
                    v-if="!(canDelEvent[index + (current-1)*5].canDel)"
                  />
                </q-item-section>
                <q-item-section class="col-1 res-col" style="max-width: 50px">
                  <q-item-label>{{index+1 + (current-1)*5}}</q-item-label>
                </q-item-section>
                <q-item-section class="col-4 res-update">
                  <q-item-label style="color:#1976D2" @click.stop="toEventDetail(event.id)">{{event.name}}</q-item-label>
                </q-item-section>
                <q-item-section class="col-2">
                  <q-item-label>{{event.maxParticipant}}</q-item-label>
                </q-item-section>
                <q-item-section class="col-2">
                  <q-item-label>{{event.createdDate}}</q-item-label>
                </q-item-section>
                <q-item-section class="col-2">
                  <q-btn
                    class="cus-btn-update"
                    v-if="!(event.currentParticipant > 0)"
                    size="xs"
                    color="primary"
                    label="Update"
                    :to="'/admin/event/update/' + catalog.id + '/' + event.id"
                    style="width:50%"
                  />
                  <q-btn
                    class="cus-btn-update"
                    v-if="event.currentParticipant > 0"
                    size="xs"
                    color="primary"
                    label="Update"
                    style="width:50%"
                    @click.stop="alertUpdate(index)"
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
          <router-view />
  </q-page>
</template>

<script>
export default {
  name: "EventManagerList",
  data() {
    return {
      filterEvent: "",
      canDelEvent: [],
      del: false,
      sortName: "ascending",
      sortDate: "descending",
      sortOrder: "ascending",
      current: 1,
    }
  },
  computed: {
    events() {
      this.canDelEvent = [];
      this.$store.state.Event.events
        .filter(event => {
          return (
            event.name.toLowerCase().match(this.filterEvent.toLowerCase())
          );
        })
        .forEach(element => {
          if (element.currentParticipant > 0) {
            this.canDelEvent.push({
              id: element.id,
              canDel: false,
              chosen: false
            });
          } else {
            this.canDelEvent.push({
              id: element.id,
              canDel: true,
              chosen: false
            });
          }
        });
      return this.$store.state.Event.events.filter(event => {
        return (
          event.name.toLowerCase().match(this.filterEvent.toLowerCase())
        );
      });
      // var x = []
      // this.$store.state.Catalogue.catalog.forEach(e => {
      //   if ( e.id == this.$route.params.cat_id ) {
      //     x = e.events
      //   }
      // })
      // this.canDelEvent = [];
      // x.forEach( element => {
      //   if (element.currentParticipant > 0) {
      //       this.canDelEvent.push({
      //         id: element.id,
      //         canDel: false,
      //         chosen: false
      //       });
      //     } else {
      //       this.canDelEvent.push({
      //         id: element.id,
      //         canDel: true,
      //         chosen: false
      //       });
      //     }
      // })
      // return x
    },
    catalog() {
      var a
      this.$store.state.Catalogue.catalog.forEach(e => {
        if( e.id == this.$route.params.cat_id) {
          a = e
        }
      })
      return a
    },
    maxPage() {
      return Math.ceil(this.events.length / 5)
    },
    pagingEvent() {
      var startIndex = (this.current-1) * 5
      var endIndex = this.current*5 -1 
      return this.events.slice(startIndex, endIndex + 1)
    },
  },
  methods: {
    deleteEvent() {
      var delList = [];
      this.canDelEvent.forEach(event => {
        if (event.chosen == true) {
          delList.push(event.id);
        }
      });
      if (delList.length > 0) {
        if (delList.length > 1) {
          var text = delList.length + " events";
        } else {
          var text = delList.length + " event";
        }
        this.$q
          .dialog({
            title: "Alert",
            message:
              "if you delete, you cannot find it again. Do you really want to delete " +
              text,
            cancel: true,
            persistent: true
          })
          .onOk(() => {
            console.log(">>>> OK");
            console.log(delList);
            this.$store.commit("Event/deleteEvent", delList);
            this.canDelEvent = [];
          })
      } else {
        this.$q
          .dialog({
            title: "Alert",
            message: "Please check event that you want to delete",
            persistent: true
          })
      }
    },
    sortByName() {
      if (this.sortName == "ascending") {
        this.$store.commit("Event/sortAscByName");
        this.sortName = "descending";
      } else {
        this.$store.commit("Event/sortDesByName");
        this.sortName = "ascending";
      }
    },
    sortByDate() {
      if (this.sortDate == "ascending") {
        this.$store.commit("Event/sortAscByDate");
        this.sortDate = "descending";
      } else {
        this.$store.commit("Event/sortDesByDate");
        this.sortDate = "ascending";
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
    toAppplicantList( id ){
      this.$router.push('/admin/event/list/' + this.catalog.id + '/applicant/list/' +  id)
    },
    toEventDetail( id ) {
      this.$router.push('/admin/event/detail/' + this.catalog.id + '/' + id)
    },
    alertUpdate(index) {
      this.$q
          .dialog({
            title: "Alert",
            message:
              `You cannot update this event because there 
              ${this.events[index].currentParticipant > 1 ? 'are ' : 'is '} 
              ${this.events[index].currentParticipant}
              ${this.events[index].currentParticipant > 1 ? ' persons' : ' person'} applied.`,
            persistent: true,
          })
    },
  },
  watch: {
    del: function(val) {
      if (val == true) {
        this.canDelEvent.forEach(event => {
          if (event.canDel == true) {
            event.chosen = true;
          }
        });
      } else {
        this.canDelEvent.forEach(event => {
          if (event.canDel == true) {
            event.chosen = false;
          }
        });
      }
    },
  },
  created() {

  }
}
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
  .cus-layout {
    margin-top:20px;
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
    .cus-event-row{
      padding: 8px;
    }
    .res-col{
      max-width: 20px;
    }
    .res-menu{
      padding: 0 8px;
    }
    .res-update{
      text-align: left;
    }
    .cus-btn-update{
      margin: 0;
    }
  }
</style>