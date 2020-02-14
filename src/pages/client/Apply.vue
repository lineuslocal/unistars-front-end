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
              <q-item-label lines="1" style="font-size:18px">Success Core 5th Core Recruiment</q-item-label>
              <q-item-label caption lines="2">
                <span class="text-weight-bold">02-01-2020 12:30 ~ 02-01-2020 12:30</span>
                <p class="q-ma-none">Seoul</p>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="q-pl-none">
            <div>
              <h6 class="q-ma-none q-pb-sm" style="font-weight: bold">Requested Education</h6>
              <p class="q-ma-none" style="color:blue">Success Core 5th Core Recruiment</p>
              <p class="q-ma-none">
                50,000KRW X 1 Person / Total
                <b>50,000KRW</b>
              </p>
            </div>
          </q-item>
          <q-item class="q-pl-none">
            <div>
              <div class="text-h6 q-pb-sm" style="font-weight: bold">Applicant Information</div>
              <div class="row items-center q-pb-none">
                <p class="offset-1 col-4 cus-field q-mb-none q-pb-sm">Name</p>
                <p class="col-7 q-ma-none q-pb-sm">Hai An</p>
                <p class="offset-1 col-4 cus-field q-mb-none q-pb-sm">Email</p>
                <p class="col-7 q-ma-none q-pb-sm">An@gmail.com</p>
                <p class="offset-1 col-4 cus-field q-mb-none q-pb-sm">Phone No.</p>
                <p class="col-7 q-ma-none q-pb-sm">0909-090-909</p>
                <p class="offset-1 col-4 cus-field q-mb-none">Belongs</p>
                <p class="col-7 q-ma-none"><q-toggle v-model="loadingState"/></p>
              </div>
            </div>
          </q-item>
          <q-item class="q-pa-none">
            <div class="q-pb-lg q-gutter-y-md column" style="width:100%">
              <h6 class="q-mt-lg q-mb-none" style="font-weight: bold">Additional Information</h6>
              <q-item-label class="q-pa-none">• Please enter your region.<span style="color:red">(Required)</span></q-item-label>
              <q-input
              :loading="loadingState" 
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
          <q-item class="q-pa-none q-pt-md">
            <div>
              <div class="text-h6 q-pb-sm" style="font-weight: bold">Applicant Agree</div>
              <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
                <q-card class="my-card" style="width:100%" flat bordered>
                  <div class="row items-start">
                    <div class="col">
                      <q-item-section>
                        <q-checkbox
                          style="font-weight:bold; width:250px"
                          v-model="accept"
                          color="secondary"
                          label="(Required) Consent to Provision 3 Personal Information"
                          class="q-pt-sm"
                        />
                        <q-dialog v-model="fixed">
                          <q-card>
                            <q-card-section>
                              <div class="text-h6">Terms and Conditions</div>
                            </q-card-section>

                            <q-separator />

                            <q-card-section style="max-height: 50vh" class="scroll">
                              <p
                                v-for="n in 5"
                                :key="n"
                              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
                            </q-card-section>

                            <q-separator />

                            <q-card-actions align="right">
                              <q-btn label="OK" color="primary" v-close-popup />
                            </q-card-actions>
                          </q-card>
                        </q-dialog>
                      </q-item-section>
                    </div>
                    <div class="col q-pt-md" style="margin-left:150px">
                      <q-item-section side top style="height:28px">
                        <q-btn
                          no-caps
                          label="View more"
                          outline
                          @click="fixed = true"
                          style="font-size:10px; height:28px; width:80px"
                        />
                      </q-item-section>
                    </div>
                  </div>
                  <q-item-label
                    class="q-ml-md q-pa-sm"
                  >The applicant's personal information will be provided to the in structor for the purpose of training such as confirmation of application</q-item-label>
                </q-card>
                <div class="q-pa-md q-mt-sm q-gutter-sm text-center">
                  <q-btn
                    no-caps
                    rounded
                    type="submit"
                    label="Complete"
                    color="primary"
                    style="width:250px; font-size:18px"
                  />
                </div>
              </form>
            </div>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      accept: false,
      basic: false,
      fixed: false,
      text: "",
      text2: "",
      loadingState: false
    };
  },
  methods: {
    onSubmit() {
      if (this.accept != true) {
        this.$q.notify({
          color: 'negative',
          message: 'You need to accept the license and terms first'
        })
      } else {
         this.$router.push("/ApplicationHistory")
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted',
        })
      }
    }
  }
};
</script>

