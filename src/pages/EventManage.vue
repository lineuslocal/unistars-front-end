<template>
  <q-page class="column">
    <p class="text-h6 cus-text">Event List</p>
    <div class="container">
      <q-toolbar class="bg-primary text-white rounded-borders flex justify-between">
        <q-input dark dense standout v-model="text" input-class="text-right" >
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
        <q-btn outline rounded color="white" label="AddNew" size="sm"  />
        <q-btn outline rounded color="white" label="Delete" size="sm"  />
      </q-toolbar>
      <div class="cus-event">
        <q-list class="bg-white" separator bordered>
          <q-item v-ripple class="row cus-event-detail">
            <q-item-section class="col-1">
              <q-checkbox size="xs" v-model="delAll"/>
            </q-item-section>
            <q-item-section class="col-1">
              
            </q-item-section>
            <q-item-section class="col-5 ">
              <q-item-label>Name</q-item-label>
            </q-item-section>
            <q-item-section class="col-3">
              <q-item-label>Created at</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-for="event in events" :key="event.id" clickable v-ripple class="row cus-event-detail">
            <q-item-section class="col-1">
              <q-checkbox size="xs" v-model="event.del" />
            </q-item-section>
            <q-item-section class="col-1">
              <q-avatar size="md">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section class="col-5 ">
              <q-item-label>{{event.title}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-item-label>{{event.date}}</q-item-label>
            </q-item-section>
            <q-item-section class="col-2">
              <q-btn flat round color="primary" dense icon="edit" @click.stop />
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
      delAll: false
    }
  },
  computed: {
    events () {
      return this.$store.state.Event.events
    }
  },
  created () {
    this.$store.commit('changeTitle', 'Event Management')
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
