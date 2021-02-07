import Vue from 'vue';

// @ts-ignore
import layout from "./layout.vue";

// import Home from "./home/index.vue";

Vue.config.productionTip = true;
Vue.config.devtools = true;

Vue.use(VueRouter);

new Vue({
  router: new VueRouter({
    mode: "history",
    routes: [
      // {
      //   path: "/",
      //   component: Home,
      //   name: "home",
      //   // redirect: '/home'
      // }
    ],
  }),
  data: {
    ready: false,
    loading: true,
    message: null,
    error: null
  },

  methods: {
    metadata() {},
  },
  watch: {},
  // async created() {},
  // beforeCreate() {},
  // created() {},
  // beforeMount() {},
  // mounted () {},
  render: (h) => h(layout),
}).$mount("#app");
