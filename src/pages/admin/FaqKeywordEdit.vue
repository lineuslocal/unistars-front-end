<template>
  <q-page class="cus-layout">
    <div class="cus-title">
      <q-icon name="keyboard"/>&nbsp;&nbsp;&nbsp;Keyword
    </div>
    <div class="cus-title-table">
      <q-icon name="keyboard"/>&nbsp;&nbsp;&nbsp;Keyword - {{title}}
    </div>
    <q-form @submit="onSubmit" @reset="onReset" class="cus-form">
          <div class="row">

            <!-- Input information of event -->
            <div class="offset-sm-1 col-sm-8 col-12 offset-0 row">
              <p class="col-sm-2 col-12 cus-text">Keyword *</p>
              <q-input
                class="col-sm-10 col-12"
                outlined
                v-model="faq.keyword"
                dense
                lazy-rules
                placeholder="Enter Keyword's"
                :rules="[ val =>  val !== null && val !== '' || 'Please type a name']"
              />
              <div class="col-sm-2 col-12" style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">Note*</div>
      <q-editor class="col-sm-10 col-12"
      v-model="faq.description"
      :dense="$q.screen.lt.md"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
      lazy-rules
                type="textarea"
                placeholder="Enter description for keyword (0/1500)"
                :rules="[ val => val !== null && val !== '' || 'Please type something']"
    /> 
            </div>
          </div>
          <div class="text-right" style="margin-top:30px">
            <q-btn label="Save"  color="primary" v-if="role == 'edit'" @click="saveFaq" to="/admin/faq-keyword"/>
            <q-btn style="margin-left: 15px" label="Cancel"  color="primary" to="/admin/faq-keyword"/>
            <q-btn style="margin-left: 15px" label="Delete"  color="primary" @click="deleteFaq" />
          </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "FaqKeyword",
  
  data() {
    return {
      title: 'Update',
      tab: "faq",
      faq: {
        id: 20,
        keyword: "",
        maxParticipant: null,
        currentParticipant: null,
        description: "",
        createdDate: ""
      },
    }
  },
   methods: {
    onSubmit() {
      this.faq.createdDate = a.getFullYear() + '-' 
                              + ( a.getMonth() + 1 < 10 ? '0' + (a.getMonth() + 1) : a.getMonth() +1 ) + '-'
                              + ( a.getDate() < 10 ? '0' + a.getDate() : a.getDate() ) + ' ' 
                              + ( a.getHours() < 10 ? '0' + a.getHours() : a.getHours() ) + ':' 
                              + ( a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes() )
      this.$store.commit('Faq/createFaq', this.faq)
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        timeout: 1000,
        message: "Create Keyword Successfull"
      });
      this.faq  = {
        id: this.faq.id + 1,
        keyword: null,
        maxParticipant: null,
        currentParticipant: null,
        description: null,
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
            this.$router.push("/admin/faq/Keyword")
          })
          .onCancel(() => {
            
          })
    },
    saveFaq() {
      this.$store.commit('Faq/saveFaq', this.faq)
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        timeout: 1000,
        message: "Edit Keyword Successfull"
      });
    },
    deleteFaq() {
       this.$store.commit("Faq/deleteFaq",[this.faq.id])
    }
  },
  computed: {},
  created() {
    if( this.$route.params.id === undefined) {
      this.keyword = 'Insert'
      this.role = 'create'
    }
    else {
      this.$store.state.Faq.faqs.forEach(faq => {
        if ( faq.id == this.$route.params.id ) {
          this.faq.id = faq.id
          this.faq.keyword = faq.keyword
          this.faq.maxParticipant = faq.maxParticipant
          this.faq.currentParticipant = faq.currentParticipant
          this.faq.description = faq.description
          this.faq.createdDate = faq.createdDate
        }
      })
        this.role = 'edit'
        this.keyword = 'Update'
    }
  }
}
</script>

<style scoped>
.cus-text{
  height: 40px;
  line-height: 40px;
}
 .cus-btn{
    width: 35px;
    height:35px; 
    margin-right: 12px;
    color: rgba(0, 0, 0, 0.12);
 }
 .cus-title-table{
   width: 100%;
   border: 1px solid rgba(0, 0, 0, 0.12);
   height: 48px;
   line-height: 48px;
   font-size: 18px;
   margin-top: 15px;
   padding-left: 15px;
 }
 .cus-title{
   font-size: 18px;
   font-weight: bold;
 }
 .cus-form{
   border: 1px solid rgba(0, 0, 0, 0.12);
   padding: 30px 15px;
 }
 .cus-col{
   padding-right: 15px;
 }
 .cus-question {
   margin-top: 15px;
   padding: 10px 15px;
   border: 1px solid rgba(0, 0, 0, 0.12);
 }
 .cus-selection {
   padding: 10px 15px;
   border: 1px solid rgba(0, 0, 0, 0.12);
 }
 .cus-layout {
    margin-top:20px;
}
</style>