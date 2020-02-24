<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <q-page-container>
      <router-view :openDialog="openDialog" />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from 'src/components/client/Header'
export default {
  name: 'Auth',
  components: {
    Header
  },
  mounted () {
  },
  methods: {
    openDialog (title, msg, callback) {
      this.$refs.MyDialog.open(title, msg, callback)
    }
  }
}
</script>
<style>
</style>
