import {
 createApp
} from 'vue'
import App from './App.vue'
import router from './router'
// import VueCompositionApi from "@vue/composition-api"
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'datatables.net-buttons-bs5'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import $ from 'jquery';
const app = createApp(App);
app.use(router);


// app.use(VueCompositionApi);
app.use(store);
app.use($);
app.mount("#app");