import confirmationModal from "../ConfirmationModal.js"
export default {
    

    /*html*/
    template: `
<div id="barberInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tr>
                        <th>Id</th>
                        <td>{{barberInModal.id}}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td v-if="isEditing"><input v-model="modifiedBarber.name"></td>
                        <td v-else>{{barberInModal.name}}</td>
                    </tr>
                    <tr>
                        <th>Contact_details</th>
                        <td v-if="isEditing"><input v-model="modifiedBarber.contact_details"></td>
                        <td v-else>{{barberInModal.price}}</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedBarber">Save</button>
                    <button type="button" class="btn btn-secondary" @click="cancelEditing">Cancel</button>
                </template>
                <template v-else>
                    <button type="button" class="btn btn-warning" @click="startEditing">Edit</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </template>
            </div>
        </div>
    </div>
</div>
    `,
    components: {
        confirmationModal
    },
    emits: ["barberUpdated"],
    props: {
        barberInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedBarber: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedBarber = { ...this.barberInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedBarber() {
            console.log("Saving:", this.modifiedBarber)
            const rawResponse = await fetch(this.API_URL + "/barbers/" + this.modifiedBarber.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedBarber)
            });
            console.log(rawResponse);
            this.$emit("barberUpdated", this.modifiedBarber)
            this.isEditing = false
        },
        async deleteBarber() {
            console.log("Deleting:", this.modifiedBarber);
            const rawResponse = await fetch(this.API_URL + "/barbers/" + this.modifiedBarber.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedBarber)
            });
            console.log(rawResponse);
            this.$emit("barberUpdated", this.modifiedBarber)
            this.isEditing = false
        }
    }
    }