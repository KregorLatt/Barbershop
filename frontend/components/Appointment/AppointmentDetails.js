export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{appointmentInModal.id}}</td>
    </tr>
    <tr>
        <th>Customer</th>
        <td v-if="appointmentInModal.Customer">{{ appointmentInModal.Customer.name }}</td>
        <td v-else>No customer information available</td>
    </tr>
    <tr>
        <th>Barber</th>
        <td v-if="appointmentInModal.BarberService">{{ appointmentInModal.BarberService.Barber.name }}</td>
        <td v-else>No barber information available</td>
    </tr>
    <tr>
        <th>Service</th>
        <td v-if="appointmentInModal.BarberService">{{ appointmentInModal.BarberService.Service.service_name }}</td>
        <td v-else>No service information available</td>
    </tr>
    <tr>
        <th>Datetime</th>
        <td>{{appointmentInModal.datetime}}</td>
    </tr>
    </table>
    `,
    props: ["appointmentInModal"]
}