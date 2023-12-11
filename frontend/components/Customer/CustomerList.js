export default{
        /*html*/
        template: `
        <table id=customerTable class="table table-striped table-bordered">
            <thead>
                <tr>
                <th>Name</th>
                <th>Contact details</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="customer in customers">
                    <td @click="getCustomer(customer.id)">{{customer.name}}</td> 
                    <td>{{customer.contact_details}}</td>
                </tr>
            </tbody>
        </table>
        `,
        emits: ["showModal"],
        data(){
            return{
                customers:[]
            }
        },
        async created(){
            this.customers = await (await fetch("http://localhost:1025/customers")).json()
        },
        // async beforeUpdate() {
    //     this.customers = await (await fetch("http://localhost:1025/customers")).json()
    // },
        methods: {
            getCustomer: async function (id) {
                const customerInModal = await (await fetch(this.API_URL + "/customers/" + id)).json()
                this.$emit("showModal", customerInModal)
            }
        }
}