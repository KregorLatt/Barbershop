export default {
    /*html*/
    template: `
    <table id="servicesTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="service in services">
                <td @click="getService(service.id)">{{ service.service_name }}</td>
                <td>{{ service.description }}</td>
            </tr>
        </tbody>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            services: []
        }
    },
    async created() {
        this.services = await (await fetch("http://localhost:8080/services")).json()
    },
    methods: {
        getService: async function (id) {
            const serviceInModal = await (await fetch(this.API_URL + "/services/" + id)).json()
            this.$emit("showModal", serviceInModal)
        }
    }
}