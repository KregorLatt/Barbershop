export default {
    /*html*/
    template: `
    <table id=appointmentsTable class="table table-striped table-bordered">
    <thead>    
        <tr>
            <th>Customer</th>
            <th>Barber Service</th>
            <th>datetime</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="appointment in appointments">
            <td @click="getAppointment(appointment.id)">{{ appointment.Customer.name }}</td>
            <td>{{ appointment.BarberService.Barber.name }} - {{appointment.BarberService.Service.service_name}} - {{appointment.BarberService.price}}</td>
            <td>{{ appointment.datetime }}</td>
        </tr>
        </tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            appointments: []
        }
    },
    async created() {
        this.appointments = await (await fetch("http://localhost:8080/appointments")).json()
    },
    methods: {
        getAppointment: async function (id) {
            const appointmentInModal = await (await fetch(this.API_URL + "/appointments/" + id)).json()
            this.$emit("showModal", appointmentInModal)
        }
    }
}