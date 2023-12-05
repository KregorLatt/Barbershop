export default {
   /*html*/
   template:
<table class="table table-striped">
<tr>
    <th>Id</th>
    <td>{{barberInModalid}}</td>
</tr>
<tr>
    <th>Name</th>
    <td><input v-model="name"/></td>
</tr>

</table> ,
props:["id","name","contact_details"],
Emits:["update:name","update:contact_details"]
}