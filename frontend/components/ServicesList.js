export default {
    /*html*/
    template: `
    <table id="servicesTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="service in services">
                <td @click="getservice(service.id)">{{ service.name }}</td>
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
        getservice: async function (id) {
            const serviceInModal = await (await fetch(this.API_URL + "/services/" + id)).json()
            this.$emit("showModal", serviceInModal)
        }
    }
}