<template>
  <q-layout view="hHr Lpr fFf">
    <q-header elevated >
      <q-toolbar class="cus-toolbar row flex justify-between">
        <div class="flex justify-between col-3">
          <h5  style="padding:0px; margin:0px">LOGO</h5>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        </div>
        <q-avatar  side="right">
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
      </q-toolbar>
    </q-header>
 
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list padding >
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="dashboard" color="primary" />
          </q-item-section>
          <q-item-section>
            DASHBOARD
          </q-item-section>
        </q-item>
        <q-expansion-item  @click="isActive[0] = !isActive[0]">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="supervisor_account" />
            </q-item-section>
            <q-item-section v-bind:class="{ active: isActive[0] }">
              Account
            </q-item-section>
          </template>
        </q-expansion-item>
        <q-expansion-item @click="isActive[1] = !isActive[1]">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-folder-open" />
            </q-item-section>
            <q-item-section v-bind:class="{ active: isActive[1] }">
              Contents
            </q-item-section>
          </template>
        </q-expansion-item>
        <q-expansion-item  @click="isActive[2] = !isActive[2]">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-layer-group" />
            </q-item-section>
            <q-item-section v-bind:class="{ active: isActive[2] }">
              Lecture
            </q-item-section>
          </template>
        </q-expansion-item>
        <q-expansion-item @click="isActive[3] = !isActive[3]">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="notifications_active" />
            </q-item-section>
            <q-item-section v-bind:class="{ active: isActive[3] }">
              Education Event
            </q-item-section>
          </template>
          <q-list>
            <q-item clickable v-for="catalog in catalogs" :key="catalog.id" class="cus-sub-menu" :to="'/admin/edu-event/' + catalog.id">
              <q-item-section avatar>
                <q-icon size="xs" name="event_available" />
              </q-item-section>
              <q-item-section style="margin-left:-20px">
                {{catalog.Name_event}}
              </q-item-section>
            </q-item>
          </q-list>
          
        </q-expansion-item>
        <q-expansion-item @click="isActive[4] = !isActive[4]">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="ion-help-circle" />
            </q-item-section>
            <q-item-section v-bind:class="{ active: isActive[4] }">
              FAQ
            </q-item-section>
          </template>
        </q-expansion-item>
        <q-expansion-item @click="isActive[5] = !isActive[5]">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="primary" name="fas fa-credit-card" />
            </q-item-section>
            <q-item-section v-bind:class="{ active: isActive[5] }">
              Purchase
            </q-item-section>
          </template>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container >
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-toolbar class="flex justify-end">
        <div class="cus-toolbar row">
          <div class="vertical-middle">
            <q-select outlined v-model="model" :options="options" dense bg-color="white" style="width: 300px; padding: 7px 0px; margin-right: 50px"/>
          </div>
          <p>Version 0.0.1</p>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  data () {
    return {
      isActive: [false, false, false, false, false, false],
      model: 'English',
      options: [
        'Korean','English'
      ],
      leftDrawerOpen: false,
      catalogs:[
        {
          id: 1,
          image: "/statics/image/anh5.jpg",
          Name_event: "Spring Season Event ",
          Payment_type: "Free",
          startDate: "12/12(moday)",
          endDate: "13/12(sunday)"
        },
        {
          id: 2,
          image: "/statics/image/anh5.jpg",
          Name_event: "Summer season Event",
          Payment_type: "Free",
          startDate: "12/12(moday)",
          endDate: "13/12(sunday)"
        },
        {
          id: 3,
          image: "/statics/image/anh5.jpg",
          Name_event: "Autumn Season Event",
          Payment_type: "Free",
          startDate: "12/12(moday)",
          endDate: "13/12(sunday)"
        },
        {
          id: 4,
          image: "/statics/image/anh5.jpg",
          Name_event: "Winter Season Event",
          Payment_type: "Free",
          startDate: "12/12(moday)",
          endDate: "13/12(sunday)"
        }
      ]
    }
  }
}
</script>
<style scoped>
  .cus-toolbar {
    /* height: 50px; */
    height: 5vh;
    line-height: 50px;
  }
  .cus-sub-menu{
    padding-left:70px;
    margin:-10px 0px
  }
  .active{
    font-weight: bold;
    color: #1976D2;
  }
</style>
