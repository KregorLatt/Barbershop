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
        <th>Price</th>
        <td>{{customerInModal.contact_details}}</td>
    </tr>
</table>`,
    props: ["customerInModal"]
}