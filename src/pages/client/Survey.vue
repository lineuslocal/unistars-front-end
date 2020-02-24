<template>
  <q-page>
    <div>
      <h5 class="q-ma-md" style="text-align:center">{{history.eventName}}</h5>
    </div>
    <div class="q-pa-none q-gutter-md">
      <q-list class="rounded-borders">
        <q-item v-for="(survey, survey_index) in history.surveys" :key="survey_index">
          <q-card class="my-card full-width" style="border-radius:10px">
            <div>
              <p
                class="caption q-pa-sm q-ma-none"
                style="font-weight: bold"
              >Question. {{survey.queSurvey}}</p>
                  <div class="col-11 cus-selection" style="margin-left:30px">
                    <q-item dense v-for="(selection, index) in survey.selections" :key="index" style="padding: 0px;">
                      <q-radio size="xs" :label="survey.selections[index]" value="A" val=''/>
                    </q-item>
                  </div>
              <!-- <q-option-group type="radio" color="secondary" size="xs" v-model="group" :options="options" class="q-pl-lg q-pb-sm" /> -->
            </div>
          </q-card>
        </q-item>
        <q-item></q-item>
        <q-item></q-item>
        <div class="q-pa-md q-mt-sm q-gutter-sm text-center">
          <q-btn
            no-caps
            v-go-back.single
            rounded
            label="Back"
            color="primary"
            style="width:130px;font-size:14px;height:35px"
          />
          <q-btn
            no-caps
            rounded
            label="Submit"
            color="primary"
            style="width:130px;font-size:14px;height:35px"
          />
        </div>
      </q-list>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      group: null,
      history: {},
      options: [
        { label: "Very good", value: "good" },
        { label: "Normal", value: "narmal" },
        { label: "Not so good", value: "not good" }
      ]
    };
  },
  created() {
    this.$store.commit("changeTitle", "Survey")
    this.$store.commit("changeShowBack", true)
    this.$store.commit("changeShowMenu", true)

    this.$store.state.History.events.forEach(history => {
      if(history.id == this.$route.params.id){
        this.history.eventName = history.eventName
        this.history.surveys = history.surveys
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
