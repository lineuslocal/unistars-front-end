<template>
  <div class="detail-event">
    <div style="margin: 20px;">
      <q-img :src="events.photoEvent" style="border-radius: 13px; padding: 20px; height: 155px;" />
      <q-item-label style="font-size: 20px;padding-top:7px;" lines="1">{{events.name}}</q-item-label>
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
              <a>
                <q-btn   @click.stop.prevent="geteventclendar"
                flat="flat" dense="dense" round="round" icon="far fa-calendar-alt" />
              </a>
              <a v-bind:href="link">
                <q-btn flat="flat" dense="dense" round="round" icon="fa fa-map-marker-alt" />
              </a>
              <q-btn
                flat="flat"
                dense="dense"
                round="round"
                icon="fa fa-share-alt-square"
                @click.stop.prevent="copyTestingCode"
                @click="toolbar = true"
              >
                <div class="container">
                  <div class="row">
                    <div class="col-sm-12">
                      <div
                        class="form-control wizard-form-control d-flex align-items-center testing-code px-20px mb-10px"
                      >
                        <input type="hidden" id="testing-code" :value="share" />
                      </div>
                    </div>
                  </div>
                </div>
              </q-btn>
              <q-dialog v-model="toolbar">
                <q-card>
                  <q-toolbar>
                    <q-toolbar-title :value="share">{{share}}</q-toolbar-title>
                    <q-btn flat round dense icon="close" v-close-popup />
                  </q-toolbar>
                  <q-card-section class="text-center">{{alter}}</q-card-section>
                </q-card>
              </q-dialog>
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
            >{{events.startTime}} ~ {{events.endTime}}</span>
          </p>
          <p>
            Place
            <span style="padding-left:5px;font-size:12.5px;">{{events.place}}</span>
          </p>
          <p>
            Personal
            <span style="padding-left:20px;font-size:12.5px;">
              <span style="color:blue;">{{events.maxParticipant}} people</span> in total |
              <span style="color:blue;">{{events.currentParticipant}} persons</span> availber
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
            >Application Period {{events.starRegTime}} ~ {{events.endRegTime}}</span>
            <br />
            <span style="float:left;font-size:12.5px; margin-top: 0px;margin-left:5px;">
              {{events.name}}
              <b style="padding-left:35px;font-size:17px;">{{events.price}}KRW</b>
            </span>
          </p>
        </q-item-label>
      </div>
      <div class="descrip-content">
        <q-item-label>
          <span>{{events.description}}</span>
        </q-item-label>
      </div>
      <div class="education-image">
        <div class="q-pa-md">
          <div class="q-gutter-y-md" style="max-width: 100%;">
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
                <q-tab name="register" label="How To Register" />
                <q-tab name="attendance" label="Attendance Guide" />
                <q-tab name="lecturer" label="Lecturer Information" />
                <q-tab name="poll" label="Poll" />
              </q-tabs>
              <q-separator />
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="register">
                  <q-img :src="events.photoHowToReg" style="height: 175px;" />
                </q-tab-panel>

                <q-tab-panel name="attendance">
                  <q-img :src="events.photoAttGuide" style="height: 175px;" />
                </q-tab-panel>

                <q-tab-panel name="lecturer">
                  <q-img :src="events.photoLecInf" style="height: 175px;" />
                </q-tab-panel>
                <q-tab-panel name="poll" style="position: none;">
                  <div class="apchart" v-if="currentTime > endcurrentTime">
                    <q-item-label style="margin-left:17px;font-size: 18px;">Poll</q-item-label>
                    <q-separator color="orange" inset />
                    <div v-for="(survey, index) in applicant.surveys" :key="index" v-ripple>
                      <apexchart
                        type="donut"
                        width="380"
                        :options="chartOptions[index]"
                        :series="series[index]"
                        style="margin-top: 5px;"
                      />
                    </div>
                  </div>
                  <div
                    class="text-chart"
                    v-if="!(currentTime > endcurrentTime) "
                    style="text-align: center;height:175px;"
                  >
                    <q-item-label
                      style="font-size:20px;"
                    >This poll result is not avalible. Please comback when the event is over</q-item-label>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
        <div class="list-imgevent">
          <q-item-label style="padding:0px 10px;">
            <p style="margin: 0px;">
              <b>{{events.lecturer}}</b>
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
      <div
        class="q-pa-md q-gutter-sm"
        v-if="currentTime > endcurrentTime "
        style="padding: 3px 0px;"
      >
        <q-btn no-caps unelevated rounded :color="'grey'" disable style="width: 80%;">
          <div
            style="font-size:17px;"
          >{{currentTime > endcurrentTime ? 'This event is over' : 'Apply'}}</div>
        </q-btn>
      </div>
      <div
        class="q-pa-md q-gutter-sm"
        v-if="events.currentParticipant < events.maxParticipant && currentTime < endcurrentTime"
        style="padding: 3px 0px;"
      >
        <q-btn
          :loading="loading2"
          @click="simulateProgress(2)"
          label="Apply"
          no-caps
          unelevated
          rounded
          :color="loading2 ? 'grey' : 'primary'"
          style="width: 80%;font-size: 17px;"
        >
          <template v-slot:loading>
            <div>The application has been completed</div>
          </template>
        </q-btn>
      </div>
      <div
        class="q-pa-md q-gutter-sm"
        v-if="events.currentParticipant >= events.maxParticipant && currentTime < endcurrentTime"
        style="padding: 3px 0px;"
      >
        <q-btn no-caps unelevated rounded :color="'grey'" disable style="width: 80%;">
          <div
            style="font-size:17px;"
          >{{events.currentParticipant >= events.maxParticipant ? 'This education is full' : 'Apply'}}</div>
        </q-btn>
      </div>
    </q-footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: "register",
      loading2: false,
      slide: 1,
      icon: false,
      bar: false,
      bar2: false,
      toolbar: false,
      alter: "",
      currentTime: "",
      endcurrentTime: "",
      series: [],
      chartOptions: []
    };
  },
  methods: {
    src: function() {
      return (this.url +=
        "&origin=" + origin + "&destination=" + this.destination);
    },
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();
      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        this.alter = "Tab the URL to copy it " + msg;
      } catch (err) {
        this.alter = "Oops, unable to copy";
      }
      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
    simulateProgress(number) {
      // we set loading state
      this[`loading${number}`] = true;
      // simulate a delay
      // setTimeout(() => {
      //   // we're done, we reset loading state
      //   this[`loading${number}`] = false
      // }, 3000)
    },
    geteventclendar() {
      var cal = alendarApp.getCalendarById("728895609426-rv8e2evc1nvm8tkj95iah4fo4hri1hbj.apps.googleusercontent.com");
      var enventclendar = cal.getEvents(new Date("9/8/2020"),new Date("9/3/2020"));
      for(var i = 0 ;i<enventclendar.legend; i++){
        var title = enventclendar[i].getTitle
        logger.log(title);
      }
    }
  },
  computed: {
    events() {
      var id = this.$route.params.id; //aa
      var a;
      //console.log(id)
      this.$store.state.Event.events.forEach(element => {
        if (id == element.id) {
          this.endcurrentTime = new Date(element.endTime);
          a = element;
        }
      });
      return a;
    },
    applicant() {
      var id = this.$route.params.id; //aa
      var apliction;
      //console.log(id)
      this.$store.state.Applicant.applicants.forEach(elementapl => {
        if (id == elementapl.id) {
          apliction = elementapl;
        }
      });
      return apliction;
    },
    link() {
      return "http://maps.google.com?q=" + this.events.place;
    },
    share() {
      return "http://localhost:8089/#/event-detail/" + this.events.id;
    }
  },
  created() {
    var id = this.$route.params.id;
    var labelArr = [];
    this.$store.state.Applicant.applicants[0].surveys.forEach(elment_survey => {
      labelArr.push(elment_survey.selections);
    });
    labelArr.forEach(element => {
      this.chartOptions.push({
        labels: [],
        dataLabels: {
          enabled: true
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                show: true
              }
            }
          }
        ],
        legend: {
          position: "right",
          offsetY: 0
        }
      });
    });
    this.chartOptions.forEach((charoption, index) => {
      this.chartOptions[index].labels = labelArr[index];
      //console.log(this.chartOptions[index].labels);
    });

    //tao bien dem tile
    var answerArray = []
    labelArr.forEach(aray1 => {
      var dc = [] 
      aray1.forEach(b => {
        dc.push(0)
      })
       answerArray.push(dc) 
    })
    //console.log(answerArray);

    //thuc hien bien dem
    this.$store.state.Applicant.applicants.forEach(element => {
      element.surveys.forEach((elementsurvesy,indexsur) => {  
        labelArr[indexsur].forEach((labearr,index) => {     
            if(labearr == elementsurvesy.selected){
              answerArray[indexsur][index]++
            }
        })
      })
    })
    console.log(answerArray)
    this.series = answerArray
    this.currentTime = new Date();

    //ve 1 bieu do
    // //array titlelable
    // var labelArr = this.$store.state.Applicant.applicants[0].surveys.selections
    // //khoi tao 1 array co cung so luong pt mang voi giai tri ban dau = 0
    // var answerArr = []
    // labelArr.forEach(a=>{
    //   answerArr.push(0)
    // })
    // console.log(answerArr);

    // //thuc hien bien dem
    // this.$store.state.Applicant.applicants.forEach( element => {
    //   labelArr.forEach((labelar,index) => {
    //      if(element.surveys.selected == labelArr[index]){
    //        answerArr[index]++;
    //      }
    // });
    // });
    // console.log(answerArr)

    // // ti le %
    // this.series = answerArr
    // console.log(this.series)

    // //var lislb = this.arraysurey
    // this.chartOptions.labels = labelArr;

    //console.log(lislb);
  }
};
</script>
<style >
.education-content {
  font-size: 13px;
  float: left;
  padding-left: 10px;
  border-radius: 61px 0;
  background-color: silver;
  padding-top: 20px;
  padding-bottom: 10px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 13px;
}
.descrip-content {
  padding-left: 10px;
  font-size: 17px;
}
.conten-image {
  margin: 0px 18px;
  text-align: center;
  border: 1px solid;
  width: 90%;
}
.content-nav {
  font-size: 13px;
  margin: 15px;
  line-height: 0.5;
}
.q-tab__label {
  font-size: 10px;
}
.q-tab {
  padding: 0 5px;
}
.q-gutter-md > * {
  margin-top: 60px;
}
.q-field__after,
.q-field__append {
  padding-left: 0px;
}
.q-tabs--horizontal .q-tabs__arrow--right {
  display: none;
}
.q-tabs--horizontal .q-tabs__arrow--left {
  display: none;
}
.resize-triggers,
.resize-triggers > div,
.contract-trigger:before {
  overflow: unset;
}
.scroll {
  overflow: unset;
}
</style>
