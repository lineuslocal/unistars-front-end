<template>
  <q-toolbar class="bg-primary text-white" v-if="$route.meta.showHeader">
    <q-btn flat dense icon="arrow_back" @click="$router.go(-1)" v-if="$route.meta.showBack" />
    <q-toolbar-title class="text-center">{{$route.name}}</q-toolbar-title>
  </q-toolbar>
</template>
