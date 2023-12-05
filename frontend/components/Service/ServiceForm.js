export default {
    /*html*/
    template: `
    <table class="table table-striped">
    <tr>
        <th>Id</th>
        <td>{{id}}</td>
    </tr>
    <tr>
        <th>Name</th>
        <td><input :value="name" @input="$emit('update:name',$event.target.value)"></td>
    </tr>
    <tr>
        <th>Price</th>
        <td><input :value="price" @input="$emit('update:price',$event.target.value)"></td>
    </tr>
    <tr>
        <th>Description</th>
        <td><input :value="description" @input="$emit('update:description',$event.target.value)"></td>
    </tr>
</table>`,
    props: ["id", "name", "price","description"],
    emits: ["update:name", "update:price", "update:description"]
}
