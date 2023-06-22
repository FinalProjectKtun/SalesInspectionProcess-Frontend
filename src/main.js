import { createApp } from "vue";
import App from "./App.vue";

//vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labs from "vuetify/labs/components";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";
import "./style.css";

const vuetify = createVuetify({
  components: {
    ...labs,
    ...components,
  },

  directives,

  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },

  theme: {
    themes: {
      light: {
        primary: "#FB8C00",
        secondary: "#00B0FF",
        divider: "#000000",
      },
      dark: {
        primary: "#64DD17",
        secondary: "#00B0FF",
        divider: "#FFFFFF",
      },
    },
  },
});

//vuex
import store from "../store/store";

//vue-router
import router from './router/router';

//vue-calendar
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App)
app.use(store)
app.use(vuetify)
app.use(router)
app.use(VCalendar, {})
app.mount('#app')
