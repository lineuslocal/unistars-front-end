<template>
  <div>
    <q-list>
      <q-item class="s_border">
        <q-item-section>
          <q-item-label>
            <q-btn to="/reset-manager" label="By date" flat />
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            <q-btn to="/reset-manager-month" label="By month" flat />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <!-- phần thêm lịch tháng -->
    <div style="max-width: 800px; width: 100%;">
      <div class="q-pa-md">
        <div class="row">
          <div class="col">
            <q-toolbar>
              <q-btn flat icon="fas fa-chevron-left" @click="calendarPrev" />
              <q-separator vertical />
              <q-btn flat icon="fas fa-chevron-right" @click="calendarNext" />
            </q-toolbar>
          </div>
        </div>
      </div>

      <q-separator />

      <div style="max-width: 800px; width: 100%; overflow: auto">
        <q-calendar
          ref="calendar"
          v-model="selectedDate"
          view="month"
          locale="en-us"
          animated
          transition-prev="slide-right"
          transition-next="slide-left"
          :selected-dates="selectedDates"
          @click:day="onToggleDate"
          @click:date="onToggleDate"
        >
          <template #day="{ date }">
            <template v-for="(event, index) in getEvents(date)">
              <q-badge
                :key="index"
                style="width: 100%; cursor: pointer; height: 16px; max-height: 16px"
                class="q-event"
              >
                <img
                  v-bind:src="event.images"
                  alt
                  style="width: 20% cursor: pointer; height: 16px; max-height: 16px; margin-left:-7px"
                />
                <span style="color:white">{{ event.name }}</span>
              </q-badge>
            </template>
          </template>
        </q-calendar>
      </div>
    </div>
  </div>
</template>

<script>
import QCalendar from "@quasar/quasar-ui-qcalendar";
export default {
  data() {
    return {
      selectedDate: "",
      selectedDates: []
    };
  },
  methods: {
    calendarNext() {
      this.$refs.calendar.next();
    },
    calendarPrev() {
      this.$refs.calendar.prev();
    },
    onToggleDate(timestamp) {
      if (this.selectedDates.includes(timestamp.date)) {
        // remove the date
        for (let i = 0; i < this.selectedDates.length; ++i) {
          if (timestamp.date === this.selectedDates[i]) {
            this.selectedDates.splice(i, 1);
            // console.log(this.selectedDates)
            break;
          }
        }
      } else {
        //add the date
        this.selectedDates.push(timestamp.date);
        console.log(timestamp.date);
        this.$router.push("/reset-manager");
        // console.log(timestamp.date)
      }
    },
    getEvents(dt) {
      const currentDate = QCalendar.parseTimestamp(dt);
      const events = [];
      this.$store.state.Business.business.forEach(e => {
        console.log(e.month);
        e.content.forEach(e => {
          if (e.summary === "100%" && e.date === dt) {
            e.products.forEach(e => {
              events.push(e);
            });
          }
        });
      });
      return events;
    }
  }
};
</script>
<style lang="scss" scoped>
.s_border {
  margin: 5px 0;
  border-bottom: 1px solid black;
}
</style>
