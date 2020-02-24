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
    <q-list v-for="business in business" :key="business.id">
      <q-item class="s_border text-center">
        <q-item-section>
          <q-item-label>
            <q-icon name="keyboard_arrow_left" />
            {{ business.month }}
            <q-icon name="keyboard_arrow_right" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-list v-for="date in business.value" :key="date.id">
        <q-item class="s_border">
          <q-item-section>
            <q-item-label>{{ date.date }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ date.summary }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-list v-for="pd in date.products" :key="pd.id" class="q-pa-md">
          <q-item class="s_border">
            <q-item-section>
              <img v-bind:src="pd.images" alt />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ pd.name }}</q-item-label>
            </q-item-section>
            <q-item-section class="q-pa-md q-gutter-sm">
              <q-btn round v-bind:color="pd.id_color" class="s_btn" />
            </q-item-section>
            <q-item-section v-for="cb in pd.checkbox" :key="cb.id" class="cb_prod">
              <q-checkbox v-model="cb.teal" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-list>
    </q-list>
    <div class="q-pa-md row justify-end">
      <q-btn to="/reset-manager-add" color="primary" icon="add" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  }
};
</script>
<style lang="scss" scoped>
img {
  width: 20px;
  height: 25px;
}
.cb_prod {
  flex-wrap: no-wrap !important;
  margin-left: -20px !important;
}
.s_border {
  margin: 5px 0;
  border-bottom: 1px solid black;
}
.s_btn {
  width: 10px;
  height: 10px;
}
</style>
