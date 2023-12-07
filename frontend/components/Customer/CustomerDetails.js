export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{customerInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{customerInModal.name}}</td>
    </tr>
    <tr>
        <th>Contact details</th>
        <td>{{customerInModal.contact_details}}</td>
    </tr>
    <tr>
    <th>Appointments</th>
    <td v-for="appointment in customerInModal.Appointments">
        {{appointment.BarberService.Barber.name}} - {{appointment.BarberService.Service.service_name}} - {{appointment.datetime}}
    </td>
</tr>
</table>`,
    props: ["customerInModal"]
}