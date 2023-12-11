import confirmationModal from "../ConfirmationModal.js"
import barberServiceForm from "./BarberServiceForm.js"
import barberServiceDetails from "./BarberServiceDetails.js"
export default {
    /*html*/
    template: `
<div id="barberServiceInfoModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <barber-service-form v-if="isEditing" v-model:id="modifiedBarberService.id" v-model:price="modifiedBarberService.price"
                 v-model:barberId="modifiedBarberService.barberId" v-model:serviceId="modifiedBarberService.serviceId" ></barber-service-form>
                <barber-service-details v-else :barberServiceInModal="barberServiceInModal" :barber="barberName" :service="serviceName" :appointments="appointments"></barber-service-details>
            </div>
            <div class="modal-footer">
                <div class="container">
                    <div class="row">
                        <template v-if="isEditing">
                            <div class="col me-auto">
                                <button type="button" class="btn btn-danger" data-bs-target="#confirmationModal" data-bs-toggle="modal">Delete</button>
                            </div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-success mx-2" @click="saveModifiedBarberService">Save</button>
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
<confirmation-modal :target="'#barberServiceInfoModal'" @confirmed="deleteBarberService"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        barberServiceForm,
        barberServiceDetails
    },
    emits: ["barberServiceUpdated"],
    props: {
        barberServiceInModal: {}
    },
    computed: {
        barberName:{
            get(){
                const barber = this.barbers.find(barber => barber.id == this.barberServiceInModal.barberId)
                if(barber) return barber.name
                return "";
            }
        },
        serviceName:{
            get(){
                const service = this.services.find(service => service.id == this.barberServiceInModal.serviceId)
                if(service) return service.service_name
                return "";
            }
        }
    },
    async created() {
        this.barbers  = await (await fetch("http://localhost:8080/barbers")).json()
        this.services = await (await fetch("http://localhost:8080/services")).json()
    },
    data() {
        return {
            isEditing: false,
            modifiedBarberService: {},
            barbers: [],
            services: [],
            appointments: []
        }
    },
    watch: {
        'barberServiceInModal.id': function(newVal) {
            if (newVal) {
                this.fetchAppointments();
            }
        }
    },
    methods: {
        async fetchAppointments(){
            const appointments = await (await fetch(this.API_URL + "/appointments/")).json();
            this.appointments = appointments.filter(appointment => appointment.barberServiceId == this.barberServiceInModal.id)
        },
        startEditing() {
            this.modifiedBarberService = { ...this.barberServiceInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedBarberService() {
            console.log("Saving:", this.modifiedBarberService)
            const rawResponse = await fetch(this.API_URL + "/barberservices/" + this.modifiedBarberService.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.modifiedBarberService)
            });
            console.log(rawResponse);
            this.$emit("barberServiceUpdated", this.modifiedBarberService)
            this.isEditing = false
        },
        deleteBarberService() {
            console.log("DELETE confirmed");
            fetch(this.API_URL + "/barberservices/" + this.barberServiceInModal.id, {
                method: 'DELETE'
            });
            this.$emit("barberServiceUpdated", {})
            this.isEditing = false
        }
    }
    }