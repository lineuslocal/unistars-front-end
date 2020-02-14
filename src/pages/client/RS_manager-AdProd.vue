<template>
  <div>
    <q-list >
      <q-item>
        <q-item-section>
          <q-input
            rounded
            color="grey-3"
            outlined
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
              <div class="col ">
                <q-btn push color="dark" label="All" class="sz_btn" />
              </div>
              <div class="col">
                <q-btn
                  push
                  color="green"
                  label="Dietary supplement"
                  class="sz_btn"
                />
              </div>
              <div class="col">
                <q-btn
                  push
                  color="pink"
                  label="Functional fodd"
                  class="sz_btn"
                />
              </div>
              <div class="col">
                <q-btn push color="blue" label="Medicine" class="sz_btn" />
              </div>
            </div>
          </div>
        </q-item-section>
      </q-item>
      <div >
        <q-item class="s_border" v-for="pd in filteredList" :key="pd.id">
          <q-item-section>
            <q-checkbox class="checkbox" v-model="pd.cb_product" color="teal" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ pd.name }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <img v-bind:src="pd.images" alt="" />
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
          <q-btn class="primary absolute-bottom">Cancel</q-btn>
        </div>
        <div class="col">
          <q-btn class="dark absolute-bottom-right">Save</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      pds: [],
      business: [
        {
          month: "01/2020",
          value: [
            {
              id: 1,
              date: "Thurday,january,9",
              summary: "0%",
              products: [
                {
                  id: 1,
                  images: "../../statics/img/nutri.png",
                  name: "Nutrimil",
                  id_color: "green",
                  cb_product: false,
                  checkbox: [
                    {
                      id: 1,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    },
                    {
                      id: 2,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    },
                    {
                      id: 3,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    }
                  ]
                },
                {
                  id: 2,
                  images: "../../statics/img/fiber.png",
                  name: "Fiber",
                  id_color: "blue",
                  cb_product: false,
                  checkbox: [
                    {
                      id: 4,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    },
                    {
                      id: 5,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    },
                    {
                      id: 6,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    }
                  ]
                },
                {
                  id: 3,
                  images: "../../statics/img/health.png",
                  name: "Health Pack",
                  id_color: "yellow",
                  cb_product: false,
                  checkbox: [
                    {
                      id: 7,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    },
                    {
                      id: 8,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    },
                    {
                      id: 9,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    }
                  ]
                }
              ]
            },
            {
              id: 2,
              date: "Thurday,january,9",
              summary: "0%",
              products: [
                {
                  id: 5,
                  images: "../../statics/img/nutri.png",
                  name: "Nutrimil",
                  id_color: "green",
                  cb_product: false,
                  checkbox: [
                    {
                      id: 10,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    },
                    {
                      id: 11,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    },
                    {
                      id: 12,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    }
                  ]
                },
                {
                  id: 6,
                  images: "../../statics/img/fiber.png",
                  name: "Fiber",
                  id_color: "blue",
                  cb_product: false,
                  checkbox: [
                    {
                      id: 13,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    },
                    {
                      id: 14,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    },
                    {
                      id: 15,
                      time: "09h30 11/02/2020",
                      teal: false,
                      uncheck: false
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  // làm duyệt qua các cấp để vào mảng để làm tìm kiếm
  created: function(){
    this.business.forEach(bs =>{
      bs.value.forEach(vl => {
        vl.products.forEach(pd=>{
          this.pds.push(pd);
        })
      })
    })
  },
  computed: {
    filteredList(){
      return this.pds.filter(pd => {
        return pd.name.toLowerCase().includes(this.search.toLowerCase());
      })
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
