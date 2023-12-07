import confirmationModal from "../ConfirmationModal.js"
import serviceForm from "./ServiceForm.js"
import serviceDetails from "./ServiceDetails.js"
export default {
    /*html*/
    template: `
<div id="serviceInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <service-form v-if="isEditing" v-model:id="modifiedService.id" v-model:service_name="modifiedService.service_name" v-model:description="modifiedService.description" ></service-form>
                <service-details v-else :serviceInModal="serviceInModal"></service-details>
            </div>
            <div class="modal-footer">
                <template v-if="isEditing">
                    <button type="button" class="btn btn-success" @click="saveModifiedService">Save</button>
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
        confirmationModal,
        serviceForm,
        serviceDetails
    },
    emits: ["serviceUpdated"],
    props: {
        serviceInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedService: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedService = { ...this.serviceInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedService() {
            console.log("Saving:", this.modifiedService)
            const rawResponse = await fetch(this.API_URL + "/services/" + this.modifiedService.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedService)
            });
            console.log(rawResponse);
            this.$emit("serviceUpdated", this.modifiedService)
            this.isEditing = false
        },
        deleteService() {
            console.log("DELETE confirmed");
        }
    }
    }
