<template>
  <q-page>
    <div class="container">
      <q-page-sticky position="top" expand class="bg-grey-1" style="z-index: 2000">
        <q-toolbar class="text-white rounded-borders flex justify-between q-pa-none">
          <!-- <q-search
            v-model="date"
            mask="date"
            :rules="['date']"
            class="full-width"
            debounce="500"
            filled
            style="padding:10px 0 10px 10px"
          >
            <template v-slot:append>
              <q-icon name="search" v-if="search === ''" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
            </template>
          </q-search>-->

          <!-- <q-input outlined dense clearable v-model="date" class="full-width q-pr-sm q-pl-sm">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
            </q-popup-proxy>
            <template v-slot:append>
              <q-btn @click.stop="sortByDate" flat="flat" dense="dense" round="round">
                <q-icon name="search" />
              </q-btn>
            </template>
          </q-input>-->

          <q-input outlined dense v-model="filterEvent" class="full-width q-pr-sm q-pl-sm">
            <template v-slot:append>
              <q-icon v-if="filterEvent === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="filterEvent = ''" />
            </template>
          </q-input>
          <q-select
            dense
            outlined
            v-model="model"
            :options="options"
            style="padding: 10px 8px 10px 0"
            options-selected-class="text-weight-bold"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section>
                  <q-item-label v-html="scope.opt.label" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-toolbar>
        <h6 class="q-ma-none" style="margin-right:40%">
          Total
          <span style="color:blue">{{count}} education(s)</span>
        </h6>
        <q-separator style="width:100%;margin:10px 0 0 0;" inset="item" />
      </q-page-sticky>
      <div v-scroll="scrolled">
        <div class="scrolled">
          <div class="q-pa-md q-gutter-md">
            <q-list class="rounded-borders" v-for="event in events" :key="event.id">
              <q-item clickable v-ripple @click="toApplicationConfirm(event.id)">
                <q-item-section avatar>
                  <q-avatar size="70px">
                    <img :src="event.eventImg" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{ event.eventName }}</q-item-label>
                  <q-item-label caption lines="2">
                    <span class="text-weight-bold">{{ event.startDate }} ~ {{ event.endDate }}</span>
                    <p class="q-ma-none">{{ event.eventAddress }}</p>
                  </q-item-label>
                </q-item-section>
                <q-item-section side top style="color:blue;padding-left:10px">{{ event.status }}</q-item-section>
              </q-item>
              <div
                class="q-pb-sm q-gutter-sm text-center"
                v-if=" new Date(event.endDate) > currentTime "
              >
                <q-btn
                  no-caps
                  outline
                  label="View details"
                  color="primary"
                  @click="go"
                  style="font-size:10px; width:110px"
                />
                <q-btn
                  no-caps
                  outline
                  label="Cancel participantion"
                  color="primary"
                  style="font-size:10px; width:130px"
                  @click="confirm"
                />
                <q-btn
                  no-caps
                  outline
                  label="Survey"
                  color="primary"
                  @click="goSurvey(event.id)"
                  style="font-size:10px; width:110px"
                />
              </div>
              <q-separator style="width:98%; margin-left:5px" inset="item" />
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      filterEvent: "",
      date: "",
      sortDate: "descending",
      model: { label: "Date", value: "Date" },
      options: [
        { label: "Newest", value: "Newest" },
        { label: "Date", value: "Date" }
      ],
      currentTime: ""
    };
  },
  computed: {
    events() {
      return this.$store.state.History.events.filter(event => {
        return event.eventName
          .toLowerCase()
          .match(this.filterEvent.toLowerCase());
      });
    },
    count() {
      return this.$store.state.History.events.length;
    },
    todaysDate() {
      let timeStamp = new Date();
      return date.formatDate(timeStamp, "YYYY-MM-DD HH:mm");
    }
  },
  created() {
    this.$store.commit("changeTitle", "Application History")
    this.$store.commit("changeShowBack", true)
    this.$store.commit("changeShowMenu", true)
    this.currentTime = new Date();
    // this.date = new Date()
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
          // this.$store.commit("History/deleteEvent")
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },
    scrolled(position) {},
    toApplicationConfirm(id) {
      this.$router.push("/ApplicationHistory/Confirm/" + id);
      //this.$store.commit('Event/changeCurrentEvent', this.events[index])
    },
    go() {
      this.$router.push("/Event-detail/");
    },
    goSurvey(id) {
      this.$router.push("/ApplicationHistory/Survey/" + id);
    }
  },
  watch: {
    model: function(val){
      if(val.value == "Date"){
        this.$store.commit("History/sortDesByDate")
      }else if(val.value == "Newest"){
        this.$store.commit("History/sortDesByNewest")
      }
    }
  }
};
</script>

<style lang="scss">
.q-item-type {
  padding: 8px;
}
.q-select {
  width: 110px;
  padding-right: 10px;
}
.scrolled {
  padding-top: 110px;
}
</style>
