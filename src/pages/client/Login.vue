<template>
<q-page class="flex q-pa-lg">
  <div class="full-width">

     <!---->

 <div class="text-center">
        <q-badge
        color="white" 
        text-color="black">
        <h4>Login</h4>
      
    </q-badge>
      </div>
     <!---->
     <div class="text-center">
        <q-badge
        color="white" 
        text-color="black">
        
        <p>Please enter your account</p>
      
    </q-badge>
      </div>
 <!---->
    <q-form 
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md" >
      <div class="row">
      
       <!---->

   </div>
  
    <div class="row">
    <q-input 
      class="col-12"
        type="email"
        outlined
        suffix="@gmail.com"
         error-label=" A valid email"
          :count="10"
        color="secondary"
        maxlength="30"
        v-model="login.email"
        @keyup.enter="submit"
        placeholder="ID (Email)"
        lazy-rules
        :rules="[
        val => val && val.length > 0 || 'Please type something',
       val => val !== null && val !== '' || 'Please type your Email',
        
        ]"
      
      />
      </div>
      <div>
      <q-input 
      ref="input"
      v-model="login.password" 
      outlined
      color="secondary"
      placeholder="Password"
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
     
      <!-- COnfirm -->
      <div>
    <q-btn 
    size="md"
    @click="waring"
    @keyup.enter="submit"
    unelevated  
    type="submit" color="blue-6" class="full-width text-white" 
    label="Sign In" />
      </div>
      
      <div class="flex flex-center">
       <q-card-section class="col-8">
            <p 
            class="btn btn-info"
            v-once
          @click="finduser = true"
            >
            Did you forget your password /  </p>
          </q-card-section>
        <q-card-section class="col-4">
            <p
            class="btn btn-info"
            v-once
            @click="signup"
            >
            Signup </p>
          </q-card-section>
      </div>
      <div 
        ref="signinBtn" 
        class="btn-sign-in">Sign In</div>
  
      <div class="text-center" >
        <p> or login with </p>
        <div 
        ref="signinBtn" 
        class="btn-sign-in">Sign In</div>
  
     <q-btn 
     round 
     flat 
     color="indigo-8" 
     type="a" 
     href="https://facebook.com" 
     target="_blank" > 
               <q-img
            src="~assets/client/facebook-icon.svg"
          
        /> 
              </q-btn>
              <q-btn 
              
              round 
              flat 
              color="white"
              type="a" 
              href="https://mail.google.com/" >
               <q-img
              
              style="width: 70px"
            src="~assets/client/gmail-icon-2.svg"
          
        />
              </q-btn>
              <q-btn 
              round 
              flat
               type="a" 
     href="https://accounts.kakao.com/">
               <q-img
              
            src="~assets/client/kakaotalk.svg"
          
        />
              </q-btn>
      </div>
    </q-form>
   <q-dialog v-model="finduser">
      <q-card>
        <q-toolbar>
          <q-avatar>
            
          </q-avatar>
          

          <q-toolbar-title><span class="text-weight-bold">Verify</span> your userid</q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <div >
      <q-input 
      style="width: 420px; "
         type="email"
        outlined
         error-label=" A valid email"
        :count="10"
        color="secondary"
        maxlength="30"
        v-model="login.mail"
        placeholder="Email"
        lazy-rules
        :rules="[
        val => val && val.length > 0 || 'Please type something',
       val => val !== null && val !== '' || 'Please type your Email',
        
        ]"

      />
      </div>
        <q-card-section>
         * Please enter the  e-mail address you created during registration. <br>
            A temporary password will be issued to you by e-mail.
        </q-card-section>
        <div class="row">
          
           <q-btn class="col-6"
    @keyup.enter="submit"
    unelevated 
    to=""
    outlined
    type="exit" color="grey-8"
    label="Cancel" />
        <q-btn class="col-6"
    @keyup.enter="submit"
    unelevated 
    to="/resetpass"
    outlined
    type="submit" color="blue-6"
    label="Confirm" />
    
    </div>

      </q-card>
    </q-dialog>
  </div>
  </q-page>
</template>

<script>

import axios from 'axios';
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    
    return {
      isPwd: true,
      finduser: false,
      loading1: false,
      login: {
      phone: '',
      phoneNumber: '',
      email: '',
      password: '',
      mail: '',
      accept: false,
      },
     
}
    
  },
   mounted () {
    
    window.gapi.load('auth2', () => {

      const auth2 = window.gapi.auth2.init({
        client_id: '996745877431-mh0nlornfeq1qh5mepommu36r01o2fge.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      })
      auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
        
        this.$emit('success', googleUser)
      }, error => {
            this.$emit('error', error)
            this.$emit('failure', error) // an alias
          })
    })
  },

  methods: {
     signup () {
      this.$router.push('/signup')
    },
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
      this.email = null
      this.password = null
      this.accept = false
    },
    
    submit(){
      this.$v.login.$touch()
      if(this.$v.login.$error){
         this.$q.notify('Please review fields again.')
        return
      }
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
        position: 'bottom-right',
        type:'warning',
        timeout: 1000,
        textColor: 'black',
        icon: 'warning',
      html: true
      })
    },
    
  
  },
  

    onReset () {
      this.email = false
      this.password = false
      this.accept = false
    },
  
  simulateProgress (number) {
      // we set loading state
      this[`loading${number}`] = true
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this[`loading${number}`] = false
      }, 3000)
    },
  
  }

 
</script>