import confirmationModal from "../ConfirmationModal.js"
import barberForm from "./BarberForm.js"
import barberDetails from "./BarberDetails.js"
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
                <barber-form v-if="isEditing" v-model:id="modifiedBarber.id" v-model:name="modifiedBarber.name" v-model:contact_details="modifiedBarber.contact_details" ></barber-form>
                <barber-details v-else :barberInModal="barberInModal" :appointments="appointments"></barber-details>
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <template v-if="isEditing">
                            <div class="col me-auto">
                                <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedBarber">Save</button>
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
<confirmation-modal :target="'#barberInfoModal'" @confirmed="deleteBarber"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        barberForm,
        barberDetails
    },
    emits: ["barberUpdated"],
    props: {
        barberInModal: {}
    },
    data() {
        return {
            isEditing: false,
            modifiedBarber: {},
            appointments: []
        }
    },
    watch: {
        'barberInModal.id': function(newVal) {
            if (newVal) {
                this.fetchAppointments();
            }
        }
    },
    methods: {
        async fetchAppointments(){
            const appointments = await (await fetch(this.API_URL + "/appointments/")).json();
            this.appointments = appointments.filter(appointment => appointment.BarberService.Barber.id == this.barberInModal.id)
            console.log(this.appointments)
        },
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
        deleteBarber() {
            console.log("DELETE confirmed");
            fetch(this.API_URL + "/barbers/" + this.barberInModal.id, {
                method: 'DELETE'
            });
            this.$emit("barberUpdated", {})
            this.isEditing = false
        }
    }
    }