export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{id}}</td>
    </tr>
    <tr>
        <th>Customer</th>
        <select :value="customerId" @input="$emit('update:customerId',$event.target.value)">
            <option v-for="customer in customers" :value="customer.id">{{customer.name}}</option>
        </select>
    </tr>
    <tr>
        <th>Barber Service</th>
        <select :value="barberServiceId" @input="$emit('update:barberServiceId',$event.target.value)">
            <option v-for="barberService in barberServices" :value="barberService.id">{{barberService.Barber.name}} - {{barberService.Service.service_name}} - {{barberService.price}}</option>
        </select>
    </tr>
    <tr>
        <th>Datetime</th>
        <td><input type="datetime-local" :value="datetime" @input="$emit('update:datetime',$event.target.value)"></td>
    </tr>
    </table>
    `,
    props: ["id","customerId","barberServiceId","datetime","update:datetime","update:barberServiceId","update:customerId"],
    data() {
        return {
            customers: [],
            barberServices: []
        }
    },
    async created() {
        this.customers = await (await fetch("http://localhost:8080/customers")).json()
        this.barberServices = await (await fetch("http://localhost:8080/barberServices")).json()
    }
}