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
                <div class="container">
                    <div class="row">
                        <template v-if="isEditing">
                            <div class="col me-auto">
                                <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedService">Save</button>
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
<confirmation-modal :target="'#serviceInfoModal'" @confirmed="deleteService"></confirmation-modal>
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
            fetch(this.API_URL + "/services/" + this.serviceInModal.id, {
                method: 'DELETE'
            });
            this.$emit("serviceUpdated", {})
            this.isEditing = false
        }
    }
    }
