export default {
    /*html*/
    template: `
    <table id="barbersTable" class="table table-striped table-bordered">
        <tr>
            <th>Name</th>
            <th>Contact_Details</th>
        </tr>
        <tr v-for="barber in barbers">
            <td @click="getBarber(barber.id)">{{ barber.name }}</td>
            <td>{{ barber.contact_details }}</td>
        </tr>
    </table>
    `,
    emits: ["showModal"],
    data() {
        return {
            barbers: []
        }
    },
    async created() {
        this.barbers = await (await fetch("http://localhost:8080/barbers")).json()
    },
    methods: {
        getBarber: async function (id) {
            const barberInModal = await (await fetch(this.API_URL + "/barbers/" + id)).json()
            this.$emit("showModal", barberInModal)
        }
    }
}