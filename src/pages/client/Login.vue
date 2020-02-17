<template>
<q-page class="flex q-pa-lg">
    <div class="full-width">
      <br>
      <div class="text-center"
        color="white"
        text-color="black">
        <h4>Login</h4>
      </div>
          <div class="text-center"
        color="white"
        text-color="black">
        <p>Please enter your account.</p>
      </div>
    <div class="col-12">
        <q-input
          placeholder="E-mail"
          outlined
          type="email"
          v-model="form.email"
          :error="$v.form.email.$invalid"
          maxlength="50"
          clearable
        ></q-input>
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
      <div class="col-12 q-mb-sm">
        <q-btn
          label="Sign In"
          color="primary"
          class="full-width"
          @click="signIn()"
          :disable="isDisabled()"
          :outline="isDisabled()"
        ></q-btn>
      </div>
      <br>
       <div class="flex flex-center">
       <p class="col-6"
          v-once
          @click="finduser = true" >
            Forgot your password? &nbsp; &nbsp; / </p>
            <p class="col-6" @click="signup"
            v-once
            no-ripple
            >&nbsp; Signup</p>
      </div>
      <q-dialog v-model="finduser">
      <q-card>
        <q-card-section>
          <div class="text-h6">Verify UserID</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 90vh" class="scroll">
           <div >
       <q-input class="flex flex-center"
          outlined
          placeholder="E-Mail"
          type="email"
          v-model="findemail"
          :error="$v.findemail.$invalid"
          maxlength="50"
          clearable
        ></q-input>
      </div>
         * Please enter the  e-mail address you created during registration. <br>
            A temporary password will be issued to you by e-mail.
        </q-card-section>
        <q-separator />
        <div class="row">
          <q-btn class="col-6" label="Cancel" color="grey-6" v-close-popup />
          <q-btn
           class="col-6" label="Confirm" color="primary" to="/Verify"  />
        </div>
      </q-card>
    </q-dialog>
    <br>
    <br>
    <div class="row">
    </div>
      <div class="flex flex-center text-center">
        <p>Or signup with</p>
      </div>
      <div class="flex flex-center">
     <q-btn
          round
          @click="authSocialNetwork('google')"
          size="18px"
          text-color="deep-orange"
          color="white"
          icon="fab fa-google"
        ></q-btn>
      <br>
      &#160;
      &#160;
       <div class="row">
        <q-btn
          round
          @click="authSocialNetwork('facebook')"
          size="18px"
          text-color="blue-6"
          color="white"
          icon="fab fa-lg fa-facebook-f"
        ></q-btn>
      </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import SocialNetwork from 'src/mixins/SocialNetwork'
export default {
  props: {
    openDialog: Function
  },
  mixins: [SocialNetwork],
  data () {
    return {
      finduser: false,
      findemail: '',
      isPwd: true,
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
  },
  mounted () {
    this.$v.form.$touch()
  },
  methods: {
    ...mapActions('Auth', ['AuthLogin']),
    authSocialNetwork (network) {
      let callback = (json) => {
        let form = {
          email: json.email,
          isSocialNetwork: true
        }
        console.log('form', form)
        this.signIn(form)
      }
      if (network === 'facebook') { this.authFacebook(callback) } else { this.authGoogle(callback) }
    },
    signIn (form) {
      if (!form) { form = this.form }
      this.$q.loading.show()
      this.AuthLogin(form)
        .then((user) => {
          if (user) {
            this.$q.notify({ message: 'Authenticated with success', color: 'positive', timeout: 1000 })
            this.$router.replace('/index')
          }
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => this.$q.loading.hide())
    },
    isDisabled () {
      return this.$v.form.$invalid || this.$v.form.$error
    },
    signup () {
      this.$router.push('/register')
    }
  },
  validations: {
    findemail: {
      email,
      required,
      maxLength: maxLength(50)
    },
    form: {
      email: {
        email,
        required,
        maxLength: maxLength(50)
      },
      password: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20)
      }
    }
  }
}
</script>
