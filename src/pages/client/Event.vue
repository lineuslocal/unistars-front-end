<template>
<q-page>
  <q-page-sticky position="top" expand class="bg-grey-1" style="z-index: 2000;" >
      <q-toolbar>
        <q-input
          class="text-center"
          placeholder="Search"
          style="background: rgb(234, 231, 231);padding:0px 10px;border-radius:50px;height: 35px;width: 100%;"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn to = "/event-style" flat="flat" dense="dense" round="round" icon="fas fa-history" />
      </q-toolbar>
  </q-page-sticky>
    <div class="q-pa-md row items-start q-gutter-md">
      <div class="row" style="width:100%;">
        <div v-for="event in events" :key="event.id" v-ripple class="col-6" style="padding:0px 3px;" >
            <q-img :src="event.image" @click="pic" style="height: 160px;"/>
            <q-card-section style="padding:0px;">
              <div
                class="text-h5 q-mt-sm q-mb-xs text-orange-9" @click="pic"
                style="font-size: 18px;"
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
      events: [
        {
          id: 1,
          image: '/statics/img/anh2.jpeg',
          Name_event: 'The Player',
          Payment_type: 'Free',
          startDate: '12/12(date)',
          endDate: '13/12(date)'
        },
        {
          id: '2',
          image: '/statics/img/anh5.jpg',
          Name_event: 'Success Core',
          Payment_type: 'paid',
          startDate: '12/12(date)',
          endDate: '13/12(date)'
        },
        {
          id: '3',
          image: '/statics/img/anh8.jpg',
          Name_event: 'Shoope',
          Payment_type: 'paid',
          startDate: '12/12(date)',
          endDate: '13/12(date)'
        },
        {
          id: '4',
          image: '/statics/img/anh4.jpg',
          Name_event: 'Matcha',
          Payment_type: 'Free',
          startDate: '12/12(date)',
          endDate: '13/12(date)'
        },
        {
          id: '5',
          image: '/statics/img/anh6.jpg',
          Name_event: 'Foot',
          Payment_type: 'Free',
          startDate: '12/12(date)',
          endDate: '13/12(date)'
        },
        {
          id: '6',
          image: '/statics/img/anh7.jpg',
          Name_event: 'Maketing',
          Payment_type: 'paid',
          startDate: '12/12(date)',
          endDate: '13/12(date)'
        },
        {
          id: '7',
          image: '/statics/img/anh2.jpeg',
          Name_event: 'Play Game',
          Payment_type: 'Free',
          startDate: '12/12(date)',
          endDate: '13/12(date)'
        },
        {
          id: '8',
          image: '/statics/img/anh3.jpg',
          Name_event: 'Swing Sport',
          Payment_type: 'paid',
          startDate: '12/12(date)',
          endDate: '13/12(date)'
        }
      ]
    }
  },
  methods: {
    pic () {
      this.$router.push('/event-style/')
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
</style>
