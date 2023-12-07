export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{serviceInModal.id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td>{{serviceInModal.service_name}}</td>
    </tr>
    <tr>
        <th>Description</th>
        <td>{{serviceInModal.description}}</td>
    </tr>
</table>`,
    props: ["serviceInModal"]
}
