<template>
  <q-page>
    <div class="container">
      <div class="q-pa-md q-gutter-md">
        <q-list class="rounded-borders" separator>
          <q-item class="q-pa-none q-pb-md">
            <q-item-section avatar>
              <q-avatar size="70px">
                <img
                  src="https://www.chinashoreexcursion.com/wp-content/uploads/China-New-Year-Spring-Festival-in-China-2020.jpg"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1" style="font-size:18px">Success Core 5th Core 5th Core</q-item-label>
              <q-item-label caption lines="2">
                <span class="text-weight-bold">02-01-2020 12:30 ~ 02-01-2020 12:30</span>
                <p class="q-ma-none">Seoul</p>
              </q-item-label>
            </q-item-section>
            <div class="q-pa-md">
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
            </div>
          </q-item>
          <q-item>
            <p class="q-ma-none absolute-center">The education is <span style="color:blue">confirm</span></p>
          </q-item>
          <q-item class="q-pl-none">
            <div>
              <div class="text-h5 q-pb-sm" style="font-weight: bold">Applicant Information</div>
              <div class="row items-center q-pb-none">
                <p class="offset-1 col-4 cus-field q-mb-none q-pb-sm">Name</p>
                <p class="col-7 q-ma-none q-pb-sm">Hai An</p>
                <p class="offset-1 col-4 cus-field q-mb-none q-pb-sm">Email</p>
                <p class="col-7 q-ma-none q-pb-sm">An@gmail.com</p>
                <p class="offset-1 col-4 cus-field q-mb-none q-pb-sm">Phone No.</p>
                <p class="col-7 q-ma-none q-pb-sm">0909-090-909</p>
                <p class="offset-1 col-4 cus-field q-mb-none q-pb-sm">Belongs</p>
                <p class="col-7 q-ma-none q-pb-sm"></p>
              </div>
            </div>
          </q-item>
          <q-item class="q-pa-none">
            <div class="q-pa-none q-gutter-y-md column" style="width:100%">
              <h5 class="q-mt-lg q-mb-none" style="font-weight: bold">Additional Information</h5>
              <q-item-label class="q-pa-none">• Please enter your region.<span style="color:red">(Required)</span></q-item-label>
              <q-input
                v-model="text"
                style="height:30px"
              />
              <q-item-label class="q-pa-none q-pt-sm">• Please enter sponsor.(Selection)</q-item-label>
              <q-input
                v-model="text2"
                style="height:30px"
              />
            </div>
          </q-item>
          <div class="q-pa-md q-mt-sm q-gutter-sm text-center">
                <q-btn no-caps rounded label="Go to main" color="primary" style="width:130px;font-size:18px"/>
                <q-btn no-caps rounded label="Edit" color="primary" style="width:130px;font-size:18px"/>
          </div>
        </q-list>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      model: null,
      options: ["Newest", "Date"],
      date: null,
      proxyDate: null,
      text: '',
      text2: ''
    };
  },
  methods: {
    confirm() {
      this.$q
        .dialog({
          title: "Arlet",
          message:
            "Do you really want to cancel your participant in this event?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // console.log('>>>> OK')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },
    scrolled(position) {},
    updateProxy() {
      this.proxyDate = this.date;
    },
    save() {
      this.date = this.proxyDate;
    }
  }
};
</script>

<style lang="scss">
.a {
  padding-left: 20px;
  margin-bottom: 2px;
}
</style>
