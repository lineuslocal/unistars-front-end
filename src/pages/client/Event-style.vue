<template>
  <div class="style-event">
    <q-page-sticky position="top" expand class="bg-grey-1" style="z-index: 2000;" >
      <q-toolbar>
        <q-input
          class="text-center"
          placeholder="Search"
          style="background: rgb(234, 231, 231);padding:0px 10px;border-radius:50px;height: 35px;width: 100%;"
        >
          <q-btn flat dense round icon="ion-close-circle-outline"  style="color:black;"/>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn to = "/event-style" flat="flat" dense="dense" round="round" icon="fas fa-history" />
        <q-btn to = "/event-style" flat="flat" dense="dense" round="round" icon="fas fa-sort-amount-down-alt" >
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>By newest</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>By due date</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        </q-btn>
      </q-toolbar>
  </q-page-sticky>
    <q-list style="max-width: 100%;margin-top: 50px">
      <div v-for="event in styel_Event" :key="event.id" v-ripple>
        <q-item-label header style="padding:10px;margin-left: 5px;"><span style="color:#F8B67C;">{{event.Payment_type}}</span> | <span style="color:blue;"> {{event.total_time}} days</span> before deadline</q-item-label>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar style="font-size: 70px;">
            <img :src="event.image" @click="pic">
          </q-avatar>
        </q-item-section>
        <q-item-section style="font-size: 17px;">
          <q-item-label style="font-size: 16px;" @click="pic" lines="1">{{event.TileEvent}}</q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold" style="font-size: 12px;">{{event.StartTime}} ~ {{event.EndTime}} </span>
          </q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold" style="font-size: 12px;">{{event.address}}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator inset="item" />
      </div>
    </q-list>
  </div>
</template>
<script>
export default {
  data () {
    return {
      styel_Event: [
        {
          id: 1,
          image: '/statics/img/anh2.jpeg',
          TileEvent: '<Seoul> Success Core 5th Core 5th Core',
          Payment_type: 'Free',
          total_time: '50',
          StartTime: '2020.5.18(sat) 08:30',
          EndTime: '5.19(sat) 17:30',
          address: 'seocho-gu, Seoul'
        },
        {
          id: '2',
          image: '/statics/img/anh3.jpg',
          TileEvent: '<Seoul> Success Core 5th Core 5th Core',
          Payment_type: 'paid',
          total_time: '20',
          StartTime: '2020.5.18(sat) 08:30',
          EndTime: '5.19(sat) 17:30',
          address: 'seocho-gu, Seoul'
        },
        {
          id: '3',
          image: '/statics/img/anh4.jpg',
          TileEvent: '<Seoul> Success Core 5th Core 5th Core',
          Payment_type: 'paid',
          total_time: '30',
          StartTime: '2020.5.18(sat) 08:30',
          EndTime: '5.19(sat) 17:30',
          address: 'seocho-gu, Seoul'
        },
        {
          id: '4',
          image: '/statics/img/anh5.jpg',
          TileEvent: '<Seoul> Success Core 5th Core 5th Core',
          Payment_type: 'Free',
          total_time: '50',
          StartTime: '2020.5.18(sat) 08:30',
          EndTime: '5.19(sat) 17:30',
          address: 'seocho-gu, Seoul'
        },
        {
          id: '5',
          image: '/statics/img/anh6.jpg',
          TileEvent: '<Seoul> Success Core 5th Core 5th Core',
          Payment_type: 'Free',
          total_time: '40',
          StartTime: '2020.5.18(sat) 08:30',
          EndTime: '5.19(sat) 17:30',
          address: 'seocho-gu, Seoul'
        },
        {
          id: '6',
          image: '/statics/img/anh7.jpg',
          TileEvent: '<Seoul> Success Core 5th Core 5th Core',
          Payment_type: 'paid',
          total_time: '50',
          StartTime: '2020.5.18(sat) 08:30',
          EndTime: '5.19(sat) 17:30',
          address: 'seocho-gu, Seoul'
        },
        {
          id: '7',
          image: '/statics/img/anh2.jpeg',
          TileEvent: '<Seoul> Success Core 5th Core 5th Core',
          Payment_type: 'Free',
          total_time: '20',
          StartTime: '2020.5.18(sat) 08:30',
          EndTime: '5.19(sat) 17:30',
          address: 'seocho-gu, Seoul'
        },
        {
          id: '8',
          image: '/statics/img/anh3.jpg',
          TileEvent: '<Seoul> Success Core 5th Core 5th Core',
          Payment_type: 'paid',
          DateTime: '50',
          StartTime: '2020.5.18(sat) 08:30',
          EndTime: '5.19(sat) 17:30',
          address: 'seocho-gu, Seoul'
        }
      ]
    }
  },
  methods: {
    pic () {
      this.$router.push('/event-detail/')
    }
  }
}
</script>
<style >
.relative-position {
    position: unset;
}
/* .q-field--standard .q-field__control:before {
    border-bottom: none;
} */
.q-gutter-md > * {
    margin-top: 60px;
}
.q-field__after, .q-field__append {
     padding-left: 0px;
}
</style>
