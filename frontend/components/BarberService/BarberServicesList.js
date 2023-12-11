export default {
    /*html*/
    template: `
    <table id="barberServicesTable" class="table table-striped table-bordered">
    <thead>
        <tr>
            <th>Barber</th>
            <th>Service</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="barberService in barberServices">
            <td @click="getBarberService(barberService.id)">{{ barberService.Barber.name }}</td>
            <td>{{ barberService.Service.service_name }}</td>
            <td>{{ barberService.price }}</td>
        </tr>
        </tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            barberServices: []
        }
    },
    async created() {
        this.barberServices = await (await fetch("http://localhost:1025/barberservices")).json()
    },
    methods: {
        getBarberService: async function (id) {
            const barberServiceInModal = await (await fetch(this.API_URL + "/barberservices/" + id)).json()
            this.$emit("showModal", barberServiceInModal)
        }
    }
}