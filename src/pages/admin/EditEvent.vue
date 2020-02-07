<template>
  <div class="q-pa-md cus-form">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="event.name"
        dense
        lazy-rules
        hint="Event name"
        placeholder="Enter event's name"
        :rules="[ val => val && val.length > 0 || 'Please type a name']"
      />
      <q-input
        filled
        v-model="event.place"
        dense
        lazy-rules
        placeholder="Enter a place"
        hint="Event place"
        :rules="[ val => val && val.length > 0 || 'Please type a place']"
      />
      <div class="row">
        <q-input
          class="col-8"
          filled
          v-model="event.lecturer"
          dense
          lazy-rules
          placeholder="Enter lecturer' name"
          hint="Event lecturer"
          :rules="[ val => val && val.length > 0 || 'Please type a place']"
        />
        <q-input
          class="offset-1 col-3"
          filled
          type="personnel"
          v-model="event.participant"
          dense
          placeholder="Number"
          hint="Number of participant"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type number',
            val => val > 0  || 'money is not correct'
          ]"
        />
      </div>
      <q-input filled dense v-model="event.startTime" hint="Start time (yyyy-mm-dd hh:mm)">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="event.startTime" mask="YYYY-MM-DD HH:mm" />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="event.startTime" mask="YYYY-MM-DD HH:mm" format12h />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input filled dense v-model="event.endTime" hint="End time (yyyy-mm-dd hh:mm)">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="event.endTime" mask="YYYY-MM-DD HH:mm" />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="event.endTime" mask="YYYY-MM-DD HH:mm" format12h />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input dense filled v-model="event.expiredRegTime" hint="Expired register time (yyyy-mm-dd hh:mm)">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="event.expiredRegTime" mask="YYYY-MM-DD HH:mm" />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="event.expiredRegTime" mask="YYYY-MM-DD HH:mm" format12h />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="row relative-position">
        <q-input
          v-if="!isFree"
          filled
          type="number"
          v-model="event.price"
          dense
          placeholder="Enter an amount of money "
          prefix="₩"
          hint="Price in KRW"
          lazy-rules
          :rules="[
              val => val !== null && val !== '' || 'Please type price of event',
              val => val > 0  || 'Amount of money is not correct'
          ]"
        />
        <q-input
          v-if="isFree"
          disable
          filled
          type="number"
          v-model="event.price"
          dense
          placeholder="Enter an amount of money "
          prefix="₩"
          hint="Price in KRW"
        />
        <q-btn-toggle
          class="absolute-right"
          style="height:37px; width: 126px"
          v-model="typePrice"
          toggle-color="primary"
          :options="[
              {label: 'Free', value: 'free'},
              {label: 'Paid', value: 'paid'},
          ]"
        />
      </div>
      <div class="row relative-position">
        <p class="col-7">Need Additional Information?</p>
        <q-btn-toggle    
          class="absolute-right"
          style="height:37px;"
          v-model="haveAddInfor"
          toggle-color="primary"
          :options="[
              {label: 'Yes', value: 'yes'},
              {label: 'No', value: 'no'},
          ]"
        />
      </div>
      <q-item v-for="(infor, index) in event.addInfor" :key="index">
        <q-input
        filled
        v-model="infor.question"
        dense
        lazy-rules
        placeholder="Enter a question"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-checkbox size="xs" v-model="infor.isRequired" label="required"/>
        <q-btn flat round color="primary"  icon="add_circle" v-if="stateBtnInfor[index].add" @click="addMoreInfor(index)"/>
        <q-btn flat round color="negative"  icon="remove_circle" v-if="stateBtnInfor[index].remove" @click="removeInfor(index)"/>
      </q-item>
      <q-input
        filled
        v-model="event.description"
        dense
        lazy-rules
        type="textarea"
        placeholder="Enter description for event (0/1500)"
        hint="Event description"
      />
      <div>
        <q-uploader
          url="http://localhost:4444/upload"
          label="Add main photo for 'Event'"
          style=" width: 100% "
          accept=".jpg, image/*"
        />
      </div>
      <div>
        <q-uploader
          url="http://localhost:4444/upload"
          label="Add photo for 'How to Register'"
          style=" width: 100% "
          accept=".jpg, image/*"
        />
      </div>
      <div class="row">
        <q-uploader
          url="http://localhost:4444/upload"
          label="Add photo for 'Attendance Guide'"
          style=" width: 100% "
          accept=".jpg, image/*"
        />
      </div>
      <div class="row">
        <q-uploader
          url="http://localhost:4444/upload"
          label="Add photo for 'Lecturer Information'"
          style=" width: 100% "
          accept=".jpg, image/*"
        />
      </div>
      <div class="text-center">
        <q-btn label="Edit" type="submit" color="primary" />
        <q-btn label="Cancel" type="reset" color="primary" class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        id: 0,
        name: "",
        place: "",
        lecturer: "",
        participant: "",
        startTime: "",
        endTime: "",
        expiredRegTime: "",
        price: 0,
        addInfor: [],
        description: "",
        photoEvent: "",
        photoHowToReg: "",
        photoAttGuide: "",
        photoLecInf: "",
        createdDate: ""
      },
      typePrice: "free",
      haveAddInfor: "no",
      tempInfor: [],
      stateBtnInfor: [],
    };
  },

  methods: {
    onSubmit() {

    },
    onReset() {

    }
  },
  computed: {
    isFree() {
      if(this.typePrice == 'free') {
        this.event.price = 0
        return true
      }
      return false
    }
  },
  watch: {
    haveAddInfor: function(val) {
      if( val == 'yes') {
        this.event.addInfor = this.tempInfor
        this.event.addInfor.push({question: '', isRequired: false})
        this.stateBtnInfor.push({add: true, remove: false})
      }
      else{
        this.tempInfor = this.event.addInfor
        this.event.addInfor = []
      }
    }
  },
  created() {
    this.$store.state.Event.events.forEach(event => {
      if ( event.id == this.$route.params.id ) {
        this.event.id = event.id
        this.event.name = event.name
        this.event.place = event.place
        this.event.lecturer = event.lecturer
        this.event.participant = event.participant
        this.event.startTime = event.startTime
        this.event.endTime = event.endTime
        this.event.expiredRegTime = event.expiredRegTime
        this.event.price = event.price
        event.addInfor.forEach(e => {
          this.event.addInfor.push(e)
        })
        this.event.description = event.description
        this.event.photoEvent = event.photoEvent
        this.event.photoHowToReg = event.photoHowToReg
        this.event.photoAttGuide = event.photoAttGuide
        this.event.photoLecInf = event.photoLecInf
      }
    })
    if (this.event.price > 0) {
      this.typePrice = "paid";
    }
    if( this.event.addInfor.length != 0){
      this.haveAddInfor = "yes"
    }
    this.$store.commit("changeTitle", "Edit Event");
    this.$store.commit("changeBack", true);
    this.$store.commit("changeUrl", "/");
  }
}
</script>

<style lang="scss" scoped>
.cus-form {
  margin: 10px 0px;
}
</style>

