<template>
  <div class="q-pa-md" >


    <div class="q-gutter-md absolute-center" >
      <q-time v-model="time" format24h  display-value="date | filter('args')"/>
     
    </div>


    

    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <q-btn class="primary absolute-bottom" >Cancel</q-btn>
        </div>
        <div class="col">
          <q-btn class="dark absolute-bottom-right" >Save</q-btn>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>

export default {
    data () {
    return {
      time: '10:56'
    }
  }
}
</script>
<style lang="scss" scoped>
  .ad_border{
    border-bottom: 1px solid black;
  }
</style>
