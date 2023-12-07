export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{id}}</td>
    </tr>
    <tr>
        <th>Price</th>
        <td><input type="number" :value="price" @input="$emit('update:price',$event.target.value)"></td>
    </tr>
    <tr>
        <th>Barber</th>
        <td>
            <select :value="barberId" @input="$emit('update:barberId',$event.target.value)">
                <option v-for="barber in barbers" :value="barber.id">{{barber.name}}</option>
            </select>
        </td>
    </tr>
    <tr>
        <th>Service</th>
        <td>
            <select :value="serviceId" @input="$emit('update:serviceId',$event.target.value)">
                <option v-for="service in services" :value="service.id">{{service.service_name}}</option>
            </select>
        </td>
    </tr>
</table>`,
    props: ["id", "price", "serviceId", "barberId"],
    emits: ["update:price", "update:serviceId", "update:barberId"],
    data() {
        return{
            barbers: [],
            services: []
        }
    },
    async created() {
        this.barbers  = await (await fetch("http://localhost:8080/barbers")).json()
        this.services = await (await fetch("http://localhost:8080/services")).json()
    }
}