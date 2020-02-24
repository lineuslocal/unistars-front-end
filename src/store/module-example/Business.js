const state = {
  business: [
    {
      month: "02-2020",
      content: [
        {
          id: 1,
          date: "2020-02-23",
          summary: "100%",
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
                  time: "09:30",
                  teal: false,
                  uncheck: false
                },
                {
                  id: 2,
                  time: "09:30",
                  teal: false,
                  uncheck: false
                },
                {
                  id: 3,
                  time: "09:30",
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
                  time: "09:30",
                  teal: false,
                  uncheck: false
                },
                {
                  id: 5,
                  time: "09:30",
                  teal: false,
                  uncheck: false
                },
                {
                  id: 6,
                  time: "09:30",
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
                  time: "09:30",
                  teal: false,
                  uncheck: false
                },
                {
                  id: 8,
                  time: "09:30",
                  teal: false,
                  uncheck: false
                },
                {
                  id: 9,
                  time: "09:30",
                  teal: false,
                  uncheck: false
                }
              ]
            }
          ]
        },
        {
          id: 2,
          date: "2020-02-22",
          summary: "100%",
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
                  time: "09:30",
                  teal: false,
                  uncheck: false
                },
                {
                  id: 11,
                  time: "09:30",
                  teal: false,
                  uncheck: false
                },
                {
                  id: 12,
                  time: "09:30",
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
                  time: "09:30",
                  teal: false,
                  uncheck: false
                },
                {
                  id: 14,
                  time: "09:30",
                  teal: false,
                  uncheck: false
                },
                {
                  id: 15,
                  time: "09:30",
                  teal: false,
                  uncheck: false
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  products_add: [
    {
      id: 1,
      images: "../../statics/img/nutri.png",
      name: "Nutrimil",
      id_color: "green",
      cb_product: false,
      saveActive: false
    },
    {
      id: 2,
      images: "../../statics/img/fiber.png",
      name: "Fiber",
      id_color: "blue",
      cb_product: false,
      saveActive: false
    },
    {
      id: 3,
      images: "../../statics/img/health.png",
      name: "Health Pack",
      id_color: "yellow",
      cb_product: false,
      saveActive: false
    },
    {
      id: 4,
      images: "../../statics/img/nutri.png",
      name: "Nutrimil",
      id_color: "green",
      cb_product: false,
      saveActive: false
    },
    {
      id: 5,
      images: "../../statics/img/fiber.png",
      name: "Fiber",
      id_color: "blue",
      cb_product: false,
      saveActive: false
    }
  ],
  listPdUser: [
    {
      name_pd: "",
      id_color: "",
      unit: "",
      amount: "",
      start: "",
      schedule: "",
      frequence: "",
      duration: ""
    }
  ]
};
const mutations = {
  saveStatusCheck(state, { statuscheck, id_cb }) {
    state.products_add.forEach(element => {
      if (element.id == id_cb && statuscheck == true) {
        element.cb_product = statuscheck;
        console.log(element);
      }
    });
  },
  resetStatusCb(state, id_cb) {
    state.products_add.forEach(e => {
      if (e.id === id_cb) {
        e.cb_product = false;
      }
    });
  },
  saveListPdUser(
    state,
    { name_pd, id_color, unit, amount, start, schedule, frequence, duration }
  ) {
    state.listPdUser.forEach(element => {
      element.name_pd = name_pd;
      element.id_color = id_color;
      element.unit = unit;
      element.amount = amount;
      element.start = start;
      element.schedule = schedule;
      element.frequence = frequence;
      element.duration = duration;
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
