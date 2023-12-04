import confirmationModal from "../ConfirmationModal.js";

export default {
   /*html*/
   template: `
   <div id="appointmentInfoModal" class="modal" tabindex="-1">
       <div class="modal-dialog">
           <div class="modal-content">
               <div class="modal-header">
                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                   <table class="table table-striped">
                       <tr>
                           <th>Id</th>
                           <td>{{appointmentInModal.id}}</td>
                       </tr>
                       <tr>
                           <th>customerId</th>
                           <td v-if="isEditing"><input v-model="modifiedappointment.customerId"></td>
                           <td v-else>{{appointmentInModal.customerId}}</td>
                       </tr>
                       <tr>
                           <th>barberId</th>
                           <td v-if="isEditing"><input v-model="modifiedappointment.barberId"></td>
                           <td v-else>{{appointmentInModal.barberId}}</td>
                       </tr>

                       <tr>
                       <th>serviceId</th>
                       <td v-if="isEditing"><input v-model="modifiedappointment.serviceId"></td>
                       <td v-else>{{appointmentInModal.serviceId}}</td>
                   </tr>

                   <tr>
                       <th>datetime</th>
                       <td v-if="isEditing"><input v-model="modifiedappointment.datetime"></td>
                       <td v-else>{{appointmentInModal.datetime}}</td>
                   </tr>

                   </table>
               </div>
               <div class="modal-footer">
                   <div class="container">
                       <div class="row">
                           <template v-if="isEditing">
                               <div class="col me-auto">
                                   <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                               </div>
                               <div class="col-auto">
                                   <button type="button" class="btn btn-success mx-2" @click="saveModifiedAppointment">Save</button>
                                   <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                               </div>
                           </template>
                           <template v-else>
                               <div class="col me-auto"></div>
                               <div class="col-auto">
                                   <button type="button" class="btn btn-warning mx-2" @click="startEditing">Edit</button>
                                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                               </div>
                           </template>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
   <confirmation-modal :target="'#appointmentInfoModal'" @confirmed="deleteAppointment"></confirmation-modal>
   ` ,
   components: {
    confirmationModal
},
emits: ["appointmentUpdated"],
props: {
    appointmentInModal: {}
},
data() {
    return {
        isEditing: false,
        modifiedAppointment: {}
    }
},
methods: {
    startEditing() {
        this.modifiedAppointment = { ...this.appointmentInModal }
        this.isEditing = true
    },
    cancelEditing() {
        this.isEditing = false
    },
    async saveModifiedAppointment() {
        console.log("Saving:", this.modifiedAppointment);
        const rawResponse = await fetch(this.API_URL + "/appointments/" + this.modifiedAppointment.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.modifiedAppointment)
        });
        console.log(rawResponse);
        this.$emit("appointmentUpdated", this.modifiedAppointment)
        this.isEditing = false
    },
    async deleteAppointment() {
        console.log("Deleting:", this.modifiedAppointment);
        const rawResponse = await fetch(this.API_URL + "/appointments/" + this.modifiedAppointment.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.modifiedAppointment)
        });
        console.log(rawResponse);
        this.$emit("appointmentUpdated", this.modifiedAppointment)
        this.isEditing = false
    }
}
}