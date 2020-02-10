<template>
<q-page class="flex q-pa-lg">
  <div class="full-width">

     <!---->

 
       <q-page-container >
      <q-toolbar-title>
         Reset your passwords
        </q-toolbar-title>
      <router-view />
    </q-page-container>
     <!---->
 <!---->
    <q-form 
      @submit="onSubmit"
      class="q-gutter-md" >
      <div class="row">
      
       <!---->

   </div>
   <div>
    <q-input 
    v-model="reset.verifycode" 
    outlined
    color="secondary"
    maxlength="4"   
    mask="####" 
    placeholder=" Verify Code"
     />
   </div>
  <div>
      <q-input 
      ref="input"
      v-model="reset.password" 
      outlined
      color="secondary"
      placeholder=" New Password"
      :type="isPwd ? 'password' : 'text'"
      lazy-rules
        :rules="[
        
          val => val && val.length > 0 || 'Please type something',
          val => val !== null && val !== '' || 'Please type your Password',
        ]">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      </div>

      <div>
      <q-input 
      ref="input"
      v-model="reset.confirmpassword" 
      outlined
      color="secondary"
      placeholder="Confirm New Password"
      :type="isPwd ? 'password' : 'text'"
      lazy-rules
        :rules="[
        
          val => val && val.length > 0 || 'Please type something',
          val => val !== null && val !== '' || 'Please type your Password',
        ]">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      </div>

       <div class="flex flex-center">
       <q-card-section class="row">
          <q-btn class="col-12" 
    @click="waring"
    unelevated 
    type="submit" color="blue-6" 
    label="Confirm" />
          </q-card-section>
        <q-card-section class="col-4">
           <q-btn 
           to="/"
           class="col-12" 
    unelevated
    outline 
    type="submit" color="white" text-color="black"
    label="Cancel" />
          </q-card-section>
      </div>
    
    </q-form>
  
  </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
        isPwd: true,
      reset: {
      password: '',
      confirmpass: '',
      verifycode: '',
      accept: false,
      
      }
     
}
    
  },

  methods: {
     onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-5',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },
    onReset () {
      this.password = null
      this.confirmpassword = null
    },
     signup () {
      this.$router.push('/signup')
    },
    suscess () {
      this.$q.notify({
        message: 'Your temporary passwords has been send your email!',
        color: 'blue',
      html: true
      })
    },
    waring () {
      this.$q.notify({
        message: 'Wrong Invalid Username or password',
        color: 'red',
      html: true
      })
    },

    },

    onReset () {
      this.email = null
      this.password = null
      this.accept = false
    },
  isValidEmail(email){
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
  },
 
  }
</script>