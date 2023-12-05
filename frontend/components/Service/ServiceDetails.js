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
        <td>{{serviceInModal.name}}</td>
    </tr>
    <tr>
        <th>Price</th>
        <td>{{serviceInModal.price}}</td>
    </tr>
    <tr>
        <th>Description</th>
        <td>{{serviceInModal.description}}</td>
    </tr>
</table>`,
    props: ["serviceInModal"]
}
