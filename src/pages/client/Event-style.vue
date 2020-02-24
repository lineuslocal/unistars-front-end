<template>
  <div class="style-event">
    <q-page-sticky position="top" expand class="bg-grey-1" style="z-index: 2000;">
      <q-toolbar>
        <q-input
          rounded
          outlined
          dense
          v-model="searchkey"
          class="event-search text-center"
          placeholder="search"
        >
          <template v-slot:append>
            <q-icon v-if="searchkey === ''" name="search" />
            <q-btn
              flat
              dense
              round
              v-else
              icon="ion-close-circle-outline"
              @click="searchkey = ''"
              style="color:black;"
            />
          </template>
        </q-input>
        <q-btn to="/event-style" flat="flat" dense="dense" round="round" icon="fas fa-history" />
        <q-btn flat="flat" dense="dense" round="round" icon="fas fa-sort-amount-down-alt">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section @click="sortByName">By newest</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="sortByDate">By due date</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
      <q-separator color="grey" inset style="width:100%;" />
    </q-page-sticky>
    <div style="max-width: 100%;margin-top:50px;">
      <q-badge
        v-for="event in events"
        :key="event.id"
        v-ripple
        :color="new Date(event.endTime) < currentTime ? 'grey' : 'white'"
        style="margin-bottom:5px;width: 100%;"
      >
        <q-list style="width: 100%;">
          <q-item clickable v-ripple style="padding: 5px 5px;">
            <div :class="[new Date(event.endTime) < currentTime  ? 'textevent' : 'textevent1' ]">This event is over</div>
            <q-item-section avatar>
              <q-avatar :class="[ new Date(event.endTime) < currentTime ? 'imageavta' : '' ]" style=" font-size: 70px;">
                <img :src="event.photoEvent" @click="todetailEvent(event.id)" />
              </q-avatar>
            </q-item-section>
            <q-item-section style="font-size: 17px;">
              <q-item-label
                :class="[ new Date(event.endTime) < currentTime ? 'imageavta' : '' ]"
                style="font-size: 16px;color:black;"
                lines="1"
                @click="todetailEvent(event.id)"
                class="text-weight-bold"
              >{{event.name}}</q-item-label>
              <q-item-label caption lines="2">
                <span
                  class="text-weight-bold"
                  style="font-size: 12px;"
                >{{event.startTime}} ~ {{event.endTime}}</span>
              </q-item-label>
              <q-item-label caption lines="2">
                <span class="text-weight-bold" style="font-size: 12px;">{{event.place}}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset="item" />
          <q-item-label header :class="[ new Date(event.endTime) < currentTime ? 'imageavta' : '' ]">
            <span style="color:#F8B67C;">Paid</span> |
            <span style="color:blue;">{{event.total_time}} 20 days</span> before deadline
          </q-item-label>
        </q-list>
      </q-badge>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchkey: "",
      currentTime: '',
    };
  },
  methods: {
    todetailEvent(id) {
      var a;
      this.$store.state.Event.events.forEach(element => {
        if (id == element.id) {
          if ( new Date(element.endTime) > this.currentTime ) {
            a = this.$router.push("/event-detail/" + id);
          } else {
            a = this.$router.push("/event-detail/" + id);
          }
        }
      });
      return a;
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
    }
  },
  computed: {
    events() {
      // return this.$store.state.Event.events;
      return this.$store.state.Event.events.filter(event => {
        return (
          event.name.toLowerCase().match(this.searchkey.toLowerCase()) ||
          event.createdDate.match(this.searchkey) ||
          event.place.toLowerCase().match(this.searchkey.toLowerCase())
        );
      });
    },
  },
  created() {
    var title = ''
    this.$store.state.Catalog.catalog.forEach(e =>{
      if( e.id == +this.$route.params.id ){
        title = e.Name_event
      }
    })
    this.$store.commit("changeTitle", title )
    this.$store.commit("changeShowBack", true)
    this.$store.commit("changeShowMenu", true)
 
    var key = this.$route.params.key;
    //var id = +this.$route.params.id;
    if (key == null) {
      this.searchkey = "";
    } else {
      this.searchkey = key;
    }
   this.currentTime = new Date()
  }
};
</script>
<style>
.event-search {
  width: 100%;
}
.textevent {
  display: block;
  position: absolute;
  top: 75%;
  left: 50%;
  font-size: 25px;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.textevent1 {
  display: none;
}
.imageavta {
  opacity: 0.4;
}
.q-gutter-md > * {
  margin-top: 60px;
}
.q-field__after,
.q-field__append {
  padding-left: 0px;
}
</style>
