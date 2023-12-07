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
        <td><input :value="service_name" @input="$emit('update:service_name',$event.target.value)"></td>
    </tr>
    <tr>
        <th>Description</th>
        <td><input :value="description" @input="$emit('update:description',$event.target.value)"></td>
    </tr>
</table>`,
    props: ["id", "service_name","description"],
    emits: ["update:service_name", "update:description"]
}
