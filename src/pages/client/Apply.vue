<template>
  <q-page>
    <div class="container">
      <div class="q-pa-md q-gutter-md">
        <form @submit.prevent.stop="onSubmit">
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
                  <b>50,000KRW</b> / 1 Person
                </p>
              </div>
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
                  <!-- <p class="col-7 q-ma-none">
                  <button v-on:click="isHidden = !isHidden">Toggle hide and show</button>
                  </p>-->
                </div>
              </div>
            </q-item>
            <q-item class="q-pl-none">
              <p class="q-mb-none" style="width:490px">
                <span class="text-h6" style="font-weight: bold">Ticket quantity</span>
                <span style="color:red; font-size:18px">(Required)</span>
              </p>
              <q-input
                clearable
                ref="ticket"
                :rules="[
                  val => val !== null && val !== '',
                  val => val > 0 && val < 6
                ]"
                v-model.number="ticket"
                type='number'
                style="height: 35px; margin-bottom:10px; padding-top:10px"
              />
            </q-item>
            <q-item class="q-pa-none" v-if="event.addInfors.length > 0">
              <div class="q-pb-lg q-gutter-y-md column" style="width:100%">
                <h6 class="q-mt-lg q-mb-none" style="font-weight: bold">Additional Information</h6>
                <div v-for="(infor, index) in event.addInfors" :key="index">
                  <q-item-label class="q-pa-sm" v-if="infor.isRequired">
                    • {{infor.question}}
                    <span style="color:red">(Required)</span>
                  </q-item-label>
                  <q-item-label class="q-pa-sm" v-if="!infor.isRequired">
                    • {{infor.question}}
                    <span>(Selection)</span>
                  </q-item-label>
                  <q-input
                    class="q-ml-sm q-mr-sm"
                    
                    style="height:30px"
                  />
                </div>
              </div>
            </q-item>
            <q-item class="q-pa-none q-pt-md">
              <div>
                <div class="text-h6 q-pb-sm" style="font-weight: bold">Applicant Agree</div>

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
                  <!-- @click="alert = true" -->

                  <!-- <q-dialog v-model="alert">
                    <q-card>
                      <q-card-section>
                        <div class="text-h6 q-ml-sm">Alert</div>
                      </q-card-section>

                      <q-card-section
                        class="q-pt-none" style="width:320px"
                      >Please accept the Terms and Conditions by pressing the checkbox. You only can complete your application by accept it.</q-card-section>

                      <q-card-actions align="right">
                        <q-btn no-caps label="Back" color="primary" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>-->
                </div>
              </div>
            </q-item>
          </q-list>
        </form>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      applicant: {},
      event: {},
      accept: false,
      basic: false,
      fixed: false,
      text: "",
      alert: false,
      model: null,
      ticket: 1
    };
  },
  created() {
    this.$store.state.Applicant.applicants.forEach(applicant => {
      if (applicant.id == 1) {
        this.applicant.id = applicant.id;
        this.applicant.state = applicant.state;
        this.applicant.name = applicant.name;
        this.applicant.email = applicant.email;
        this.applicant.phone = applicant.phone;
        this.applicant.belongs = applicant.belongs;
      }
    }),
      this.$store.state.Event.events.forEach(event => {
        if (event.id == 1) {
          this.event.id = event.id;
          this.event.addInfors = event.addInfors;
        }
      });
  },
  methods: {
    onSubmit() {
      this.$refs.ticket.validate()
      if (this.$refs.ticket.hasError) {
        this.$q.notify({
          icon: "warning",
          color: "red",
          message: "Do not require and No more than 5 select tickets",
          timeout: 800
        })
      }
      else if (this.accept != true) {
        this.$q.dialog({
          title: "Alert",
          message:
            "Please accept the Terms and Conditions by pressing the checkbox. You only can complete your application by accept it.",
          ok: "Back"
        })
      } 
      else {
        this.$router.push("/ApplicationHistory");
        this.$q.notify({
          icon: "done",
          color: "green",
          message: "Submitted",
          timeout: 500
        });
      }
    }
  }
}
</script>

