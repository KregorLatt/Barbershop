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
        <th>Price</th>
        <td>{{barberInModal.contact_details}}</td>
    </tr>
</table>`,
    props: ["barberInModal"]
}