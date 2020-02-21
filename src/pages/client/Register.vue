<template>
  <q-page class="flex  q-pa-lg">
    <div class="full-width">
      <q-toolbar class="flex flex-center"
        color="white"
        text-color="black">
        <h5>Sign Up</h5>
      </q-toolbar>
      <div class="col-12 q-my-md text-center">
        <span class="text-h6">Basic Information</span>
      </div>
      <div>
       <p> User ID
     <span style="color:red"> *</span> </p>
     </div>
      <div class="row">
        <q-input class="col-12"
          color="green"
          outlined
          type="email"
          placeholder="Email"
          v-model="form.email"
          @input="$v.form.email.$touch()"
          :error="$v.form.email.$error"
          maxlength="50"
          clearable
        ></q-input>
      </div>
      <q-btn v-on:click="isHidden = !isHidden" class="full-width"
    dark-percentage
    :disable="isDisabledemail()"
    :outline="isDisabledemail()"
    no-ripple
    type="submit"
    :loading="loading1"
    text-color="black"
    color="white" @click="showNotif" label="Send Verication Code" />
      <div v-if="!isHidden">
      <div>
        <br>
       <p> Verify Code
     <span style="color:red"> *</span> </p>
     </div>
       <div class="row">
        <q-input class="col-12"
          color="green"
          placeholder="Verify Code"
          outlined
          v-model="form.code"
          @input="$v.form.code.$touch()"
          :error="$v.form.code.$error"
          maxlength="6"
          clearable
        ></q-input>
              </div>
            <div class="row">
         <q-btn class="col-12"
    dark-percentage
    :disable="isDisabledcode()"
    :outline="isDisabledcode()"
    :loading="loading2"
    color="secondary" @click="showNotifcode"> Verify </q-btn>
    </div>
      </div>
      <br>
      <div>
       <p> Password
     <span style="color:red"> *</span> </p>
     </div>
      <div class="col-12 q-mb-sm">
        <q-input
          outlined
          color="green"
          :type="isPwd ? 'password' : 'text'"
          placeholder="Password"
          v-model="form.password"
          maxlength="20"
          :error="$v.form.password.$invalid"
          clearable
        >
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
       <p> Confirm Password
     <span style="color:red"> *</span> </p>
     </div>
      <div class="col-12 q-mb-sm">
        <q-input
          outlined
          color="green"
          :type="isConfPwd ? 'password' : 'text'"
          placeholder="Password (Confirm )"
          v-model="form.confirmPassword"
          maxlength="20"
          :error="$v.form.confirmPassword.$invalid"
          clearable
        >
          <template v-slot:append>
            <q-icon
              :name="isConfPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isConfPwd = !isConfPwd"
            />
          </template>
        </q-input>
      </div>
      <div :class="[{ hide: hideWarning() }, 'q-mb-lg']">
        <small class="text-red">* The passwords are not the same!</small>
      </div>
      <div>
       <p> Full Name
     <span style="color:red"> *</span> </p>
     </div>
       <div class="col-12">
        <q-input
          color="green"
          placeholder="Full Name"
          outlined
          v-model="form.name"
          @input="$v.form.name.$touch()"
          :error="$v.form.name.$error"
          maxlength="100"
          clearable
        ></q-input>
      </div>
       <div>
       <p> English Name
     <span style="color:red"> *</span> </p>
     </div>
       <div class="row">
        <q-input class="col-7"
          color="green"
          placeholder="First Name"
          outlined
          v-model="form.firstname"
          @input="$v.form.firstname.$touch()"
          :error="$v.form.firstname.$error"
          maxlength="10"
          clearable
        ></q-input>
        <q-input class="col-5"
          color="green"
          placeholder="Last Name"
          outlined
          v-model="form.lastname"
          @input="$v.form.lastname.$touch()"
          :error="$v.form.lastname.$error"
          maxlength="10"
          clearable
        ></q-input>
      </div>
      <div class="col-12 q-my-md text-center">
        <span class="text-h6">More Information</span>
      </div>
        <div>
       <p> Telephone number
     <span style="color:red"> *</span> </p>
     </div>
       <div class="row">
         <q-select class="col-4"
        outlined
        color="green"
        @input="$v.form.phone.$touch()"
          :error="$v.form.phone.$error"
        v-model="form.phone"
        :options="phoneOptions"
        :label="form.phone ? undefined : '- Select -'"
      />
         <q-input class="col-8"
        type="number"
          color="green"
          placeholder="Phone Number"
          outlined
          v-model="form.phonenumber"
          @input="$v.form.phonenumber.$touch()"
          :error="$v.form.phonenumber.$error"
          maxlength="100"
          clearable
        />
      </div>
       <div class="row">
         <div class="col-4">
           <br>
       <p> Gender
     <span style="color:red"> *</span></p></div>
     <br>
       <q-select class="col-8"
      @input="$v.form.gender.$touch()"
      :error="$v.form.gender.$error"
      v-model="form.gender"
      color="green"
      outlined
      :label="form.gender ? undefined : '- Select -'"
     :options="genderOptions"
    />
    </div>
        <div>
       <p> Birthdate
     <span style="color:red"> *</span> </p>
     </div>
      <div>
        <q-input
        color="green"
         @input="$v.form.date.$touch()"
      :error="$v.form.date.$error"
        outlined
        placeholder="yyyy/mm/dd"
        v-model="form.date" mask="date" :rules="['date']">
        <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="form.date" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
       </div>
        <div>
       <p> City
     <span style="color:red"> *</span> </p>
     </div>
       <q-select
      v-model="form.city"
      color="green"
       @input="$v.form.city.$touch()"
        :error="$v.form.city.$error"
      outlined
      :label="form.city ? undefined : '- Select -'"
      radio
     :options="selectOptions"
    />
     <div>
       <p> Job
     <span style="color:red"> *</span> </p>
     </div>
       <q-select
        @input="$v.form.job.$touch()"
      :error="$v.form.job.$error"
      v-model="form.job"
      outlined
      color="green"
      :label="form.job ? placeholder : '- Select -'"
     :options="jobOptions"
    />
      <q-checkbox
     v-model="form.check"
     @input="$v.form.check.$touch()"
      :error="$v.form.check.$error"></q-checkbox>
      &nbsp; &nbsp; I agree with the <u
     v-once
     no-ripple
     @click="fixed = true">Term and Conditions </u>
       <q-dialog v-model="fixed">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Conditions</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 90vh" class="scroll">
          <p v-for="n in 1" :key="n">Do you agree </p>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" @click="form.check" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
      <div class="col-12 q-mb-sm">
        <q-btn
          label="Confirm"
          color="primary"
          class="full-width"
          @click="register()"
          :disable="isDisabled()"
          :outline="isDisabled()"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { required, sameAs, minLength, maxLength, email } from 'vuelidate/lib/validators'
import {
  mapActions
} from 'vuex'
import SocialNetwork from 'src/mixins/SocialNetwork'
export default {
  props: {
    openDialog: Function
  },
  mixins: [SocialNetwork],
  data () {
    return {
      isPwd: true,
      isConfPwd: true,
      loading1: false,
      loading2: false,
      fixed: false,
      isHidden: true,
      selectOptions: [
        {
          label: 'Seoul',
          value: 'seoul'
        },
        {
          label: 'Busan',
          value: 'busan'
        }
      ],
      jobOptions: [
        {
          label: 'IT',
          value: 'information technolocy'
        },
        {
          label: 'Manager',
          value: 'manager'
        }
      ],
      genderOptions: [
        {
          label: 'Male',
          value: 'male'
        },
        {
          label: 'Female',
          value: 'female'
        },
        {
          label: 'Other',
          value: 'gioitinhthu3'
        }
      ],
      phoneOptions: [
        {
          label: '+84',
          value: 'vietnam'
        },
        {
          label: '+82',
          value: 'korea'
        }
      ],
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        phonenumber: '',
        phone: '',
        date: '',
        options: '',
        code: '',
        city: '',
        job: '',
        gender: '',
        check: false,
        isAtivo: true
      },
      formReset: {}
    }
  },
  mounted () {
    this.formReset = { ...this.form }
    this.$v.form.$touch()
  },
  methods: {
    ...mapActions('Auth', ['Register']),
    register () {
      let _form = { ...this.form }
      this.sendRegister(_form)
    },
    sendRegister (form) {
      this.$q.loading.show()
      this.Register(form)
        .then((user) => {
          if (user) {
            this.$q.notify({ message: 'Registered with success', color: 'positive', timeout: 1000 })
            this.$router.replace('/')
          }
        })
        .catch((err) => {
          this.$q.notify({ message: 'Registered Error!', color: 'red', timeout: 1000 })
          this.$router.replace('/user/register')
          console.error(err)
        })
        .finally(() => this.$q.loading.hide())
    },
    authSocialNetwork (network) {
      let callback = (json) => {
        let title = 'Hello'
        let message = `Welcome, ${json.name}. Would you like to register now?`
        this.openDialog(title, message, () => {
          let _form = { ...this.formReset }
          _form.name = json.name
          _form.email = json.email
          this.sendRegister(_form)
        })
      }
      if (network === 'facebook') { this.authFacebook(callback) } else { this.authGoogle(callback) }
    },
    isDisabled () {
      return this.$v.form.$invalid || this.$v.form.$error
    },
    isDisabledemail () {
      return this.$v.form.email.$invalid || this.$v.form.email.$error
    },
    isDisabledcode () {
      return this.$v.form.code.$invalid || this.$v.form.code.$error
    },
    hideWarning () {
      return !this.$v.form.password.required || !this.$v.form.confirmPassword.required ||
        this.$v.form.password.sameAs
    },
    showNotif () {
      if (this.showNotif !== true) {
        this.$q.notify({
          position: 'bottom-right',
          message: 'We have sent you verication code by email',
          color: 'indigo-10',
          timeout: 1000
        })
      }
    },
    showNotifcode () {
      if (this.showNotif !== true) {
        this.$q.notify({
          position: 'bottom-right',
          message: 'Success! Vericated Code',
          color: 'green',
          timeout: 1000
        })
      } else {
        this.$q.notify({
          position: 'bottom-right',
          message: 'Code Error! Please train again',
          color: 'Red',
          timeout: 1000
        })
      }
    }
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(100)
      },
      email: {
        email,
        required,
        maxLength: maxLength(50)
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(32),
        sameAs: sameAs('confirmPassword')
      },
      confirmPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(32),
        sameAs: sameAs('password')
      },
      firstname: {
        required,
        maxLength: maxLength(20)
      },
      lastname: {
        required,
        maxLength: maxLength(10)
      },
      phone: {
        required,
        maxLength: maxLength(3)
      },
      phonenumber: {
        required,
        maxLength: maxLength(10)
      },
      date: {
        required
      },
      code: {
        required,
        maxLength: maxLength(6)
      },
      gender: {
        required
      },
      city: {
        required
      },
      job: {
        required
      },
      check: {
        required
      }
    }
  }
}
</script>
<style>
.hide {
  display: none;
}
.text {
text-transform: lowercase;

}
</style>
