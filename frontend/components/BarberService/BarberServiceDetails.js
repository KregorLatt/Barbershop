export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{barberServiceInModal.id}}</td>
    </tr>
    <tr>
        <th>Price</th>
        <td>{{barberServiceInModal.price}}</td>
    </tr>
    <tr>
        <th>Barber</th>
        <td>{{barber}}</td>
    </tr>
    <tr>
        <th>Service</th>
        <td>{{service}}</td>
    </tr>
    <tr>
    <th>Appointments</th>
    <td v-for="appointment in barberServiceInModal.appointments">
        {{appointment.datetime}} - {{appointment.BarberService.Barber.name}} - {{appointment.BarberService.Service.name}}
    </td>
</tr>
</table>`,
    props: ["barberServiceInModal","barber","service"]
}