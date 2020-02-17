<template>
  <q-page view="lHh Lpr lFf">
  <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          Unistar
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>
      <q-drawer show-if-above v-model="right" side="right" bordered>
      <div>
        <br>
     <q-chip>
        <q-avatar size="70px">
          <img src="https://cdn.quasar.dev/img/avatar5.jpg">
        </q-avatar>
        <big style="margin-left: 11px; width: 150px">Hong Gil Dong </big>
      </q-chip>
    </div>
           <p class="text-center" > Level: Basic</p>
           <br>
      <!-- drawer content -->
      <q-separator />
      <div>
       <q-btn class="flex"
       flat 
       icon="supervised_user_circle" 
       @click="back()">
      &nbsp; &nbsp; About Us
       </q-btn>
       </div>
       <br>
       <q-separator />
            <div>
       <q-btn class="col-4"
       flat
       icon="school"
       @click="back()">
      &nbsp; &nbsp; Learning System
       </q-btn>
       </div>
       <br>
       <q-separator />
             <div>
       <q-btn class="col-4"
       flat
       icon="event"
       @click="back()">
      &nbsp; &nbsp; Education Event
       </q-btn>
       </div>
       <br>
       <q-separator />
             <div>
       <q-btn class="col-4"
       flat
       icon="business"
       @click="back()">
      &nbsp; &nbsp; Business Manager
       </q-btn>
       </div>
       <br>
       <q-separator />
             <div>
       <q-btn class="col-4"
       flat
       icon="chat_bubble"
       @click="back()">
     &nbsp; &nbsp;  FAQ
       </q-btn>
       </div>
       <br>
       <q-separator />
             <div>
       <q-btn class="col-4"
       flat
       icon="notifications_active"
       @click="back()">
       &nbsp; &nbsp; Notification
       </q-btn>
       </div>
       <br>
       <q-separator />
             <div>
       <q-btn class="col-4"
       flat
       icon="thumb_up"
       @click="back()">
      &nbsp; &nbsp; Recommended site
       </q-btn>
       </div>
       <br>
       <q-separator />
             <div>
       <q-btn class="col-6"
       flat
       icon="account_circle"
       @click="back()">
      &nbsp; &nbsp; My Account
       </q-btn>
       </div>
       <br>
       <q-separator />
    <div>
       <q-btn class="col-6"
       flat
       icon="logout" 
       @click="back()">
      &nbsp; &nbsp; Log out
       </q-btn>
       </div>
       <br>
       <q-separator />
    </q-drawer>
      <div class="full-width">
    <q-carousel style="height: 220px"
      animated
      v-model="slide"
      navigation
      infinite
      autoplay
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
  </div>
   <div class="full-width">
     <br>
    <div class="full-width justify-center q-qa-md">
  <q-card   class="white my-card full-width" style="width: 100%; height: 170px">
    <q-card-section>
        <q-icon size="40px" class="absolute-center" name="school"/>
      </q-card-section>
      <div class="text-center"><strong>Learning System</strong></div>
            <q-separator/>
    </q-card>
    <br>
      <q-card   class="white my-card" style="width: 100%;height: 170px">
        <q-card-section>
        <q-icon size="40px" class="absolute-center" name="event"/>
      </q-card-section>
      <div class="text-center"> <strong> Education Event </strong></div>
            <q-separator/>
    </q-card>
    <br>
    <q-card   class="white my-card" style="width: 100%; height: 150px">
        <q-card-section>
        <q-icon size="40px" class="absolute-center" name="question_answer"/>
      </q-card-section>
      <div class="text-center"><strong>FAQ</strong> </div>
            <q-separator/>
    </q-card>
    <br>
     <q-card   class="white my-card" style="width: 100%;height: 150px">
        <q-card-section>
        <q-icon size="40px" class="absolute-center" name="business"/>
      </q-card-section>
      <div class="text-center"> <strong> Business Manager</strong></div>
            <q-separator/>
    </q-card>
    </div>
  </div >
  <br>
  <br>
     <div>
    &nbsp;&nbsp;<big>About Us</big>
    </div>
    <q-separator/>
     <div>
   &nbsp;&nbsp; <big>Unistar</big>
    </div>
    <q-separator/>
    <div>
   <q-icon size="40px"  name="location_on"/> <big>Address</big>
    </div>
    <div>
    <q-icon size="40px"  name="phone_in_talk"/> <big>Telephone</big>
    </div>
    <div>
    <q-icon size="40px"  name="email"/> <big>Email</big>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'Index',
  data () {
    return {
      right: false,
      slide: 1,
    }
  },
  methods: {
    back () {
      this.$router.replace('/')
    },
  }
}
</script>
<style lang="stylus">
.example-item
  height: 200px
  width: 350px
</style>