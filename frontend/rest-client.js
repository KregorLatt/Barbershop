import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.js'

import BarbersView from './views/BarbersView.js'
import ServicesView from './views/ServicesView.js'
import AppointmentsView from './views/AppointmentsView.js'
import CustomersView from './views/CustomersView.js'
import BarberServicesView from './views/BarberServicesView.js'


const routes = [
    { path: "/barbers", component: BarbersView },
    { path: "/services", component: ServicesView },
    { path: "/appointments", component: AppointmentsView },
    { path: "/customers", component: CustomersView },
    { path: "/barberservices", component: BarberServicesView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})



const app = createApp(App)

app.use(router)

app.config.globalProperties.API_URL = 'http://localhost:8080'
app.mount('#app')