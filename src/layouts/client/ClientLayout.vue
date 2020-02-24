<template>
  <q-layout view="hHr lpR fFr">
    <q-header elevated>
      <q-toolbar class="cus-toolbar">
        <q-btn v-go-back.single flat dense round icon="fas fa-chevron-left" style="font-size:10px;"  v-if="showBack"/>
        <q-toolbar-title class="text-center">
          {{title}}
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="more_vert"
          v-if="showMenu"
        />
      </q-toolbar>
    </q-header>
  <q-page-container>
      <router-view />
  </q-page-container>
  </q-layout>
</template>
<script>
export default {
  computed: {
    showMenu() {
      return this.$store.state.showMenu
    },
    showBack() {
      return this.$store.state.showBack
    },
    title () {
     return this.$store.state.title
    }
  }
}
</script>
<style>
hr {
    color:red;
}
</style>
