<template>
  <div class="q-pa-md">
    <q-list>
      <q-item class="ad_border">
        <q-item-section>
          <q-item-label class="absolute-center text-weight-bold">
            <h4>
              <b>Add</b>
            </h4>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <q-item class="row ad_border">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="horizontal_split" />
          </q-avatar>
        </q-item-section>
        <q-item-section v-for="pd in pd_true" :key="pd.id">
          <q-item-label>{{pd.name}}</q-item-label>
        </q-item-section>
        <q-item-section class="text-right">
          <q-item-label>
            <q-btn to="/reset-manager-AdProd" label="Select" flat @click="resetStatusCb" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row ad_border">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="restaurant" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Unit</q-item-label>
        </q-item-section>
        <q-item-section class="text-right">
          <q-item-label>Pill</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row ad_border">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="fas fa-sort-amount-down-alt" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Amount</q-item-label>
        </q-item-section>
        <q-item-section class="absolute-right">
          <q-item-label>
            <!-- <q-input v-model="date" filled type="date" date-format="YYYY-MM-DD" /> -->
            <q-input
              v-model.number="model"
              type="number"
              filled
              style="max-width: 50px"
              class="justify-center"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row ad_border">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="fas fa-hourglass-start" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Start</q-item-label>
        </q-item-section>
        <q-item-section class="absolute-right">
          <q-item-label>
            <q-input v-model="date" filled type="date" date-format="YYYY-MM-DD" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row ad_border">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="far fa-clock" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Schedule</q-item-label>
        </q-item-section>
        <q-item-section class="absolute-right">
          <q-item-label>everyday</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row ad_border">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="fas fa-stopwatch" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Frequency</q-item-label>
        </q-item-section>
        <q-item-section class="absolute-right">
          <q-item-label>
            <div class="cursor-pointer">
              {{ time }} time(s)/day
              <q-popup-edit v-model="time">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input
                    type="number"
                    autofocus
                    dense
                    :value="time"
                    hint="Please type number"
                    @input="emitValue"
                    :rules="[
                            val => validate(val) !== null && validate(val) !== '' && validate(val) >0 && validate(val) <= 3|| 'Please type number',
                          ]"
                  >
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel" />
                      <q-btn
                        flat
                        dense
                        color="positive"
                        icon="check_circle"
                        @click.stop="set"
                        :disable="validate(value) === false || initialValue === value"
                      />
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row ad_border">
        <q-item-section>
          <q-input v-model="input_time" type="time" />
        </q-item-section>
        <q-item-section>
          <q-input v-model="input_time" type="time" />
        </q-item-section>
        <q-item-section>
          <q-input v-model="input_time" type="time" />
        </q-item-section>
        <q-item-section class="absolute-right">
          <q-toggle v-model="accept" />
        </q-item-section>
      </q-item>
      <q-item class="row ad_border">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="fas fa-step-forward" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Duration</q-item-label>
        </q-item-section>
        <q-item-section class="absolute-right">
          <q-item-label>
            <div class="cursor-pointer">
              {{duration}}
              <q-popup-edit v-model="duration">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input
                    autofocus
                    dense
                    :value="duration"
                    hint="Your nickname"
                    @input="emitValue"
                  >
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel" />
                      <q-btn
                        flat
                        dense
                        color="positive"
                        icon="check_circle"
                        @click.stop="set"
                        :disable="validate(value) === false || initialValue === value"
                      />
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="row ad_border">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="receipt" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Memo</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <q-btn class="absolute-bottom" color="primary" style="width:50%;">Cancel</q-btn>
        </div>
        <div class="col">
          <q-btn
            class="absolute-bottom-right"
            color="primary"
            style="width:50%;"
            @click="saveListPdUser"
          >Save</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "2020-02-21",
      model: 1,
      time: 2,
      input_time: "09:00",
      accept: false,
      duration: "week",
      pd_true: []
    };
  },
  created: function() {
    this.$store.state.Business.products_add.forEach(e => {
      if (e.cb_product) {
        this.pd_true.push(e);
      }
    });
  },
  methods: {
    saveListPdUser() {
      this.$store.state.Business.products_add.forEach(e => {
        if (e.cb_product) {
          this.$store.commit("Business/saveListPdUser", {
            name_pd: e.name,
            id_color: e.id_color,
            unit: "pill",
            amount: this.model,
            start: this.date,
            schedule: "everyday",
            frequence: this.time,
            duration: "week"
          });
          this.$router.push("/reset-manager");
        }
      });
    },
    resetStatusCb() {
      this.$store.state.Business.products_add.forEach(e => {
        if (e.cb_product) {
          this.$store.commit("Business/resetStatusCb", e.id);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.ad_border {
  border-bottom: 1px solid black;
}
</style>
