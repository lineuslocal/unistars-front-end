<template>
<q-page class="flex q-pa-lg">
     <q-toolbar class="flex">
   	  <q-btn class=""
    to="/"
    v-go-back.single
    icon="arrow_back_ios"
    flat
    dense
    round
    outline />
      </q-toolbar>
 <div class="full-width">
    <!---->
 
     <!---->
    <q-toolbar>
        <q-badge
        color="white" 
        text-color="black">
        <h5>Sign Up</h5>
        
    </q-badge>
      </q-toolbar>
 <!---->
    <q-form 
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md" >
      <q-badge 
      color="white" 
      text-color="black"> 
     <big> User ID 
     <span style="color:red"> *</span> </big></q-badge>
      <div class="row">
      <q-input 
      class="col-9"
      type="email"
        :error="error"
        outlined
        :loading="loading"
         error-label=" A valid email"
          :count="10"
        color="secondary"
        maxlength="30"
        v-model="user.email"
        placeholder="Email Format"
        lazy-rules
        :rules="[
        val => val && val.length > 0 || 'Please type something',
       val => val !== null && val !== '' || 'Please type your Email', isValidEmail
        
        ]"

      />
       <!---->
    <q-btn class="col-3"
    dark-percentage
    style="height:55px"
    :loading="loading1" 
    color="secondary" @click="simulateProgress(1)" label="Verify" />
   </div>
<q-badge
      color="white" 
      text-color="black"> 
     <big> Verify <span style="color:red"> *</span></big>
       </q-badge>
    <q-input 
    v-model="user.pin" 
    outlined
    color="secondary"
    maxlength="6"   
    mask="######" 
    placeholder=" Verify Code"
     />
      
<q-badge
      color="white" 
      text-color="black"> 
     <big> Passowrd 
      <span style="color:red"> *</span> </big></q-badge>
      <q-input 
      ref="input"
      v-model="user.password" 
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
      <q-badge 
      color="white" 
      text-color="black"> 
     <big>Confirm Passowrd 
      <span style="color:red"> *</span> </big> </q-badge>
           <q-input 
      v-model="user.confirmpassword" 
      outlined
      color="secondary"
      placeholder=" Passowrd(Confirm)"
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
      <q-badge 
      color="white" 
      text-color="black"> 
     <big> Full Name
     <span style="color:red"> *</span> </big> </q-badge>
       <q-input
        outlined 
        color="secondary"
        v-model="user.fullname"
        maxlength="20"
        placeholder="Full Name"
        lazy-rules
        :rules="[ 
        val => val && val.length > 0 || 'Please type something'
        
        ]"
      />
      
      <div class="text-center">
        <q-badge
        color="white" 
        text-color="black">
        
        <h5><b> More Information </b></h5>
      
    </q-badge>
      </div>
      
<q-badge 

      color="white" 
      text-color="black"> 
    <big> Telephone Number  
      <span style="color:red"> *</span> </big> </q-badge>
      <div class="row">
    <q-select class="col-4"
        outlined
        label=" - Select -"
        color="secondary"
        transition-show="flip-up"
        transition-hide="flip-down"
        v-model="user.phone"
        :options="user.options"
      />
      <q-input class="col-8"
        outlined
        color="secondary"
        v-model="user.phonenumber"
        placeholder="Phone Number"
        mask="##########"

      />
       </div>
         <!-- Gender -->
       <div class="row">
        <q-badge class="col-4"

      color="white" 
      text-color="black"
       > 
    <big> Gender 
     <span style="color:red;"> *</span> </big></q-badge>
         <q-select class="col-8"
        label=" - Select -"
        transition-show="flip-up"
        transition-hide="flip-down"
        outlined
        color="secondary"
        v-model="user.gender"
        :options="user.genders"
      />
       </div>
        <!-- Birthday -->
       <div class="row">
        <q-badge class="col-3"

      color="white" 
      text-color="black" > 
    <big> Birthdate
     <span style="color:red;"> *</span> </big></q-badge>
       </div>
       <div>
        <q-input 
        outlined 
        v-model="user.date"
        mask="date" 
        :rules="['date']"
        color="secondary"
        >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="user.date" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
       </div>
        <!-- City -->
       <div class="row">
        <q-badge class="col-3"
      color="white" 
      text-color="black" > 
    <big> City 
     <span style="color:red;"> *</span> </big></q-badge>
       </div>
    <div> 
      <q-select 
        outlined
        v-model="user.city"
        transition-show="flip-up"
        transition-hide="flip-down"
        color="secondary"
        input-debounce="0"
        fill-input
        label=" - Select -"
        :options="user.citys"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      
    </div>
           <!-- Job -->
       <div class="row">
        <q-badge class="col-3"
      color="white" 
      text-color="black" > 
    <big> Job 
     <span style="color:red;"> *</span> </big></q-badge>
       </div>
    <div> 
      <q-select 
        outlined
        v-model="user.job"
        color="secondary"
        transition-show="flip-up"
        transition-hide="flip-down"
        fill-input
        input-debounce="0"
        label=" - Select -"
        :options="user.jobs"
        @filter="filterFn"
        @filter-abort="abortFilterFn"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      
    </div>

        <!-- Address -->
       <div class="row">
        <q-badge class="col-3"

      color="white" 
      text-color="black" > 
    <big> Address 
     <span style="color:red;"> *</span> </big></q-badge>
       </div>
       <div>
         <q-input
        outlined 
        color="secondary"
        v-model="user.address"
        maxlength="20"
        placeholder="Address"
        lazy-rules
        :rules="[ 
        val => val && val.length > 0 || 'Please type something'
        
        ]"
      />
       </div>
       <!-- Checkox -->
           <q-checkbox 
        v-model="user.checkbox"
        color="secondary"
        label="Do you agree accept the license and terms firsts"
        true-value="yes"
        false-value="no"
      />
     
      <!-- COnfirm -->
      <div>
        <q-btn class="full-width"
        label="Confirm" 
        type="submit" 
        color="primary" 
        text-color="black"/>
      </div>
<!-- place QPageScroller at end of page -->
          <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="white" text-color="black" />
          </q-page-scroller>
    </q-form>
 </div>
</q-page>
</template>
<script>
import  { date }  from 'quasar'
import axios from 'axios';
import { required, email } from 'vuelidate/lib/validators'
const cityOptions = [
  'Seoul', 'Busan', 'Ansan', 'Gwangju', 'Hwaseong','Other'
]
const jobOptions = [
  'IT', 'Student', 'Manager','Other'
]

export default {
  
  data () {
    return {
        isPwd: true,
        loading1: false,
      user : {
       birthdate: '',
      date: 'YYYY/MM/DD',
      genders: ['Male','Female','Other'],
      gender: '',
      pin: '',
      username: '',
      phonenumber: '',
      checkbox: 'no',
      email: '',
      password: '',
      address: '',
      city: '',
      citys: cityOptions,
      job :'',
      jobs : jobOptions,
      confirmpassword: '',
      fullname: '',
      verifycode: '',
      options: ['+84','+86','+1'],
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
      this.email = null
      this.password = null
      this.confirmpassword = null
      this.fullname = null
      this.accept = false
      this.phonenumber = null
      this.gender = null
      this.genders = null
      this.city = null
      this.citys = null
      this.job = null
      this.jobs = null
      this.address = null
      this.date = null
    },
  
  isValidEmail(email){
     return (this.user.email == "")? "" : (this.reg.test(this.user.email)) ? 'has-success' : 'has-error';

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
    filterFn (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.options = cityOptions
            this.options = jobOptions
          }
          else {
            const needle = val.toLowerCase()
            this.options = cityOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
            this.options = jobOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
          }
        })
      }, 1500)
    },

    abortFilterFn () {
      // console.log('delayed filter aborted')
    }
  },

  }


</script>