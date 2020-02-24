<template>
  <q-page>
    <div class="container">
      <div class="q-pa-md q-gutter-md">
        <q-list class="rounded-borders" separator>
          <q-item class="q-pa-none q-pb-sm">
            <q-item-section avatar>
              <q-avatar size="70px">
                <img
                  :src="history.eventImg"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" style="font-size:18px">{{history.eventName}}</q-item-label>
              <q-item-label caption lines="2">
                <span class="text-weight-bold">{{history.startDate}} ~ {{history.endDate}}</span>
                <p class="q-ma-none">{{history.eventAddress}}</p>
              </q-item-label>
              <q-icon name="far fa-calendar-alt" size="25px" style="margin-left:90%">
                <q-popup-proxy
                  @before-show="updateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="proxyDate">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Cancel" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </q-item-section>
            <!-- <div class="q-pa-md">
              <q-btn icon="event" round>
                <q-popup-proxy
                  @before-show="updateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="proxyDate">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Cancel" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-btn>
            </div>-->
          </q-item>
          <q-item>
            <p class="q-ma-none absolute-center">
              The education is
              <span style="color:blue">{{history.status}}</span>
            </p>
          </q-item>
          <q-item class="q-pl-none">
            <div>
              <div class="text-h6 q-pb-sm" style="font-weight: bold">Applicant Information</div>
              <div class="row items-center q-pb-none">
                <p class="offset-1 col-4 cus-field q-mb-none q-pb-sm">Name</p>
                <p class="col-7 q-ma-none q-pb-sm">{{applicant.name}}</p>
                <p class="offset-1 col-4 cus-field q-mb-none q-pb-sm">Email</p>
                <p class="col-7 q-ma-none q-pb-sm">{{applicant.email}}</p>
                <p class="offset-1 col-4 cus-field q-mb-none q-pb-sm">Phone No.</p>
                <p class="col-7 q-ma-none q-pb-sm">{{applicant.phone}}</p>
                <p class="offset-1 col-4 cus-field q-mb-none q-pb-sm">Belongs</p>
                <p class="col-7 q-ma-none q-pb-sm">{{applicant.belongs}}</p>
              </div>
            </div>
          </q-item>
          <q-item class="q-pl-none">
                <p class="q-mb-none text-h6" style="margin-left:0"><span style="font-weight: bold">Ticket quantity</span></p>
                <p class="q-ma-none q-pl-lg" style="font-size:20px">{{history.ticketQuan}}</p>
          </q-item>
          <q-item class="q-pa-none" v-if="history.addInfor.length > 0">
            <div class="q-pb-lg q-gutter-y-md column" style="width:100%">
              <h6 class="q-mt-lg q-mb-none" style="font-weight: bold">Additional Information</h6>
              <div v-for="(infor, index) in history.addInfor" :key="index">
              <q-item-label class="q-pa-sm" v-if="infor.isRequired">• {{infor.question}}<span style="color:red">&nbsp;(Required)</span></q-item-label>
              <q-item-label class="q-pa-sm" v-if="!infor.isRequired">• {{infor.question}}<span>&nbsp;(Selection)</span></q-item-label>
              <q-input disable class="q-ml-sm" v-model="infor.answer" style="height:30px" />
              </div>
            </div>
          </q-item>
          <div class="q-pa-md q-mt-sm q-gutter-sm text-center">
            <q-btn
              no-caps
              rounded
              label="Go to main"
              @click="go"
              color="primary"
              style="width:130px;font-size:18px"
            />
            <q-btn
              v-if="history.addInfor.length > 0"
              no-caps
              rounded
              label="Edit"
              @click="goEdit"
              color="primary"
              style="width:130px;font-size:18px"
            />
          </div>
        </q-list>
      </div>
    </div>
    <!-- <div id="app">
  <div class='authentification'>
    Authentification
    <button v-if='!authorized' @click="handleAuthClick">Sign In</button>
    <button v-if='authorized' @click="handleSignoutClick">Sign Out</button>
  </div>
  <hr>
  <button v-if='authorized' @click="getData">Get Data</button>
  <div class="item-container" v-if="authorized && items">
    <pre v-html="items"></pre>
  </div>
</div> -->
  </q-page>
</template>
<script>

// const CLIENT_ID = '564508689028-3o8clqp45mhn4k4t5kfal03vd0coc7at.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyAHR1kZq5en9oA7FDTjABS1G6UpaGwQ6lA';
// // Array of API discovery doc URLs for APIs used by the quickstart
// const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
// // Authorization scopes required by the API; multiple scopes can be
// // included, separated by spaces.
// const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

export default {
  data() {
    return {
      applicant: {},
      history: {},
      date: null,
      proxyDate: null,
      // items: undefined,
      // api: undefined,
      // authorized: false
    }
  },
  created() {
    this.$store.state.Applicant.applicants.forEach(applicant => {
      if (applicant.id == 1) {
        this.applicant.id = applicant.id
        this.applicant.state = applicant.state
        this.applicant.name = applicant.name  
        this.applicant.email = applicant.email
        this.applicant.phone = applicant.phone
        this.applicant.belongs = applicant.belongs
      }
    })
    this.$store.state.History.events.forEach(history => {
      if(history.id == this.$route.params.id){
        this.history.id = history.id
        this.history.eventImg = history.eventImg
        this.history.eventName = history.eventName
        this.history.startDate = history.startDate
        this.history.endDate = history.endDate
        this.history.eventAddress = history.eventAddress
        this.history.status = history.status
        this.history.addInfor = history.addInfor
        this.history.ticketQuan = history.ticketQuan
      }
    })
    // this.api = gapi
    // this.handleClientLoad()
  },
  methods: {
    updateProxy() {
      this.proxyDate = this.date;
    },
    save() {
      this.date = this.proxyDate;
    },
    go() {
      this.$router.push("/event/");
    },
    goEdit(id) {
      this.$router.push("/ApplicationHistory/Edit");
    },
    // handleClientLoad() {
    //   this.api.load('client:auth2', this.initClient);
    // },
    // initClient() {
    //   let vm = this;

    //   vm.api.client.init({
    //     apiKey: API_KEY,
    //     clientId: CLIENT_ID,
    //     discoveryDocs: DISCOVERY_DOCS,
    //     scope: SCOPES
    //   }).then(_ => {
    //     // Listen for sign-in state changes.
    //     vm.api.auth2.getAuthInstance().isSignedIn.listen(vm.authorized);
    //   });
    // },
    // handleAuthClick(event) {
    //   Promise.resolve(this.api.auth2.getAuthInstance().signIn())
    //     .then(_ => {
    //       this.authorized = true;
    //     });
    // },
    // handleSignoutClick(event) {
    //   Promise.resolve(this.api.auth2.getAuthInstance().signOut())
    //     .then(_ => {
    //       this.authorized = false;
    //     });
    // },
    // getData() {
    //   let vm = this;

    //   vm.api.client.calendar.events.list({
    //     'calendarId': 'primary',
    //     'timeMin': (new Date()).toISOString(),
    //     'showDeleted': false,
    //     'singleEvents': true,
    //     'maxResults': 10,
    //     'orderBy': 'startTime'
    //   }).then(response => {
    //     vm.items = this.syntaxHighlight(response.result.items);
    //     console.log(vm.items);
    //   });
    // },
    // syntaxHighlight(json) {
    //   if (typeof json != 'string') {
    //     json = JSON.stringify(json, undefined, 2);
    //   }
    //   json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    //   return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
    //     var cls = 'number';
    //     if (/^"/.test(match)) {
    //       if (/:$/.test(match)) {
    //         cls = 'key';
    //       } else {
    //         cls = 'string';
    //       }
    //     } else if (/true|false/.test(match)) {
    //       cls = 'boolean';
    //     } else if (/null/.test(match)) {
    //       cls = 'null';
    //     }
    //     return '<span class="' + cls + '">' + match + '</span>';
    //   });
    // }
  }
};
</script>

