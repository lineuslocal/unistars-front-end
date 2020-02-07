<template>
  <q-layout view="hHr lpR fFr">
    <q-header elevated>
      <q-toolbar class="cus-toolbar">
        <q-btn
          flat
          dense
          rounded
          icon="arrow_back"
          v-if="back"
          v-go-back.single
        />
        <q-toolbar-title class="text-center">
          {{title}}
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="ion-more"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="204"
        :breakpoint="400"
        side="right"
      >
        <q-scroll-area class="cus-drawer">
          <q-list padding separator bordered >
            <q-item clickable v-ripple to="/admin" exact>
              <q-item-section avatar>
                <q-icon name="event_seat" />
              </q-item-section>
              <q-item-section>
                Event Manage
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/admin/applicant-manage">
              <q-item-section avatar>
                <q-icon name="people" />
              </q-item-section>
              <q-item-section>
                Applicant Manage
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <div class="absolute-top cus-avatar">
          <div class="absolute-center bg-transparent text-center">
            <q-avatar size="56px" class="q-mb-sm ">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Mr/Mrs.XXX</div>
            <div>email@gmail</div>
          </div>
        </div>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    title () {
      return this.$store.state.title
    },
    back () {
      return this.$store.state.back
    },
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .cus-toolbar {
    height: 70px;
  }
  .cus-avatar {
    height: 140px;
    background-color: $quaternary;
    color: white;
  }
  .cus-drawer{
    height: calc(100% - 140px); 
    margin-top: 140px; 
    border-right: 1px solid #ddd;
    background-color: $tertiary;
  }
</style>
