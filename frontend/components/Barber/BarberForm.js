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
        <th>Contact details</th>
        <td><input :value="contact_details" @input="$emit('update:contact_details',$event.target.value)"></td>
    </tr>
</table>`,
    props: ["id", "name", "contact_details"],
    emits: ["update:name", "update:contact_details"]
}