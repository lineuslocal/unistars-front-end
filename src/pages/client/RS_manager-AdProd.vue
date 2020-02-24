<template>
  <form @submit.prevent="simulateSubmit" class="q-pa-md">
    <div>
      <q-list>
        <q-item>
          <q-item-section>
            <q-input
              rounded
              color="grey-3"
              outlined
              type="search"
              v-model="search"
              label="Product search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="q-pa-md">
              <div class="row">
                <div class="col">
                  <q-btn push color="dark" label="All" class="sz_btn" />
                </div>
                <div class="col">
                  <q-btn push color="green" label="Dietary supplement" class="sz_btn" />
                </div>
                <div class="col">
                  <q-btn push color="pink" label="Functional fodd" class="sz_btn" />
                </div>
                <div class="col">
                  <q-btn push color="blue" label="Medicine" class="sz_btn" />
                </div>
              </div>
            </div>
          </q-item-section>
        </q-item>
        <div>
          <q-item class="s_border" v-for="pd in filteredList" :key="pd.id">
            <q-item-section>
              <q-checkbox class="checkbox" v-model="pd.cb_product" color="teal" />
              <!-- <q-radio name="shape" v-model="shape" val="line" label="Line" /> -->
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ pd.name }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <img v-bind:src="pd.images" alt />
            </q-item-section>
            <q-item-section class="q-pa-md q-gutter-sm">
              <q-btn round v-bind:color="pd.id_color" class="s_btn" />
            </q-item-section>
          </q-item>
        </div>
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
              @click="saveProducts"
            >Save</q-btn>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      pds: []
    };
  },
  // làm duyệt qua các cấp để vào mảng để làm tìm kiếm
  computed: {
    filteredList() {
      return this.pds.filter(pd => {
        return pd.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  created: function() {
    this.$store.commit("changeTitle", "Study Manager")
    this.$store.commit("changeShowBack", true)
    this.$store.commit("changeShowMenu", true)

    this.$store.state.Business.products_add.forEach(e => {
      var tms = {
        id: "",
        images: "",
        name: "",
        id_color: "",
        cb_product: "",
        saveActive: ""
      };
      tms.id = e.id;
      tms.images = e.images;
      (tms.name = e.name), (tms.id_color = e.id_color);
      tms.cb_product = e.cb_product;
      tms.saveActive = e.saveActive;
      this.pds.push(tms);
    });
  },
  methods: {
    saveProducts() {
      var count = 0;
      this.pds.forEach(e => {
        if (e.cb_product === true) {
          count += 1;
        }
      });
      if (count === 1) {
        this.pds.forEach(e => {
          this.$store.commit("Business/saveStatusCheck", {
            statuscheck: e.cb_product,
            id_cb: e.id
          });
          this.$router.push("/reset-manager-add");
        });
      } else if (count > 1) {
        this.$q.notify("Chỉ được chọn 1 sản phẩm");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.ad_border {
  border-bottom: 1px solid black;
}
.sz_btn {
  font-size: 8px;
  width: 75px;
  height: 50px;
}
img {
  width: 20px;
  height: 25px;
}
.s_btn {
  width: 10px;
  height: 10px;
}
</style>
