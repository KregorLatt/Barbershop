import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.js'

import BarbersView from './views/BarbersView.js'
import ServicesView from './views/ServicesView.js'
import AppointmentsView from './views/AppointmentsView.js'
import CustomersView from './views/CustomersView.js'


const routes = [
    { path: "/barbers", component: BarbersViewView },
    { path: "/services", component: ServicesViewView },
    { path: "/appointments", component: AppointmentsView },
    { path: "/customers", component: CustomersView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})



const app = createApp(App)

app.use(router)

app.config.globalProperties.API_URL = 'http://localhost:8080'
app.mount('#app')