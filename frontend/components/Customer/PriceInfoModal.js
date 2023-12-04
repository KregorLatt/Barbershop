import confirmationModal from "../ConfirmationModal.js";

export default {
    /*html*/
    template: `
<div id="customerInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{customerInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedcustomer.name"></td>
                        <td v-else>{{customerInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>Contact_details</th>
                        <td v-if="isEditing"><input v-model="modifiedcustomer.contact_details"></td>
                        <td v-else>{{customerInModal.contact_details}}</td>
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
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedcustomer">Save</button>
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
<confirmation-modal :target="'#customerInfoModal'" @confirmed="deletecustomer"></confirmation-modal>
    `,
    components: {
        confirmationModal
    },
    emits: ["customerUpdated"],
    props: {
        customerInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedcustomer: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedcustomer = { ...this.customerInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedcustomer() {
            console.log("Saving:", this.modifiedcustomer);
            const rawResponse = await fetch(this.API_URL + "/customers/" + this.modifiedcustomer.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedcustomer)
            });
            console.log(rawResponse);
            this.$emit("customerUpdated", this.modifiedcustomer)
            this.isEditing = false
        },
        async deleteCustomer() {
            console.log("Deleting:", this.modifiedCustomer);
            const rawResponse = await fetch(this.API_URL + "/customers/" + this.modifiedCustomer.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedCustomer)
            });
                console.log(rawResponse);
                this.$emit("customerUpdated", this.modifiedCustomer)
                this.isEditing = false
        }
    }
}