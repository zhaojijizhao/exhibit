Vue.use(VueRouter);

var RootComponent = Vue.extend({
  template: '<div><router-view></router-view></div>',
  data() {
    return {}
  },
  methods: {
  },
  computed: {
  },
  ready() {
  }
});

var router = new VueRouter();
router.map({
  '/list':{
    component:List
  },
  '/func': {
    component: Func,
    subRoutes: {
      '/flightinfo': {
        component: Flightinfo
      },
      '/flightassist': {
        component: Flightassist
      },
      '/hotelassist': {
        component: Hotelassist
      },
      '/hotelinfo': {
        component: Hotelinfo
      },
      '/confinfo': {
        component: Confinfo
      },
      '/confresource': {
        component: Confresource
      }
    }
  }
});

router.redirect({
  '*': '/list'
})

router.start(RootComponent, '#app');