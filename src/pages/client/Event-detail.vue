<template>
  <div class="detail-event">
    <div style="margin: 20px;">
      <q-img :src="styel_Event.photoEvent" style="border-radius: 13px; padding: 20px; height: 155px;" />
      <q-item-label
        style="font-size: 20px;padding-top:7px;"
        lines="1"
      >{{styel_Event.name}}</q-item-label>
    </div>
    <div class="detail-content" style="margin-top: -10px;">
      <q-list>
        <q-item>
          <q-item-section top>
            <q-item-label lines="1" style="font-size: 15px;">
              <span style="color:#FFC107;">Paid</span> |
              <span>seminar</span>
            </q-item-label>
            <q-item-label lines="1" style="font-size: 15px;">
              <p>
                <span style="color:blue;">20 days</span> befor deadline
              </p>
            </q-item-label>
          </q-item-section>
          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <a href="https://calendar.google.com/calendar/r">
              <q-btn
                flat="flat"
                dense="dense"
                round="round"
                icon="far fa-calendar-alt"
              /></a>
              <q-btn
                to="/event-style"
                flat="flat"
                dense="dense"
                round="round"
                icon="fa fa-map-marker-alt"
              />
              <q-btn
                to="/event-style"
                flat="flat"
                dense="dense"
                round="round"
                icon="fa fa-share-alt-square"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator color="orange" inset />
      <div class="content-nav">
        <q-item-label>
          <p>
            Date-Time
            <span
              style="padding-left:20px;font-size:12.5px;"
            >{{styel_Event.startTime}} ~ {{styel_Event.endTime}}</span>
          </p>
          <p>
            Place
            <span
              style="padding-left:5px;font-size:12.5px;"
            >{{styel_Event.place}}</span>
          </p>
          <p>
            Personal
            <span style="padding-left:20px;font-size:12.5px;">
              <span style="color:blue;">{{styel_Event.maxParticipant}} people</span> in total |
              <span style="color:blue;">{{styel_Event.currentParticipant}} persons</span> availber
            </span>
          </p>
        </q-item-label>
      </div>
      <q-separator color="orange" inset />
      <div class="education-content">
        <q-item-label>
          <p>
            <span
              style="margin-bottom: 15px;padding-left: 5px;float: left;"
            >Application Period {{styel_Event.startexpiredRegTime}} ~ {{styel_Event.endexpiredRegTime}}</span>
            <br />
            <span style="float:left;font-size:12.5px; margin-top: 0px;margin-left:5px;">
              {{styel_Event.name}}
              <b style="padding-left:35px;font-size:17px;">{{styel_Event.price}}KRW</b>
            </span>
          </p>
        </q-item-label>
      </div>
      <div class="descrip-content">
        <q-item-label>
          <span>{{styel_Event.description}}</span>
        </q-item-label>
      </div>
      <div class="education-image">
        <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 600px">
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="bg-grey-3"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab  name="register" label="How To Register" />
              <q-tab  name="attendance" label="Attendance Guide" />
              <q-tab  name="lecturer" label="Lecturer Information" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="register">
                <q-img :src="styel_Event.photoHowToReg" style="height: 175px;"/>
              </q-tab-panel>

              <q-tab-panel name="attendance">
                <q-img :src="styel_Event.photoAttGuide"  style="height: 175px;" />
              </q-tab-panel>

              <q-tab-panel name="lecturer">
                <q-img :src="styel_Event.photoLecInf"  style="height: 175px;" />
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
      <div class="list-imgevent">
        <q-item-label style="padding:0px 10px;">
          <p style="margin: 0px;">
            <b>{{styel_Event.lecturer}}</b>
          </p>
        </q-item-label>
        <div class="q-pa-md">
          <div class="q-col-gutter-md row items-start">
            <div class="col-4">
              <q-img src="/statics/img/anh2.jpeg" :ratio="4/3" />
            </div>
            <div class="col-4">
              <q-img src="/statics/img/anh5.jpg" :ratio="4/3" />
            </div>
            <div class="col-4">
              <q-img src="/statics/img/anh4.jpg" :ratio="4/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    <q-footer class="text-center" style="background-color: white;">
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="blue" />
      </q-page-scroller>
      <div class="q-pa-md q-gutter-sm" style="padding: 3px 0px;">
        <q-btn no-caps unelevated rounded color="primary" style="width: 80%;">
          <div style="font-size:17px;">Apply</div>
        </q-btn>
      </div>
    </q-footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      styel_Event:
        {
          // id: 1,
          // TileEvent: '<Seoul> Success Core 5th Core 5th Core',
          // Payment_type: 'Free',
          // total_time: '50',
          // StartTime: '2020.5.18(sat) 08:30',
          // EndTime: '5.19(sat) 17:30',
          // address: 'seocho-gu, Seoul'
          name: '2020 Asia Convention in korea',
          place: '[Gangnam Building] No.101,111 Gangnam-daero,Seoul',
          lecturer: 'Mark Zuckerberg',
          maxParticipant: 50,
          currentParticipant: 30,
          startTime: '2020.1.18 08:30',
          endTime: '2020.1.19 17:30',
          endexpiredRegTime: '2020.1.19 17:30',
          startexpiredRegTime: '2020.2.19 17:30',
          price: 50000,
          haveAddInfor: 'yes',
          addInfor: [
            'Question 1',
            'Question 2',
            'Question n'
          ],
          description: 'We look forwrad to seeing yout at the 2020 Asia Convention.',
          photoEvent: '/statics/img/anh2.jpeg',
          photoHowToReg: '/statics/img/anh2.jpeg',
          photoAttGuide: '/statics/img/anh4.jpg',
          photoLecInf: '/statics/img/anh5.jpg',
          createdTime: '2020-08-28 23:59'
        },
      tab: 'register',
      slide: 1
    }
  }
}
</script>
<style >
.education-content {
    font-size: 13px;
    float: left;
    padding-left: 5px;
    border-radius: 61px 0;
    background-color: silver;
    padding-top: 20px;
    padding-bottom: 10px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 13px;
    padding: 10px 29px;
}
.descrip-content{
  padding-left: 10px;
  font-size:17px;
}
.conten-image{
    margin: 0px 18px;
    text-align: center;
    border: 1px solid;
    width: 90%;
}
.content-nav{
  font-size:13px;
  margin: 15px;
  line-height: 0.5;
}
.q-tab__label {
    font-size: 10px;
}
.relative-position {
    position: unset;
}
/* .q-field--standard .q-field__control:before {
    border-bottom: none;
} */
.q-gutter-md > * {
    margin-top: 60px;
}
.q-field__after, .q-field__append {
     padding-left: 0px;
}
</style>
