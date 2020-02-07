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
        :rules="[ val =>  val.length > 0 || 'Please type a name']"
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
          v-model="event.maxParticipant"
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
      <q-input filled dense v-model="event.startRegTime" hint="Start register time (yyyy-mm-dd hh:mm)">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="event.startRegTime" mask="YYYY-MM-DD HH:mm" />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="event.startRegTime" mask="YYYY-MM-DD HH:mm" format12h />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input dense filled v-model="event.endRegTime" hint="End register time (yyyy-mm-dd hh:mm)">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="event.endRegTime" mask="YYYY-MM-DD HH:mm" />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="event.endRegTime" mask="YYYY-MM-DD HH:mm" format12h />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="row flex justify-between">
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
          style="height:37px; width: 126px"
          v-model="typePrice"
          toggle-color="primary"
          :options="[
              {label: 'Free', value: 'free'},
              {label: 'Paid', value: 'paid'},
          ]"
        />
      </div>
      <div class="row flex justify-between" >
        <p class="col-7" style="height: 37px; line-height:37px;">Need Additional Information?</p>
          <q-btn-toggle
            style="height:37px;"
            v-model="haveAddInfor"
            toggle-color="primary"
            :options="[
                {label: 'Yes', value: 'yes'},
                {label: 'No', value: 'no'},
            ]"
          />
      </div>
      <q-item v-for="(infor, index) in event.addInfor" :key="index" style="padding:0;" class="row" v-if="haveAddInfor=='yes'">
        <q-input
        class="col-8"
        filled
        v-model="infor.question"
        dense
        lazy-rules
        placeholder="Enter a question"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-checkbox size="xs" v-model="infor.isRequired" label="required" style="height:40px; line-height:40px;"/>
        <q-btn flat round color="primary"  icon="add_circle" style="height:40px; line-height:40px;" v-if="stateBtnInfor[index].add" @click="addMoreInfor(index)"/>
        <q-btn flat round color="negative"  icon="remove_circle" style="height:40px; line-height:40px;" v-if="stateBtnInfor[index].remove" @click="removeInfor(index)"/>
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
        <q-btn label="OK"  color="primary" v-if="role == 'view'" to="/admin"/>
        <q-btn label="Save"  color="primary" v-if="role == 'edit'" @click="saveEvent"/>
        <q-btn label="Create" type="submit" color="primary" v-if="role == 'create'"/>
        <q-btn label="Cancel" type="reset" color="primary" class="q-ml-sm" v-if="!(role == 'view')"/>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        id: 20,
        name: "",
        place: "",
        lecturer: "",
        maxParticipant: 0,
        currentParticipant: 0,
        startTime: "",
        endTime: "",
        startRegTime: "",
        endRegTime: "",
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
      //tempInfor: [],
      stateBtnInfor: [],
      role: ''
    }
  },

  methods: {
    onSubmit() {
      this.$store.commit('Event/createEvent', this.event)
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        timeout: 1000,
        message: "Create Event Successfull"
      });
      this.event  = {
        id: this.event.id + 1,
        name: null,
        place: null,       
        lecturer: null,
        participant: null,
        startTime: null,
        endTime: null,
        startRegTime: null,
        endRegTime: null,
        price: 0,
        addInfor: [],
        description: null,
        photoEvent: null,
        photoHowToReg: null,
        photoAttGuide: null,
        photoLecInf: null
      }
    },
    onReset() {
      this.$q
          .dialog({
            title: "Alert",
            message:
              "Canceling will delete all entered values. Do you really want to cancel?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            this.$router.push("/admin")
          })
          .onCancel(() => {
            
          })
    },
    addMoreInfor( index ) {
      this.stateBtnInfor[index].add = false
      this.stateBtnInfor[index].remove = true
      this.event.addInfor.push({question: '', isRequired: false})
      this.stateBtnInfor.push({add: true, remove: false})
    },
    removeInfor( index ) {
      this.event.addInfor.splice(index, 1)
      this.stateBtnInfor.splice(index, 1)
    },
    saveEvent() {
      this.$store.commit('Event/saveEvent', this.event)
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        timeout: 1000,
        message: "Edit Event Successfull"
      });
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
      if( val == 'yes' ) {
        if( this.event.addInfor === null || this.event.addInfor.length == 0){
          this.event.addInfor.push({question: '', isRequired: false})
        this.stateBtnInfor.push({add: true, remove: false})
        }
      }
    }
  },
  created() {
    if( this.$route.params.id === undefined) {
       this.$store.commit("changeTitle", "Create New Event");
       this.role = 'create'
    }
    else {
      this.$store.state.Event.events.forEach(event => {
        if ( event.id == this.$route.params.id ) {
          this.event.id = event.id
          this.event.name = event.name
          this.event.place = event.place
          this.event.lecturer = event.lecturer
          this.event.maxParticipant = event.maxParticipant
          this.event.currentParticipant = event.currentParticipant
          this.event.startTime = event.startTime
          this.event.endTime = event.endTime
          this.event.startRegTime = event.startRegTime
          this.event.endRegTime = event.endRegTime
          this.event.price = event.price
          event.addInfor.forEach( (e, index) => {
            this.event.addInfor.push(e)
            if(event.addInfor[index + 1] === undefined){
              this.stateBtnInfor.push({add: true, remove: false})
            }
            else {
              this.stateBtnInfor.push({add: false, remove: true})
            }
          })
          this.event.description = event.description
          this.event.photoEvent = event.photoEvent
          this.event.photoHowToReg = event.photoHowToReg
          this.event.photoAttGuide = event.photoAttGuide
          this.event.photoLecInf = event.photoLecInf
          this.event.createdDate = event.createdDate
        }
      })
      if( this.event.currentParticipant != 0) {
        this.$store.commit("changeTitle", "Event Information");
        this.role = 'view'
      }
      else {
        this.$store.commit("changeTitle", "Edit Event");
        this.role = 'edit'
      }
    }
    this.$store.commit("changeBack", true);
    if (this.event.price > 0) {
      this.typePrice = "paid";
    }
  }
}
</script>

<style lang="scss" scoped>
.cus-form {
  margin: 10px 0px;
}
</style>

