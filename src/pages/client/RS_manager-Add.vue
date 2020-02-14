<template>
  <div class="q-pa-md" >
    <q-list >
      <q-item class="ad_border">
        <q-item-section>
          <q-item-label class="absolute-center text-weight-bold">Add</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list >
      <q-item class="row ad_border">
        <q-item-section avatar>
          <q-avatar>
            <q-icon  name="horizontal_split" />
          </q-avatar>
          </q-item-section>
         <q-item-section>
          <q-item-label >Product</q-item-label>
        </q-item-section>
          <q-item-section class="text-right">
          <q-item-label><q-btn to="/reset-manager-AdProd" label="Add" flat /></q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row ad_border">
        <q-item-section avatar>
          <q-avatar>
            <q-icon  name="restaurant" />
          </q-avatar>
          </q-item-section>
         <q-item-section>
          <q-item-label >Using</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row ad_border">
        <q-item-section avatar>
          <q-avatar>
            <q-icon  name="notification_important" />
          </q-avatar>
          </q-item-section>
         <q-item-section>
          <q-item-label >Notice</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row ad_border">
        <q-item-section avatar>
          <q-avatar>
            <q-icon  name="receipt" />
          </q-avatar>
          </q-item-section>
         <q-item-section>
          <q-item-label >Memo</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
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
}
</script>
<style lang="scss" scoped>
  .ad_border{
    border-bottom: 1px solid black;
  }
</style>
