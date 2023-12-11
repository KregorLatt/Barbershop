export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{barberInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{barberInModal.name}}</td>
    </tr>
    <tr>
        <th>Contact details</th>
        <td>{{barberInModal.contact_details}}</td>
    </tr>
    <tr>
        <th>Appointments</th>
        <td>
        <span v-for="appointment in appointments" :key="appointment.id">
            {{appointment.datetime}} - {{appointment.Customer.name}} - {{appointment.BarberService.Service.service_name}} <br>
        </span>
        </td>
    </tr>
</table>`,
    props: ["barberInModal", "appointments"]
}