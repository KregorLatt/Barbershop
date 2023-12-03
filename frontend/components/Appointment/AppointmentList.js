export default {
    /*html*/
    template: `
    <table id=appointmentsTable class="table table-striped table-bordered">
    <thead>    
        <tr>
            <th>customerId</th>
            <th>serviceId</th>
            <th>barberId</th>
            <th>datetime</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="appointment in appointments">
            <td @click="getAppointment(appointment.id)">{{appointment.customerId}}</td>
            <td>{{appointment.serviceId}}</td><td>{{appointment.barberId}}</td><td>{{appointment.datetime}}</td>
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