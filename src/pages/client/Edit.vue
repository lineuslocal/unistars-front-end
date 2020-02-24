<template>
  <q-page>
    <div class="q-pa-md q-gutter-md">
      <q-list class="rounded-borders" separator>
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
        <q-item class="q-pa-none">
          <div class="q-pa-none q-gutter-y-md column" style="width:100%">
            <h6 class="q-mt-lg q-mb-none" style="font-weight: bold">Additional Information</h6>
            <q-form>
              <!-- <div v-for="(infor, index) in history.addInfor" :key="index">
              <q-item-label class="q-pa-sm" v-if="infor.isRequired">• {{infor.question}}<span style="color:red">&nbsp;(Required)</span></q-item-label>
              <q-item-label class="q-pa-sm" v-if="!infor.isRequired">• {{infor.question}}<span>&nbsp;(Selection)</span></q-item-label>
              <q-input class="q-ml-sm" v-model="infor.answer" style="height:30px" />
              </div> -->
              <q-item-label class="q-pl-md">
                • Please enter your region.
                <span style="color:red">(Required)</span>
              </q-item-label>
              <q-input class="q-pl-md q-pr-md" v-model="text" style="height:30px">
                <template v-slot:append>
                  <q-icon v-if="text === ''" />
                  <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
                </template>
              </q-input>
              <q-item-label class="q-mt-md q-pt-md q-pl-md">• Please enter sponsor.(Selection)</q-item-label>
              <q-input class="q-pl-md q-pr-md" v-model="text2" style="height:30px">
                <template v-slot:append>
                  <q-icon v-if="text2 === ''" />
                  <q-icon v-else name="clear" class="cursor-pointer" @click="text2 = ''" />
                </template>
              </q-input>
              <div class="q-pa-md q-mt-sm q-gutter-sm text-center">
                <q-btn no-caps rounded label="Done" type="submit" color="primary" style="width: 120px" />
              </div>
            </q-form>
          </div>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      applicant: {},
      history: {},
      text: "",
      text2: "",
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
        this.applicant.addInfor = applicant.addInfor
      }
    }),
    this.$store.state.History.events.forEach(history => {
      if(history.id == this.$route.params.id){
        this.history.addInfor = history.addInfor
      }
    })
  },
  methods: {
    go() {
      this.$router.push("/event/");
    }
  }
};
</script>

<style lang="scss">
</style>
