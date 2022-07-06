import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router.js'
import axios from "axios";


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)

axios.defaults.baseURL = 'http://localhost:8080'
const app = createApp(App)
app.config.globalProperties.axios=axios;

app.use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

// createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

