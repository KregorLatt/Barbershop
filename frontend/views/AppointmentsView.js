import appointmentList from "../components/Appointment/AppointmentsList.js"
import appointmentInfoModal from "../components/Appointment/AppointmentInfoModal.js"
import appointmentForm from "../components/Appointment/AppointmentForm.js"
import newObjectModal from "../components/NewObjectModal.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newAppointment">New Appointment</button>
    <appointment-list :key="update" @showModal="openModal"></appointment-list>
    <appointment-info-modal @appointmentUpdated="updateView" :appointmentInModal="appointmentInModal"></appointment-info-modal>
    <new-object-modal id="newAppointmentModal" @save="saveNewAppointment">
        <appointment-form v-model:customerId="appointmentInModal.customerId" v-model:barberServiceId="appointmentInModal.barberServiceId" v-model:datetime="appointmentInModal.datetime"></appointment-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        appointmentList,
        appointmentInfoModal,
        appointmentForm,
        newObjectModal
    },
    data() {
        return {
            update: 0,
            appointmentInModal: { id: "", customerId: "", barberId: "", serviceId: "", datetime: "" },
            newAppointmentModal: {},
            error:""
        }
    },
    methods: {
        openModal(appointment){
            this.appointmentInModal = appointment
            let appointmentInfoModal = new bootstrap.Modal(document.getElementById("appointmentInfoModal"))
            appointmentInfoModal.show()
        },
        updateView(appointment) {
            this.update++
            this.appointmentInModal = appointment
        },
        newAppointment() {
            this.error = ""
            this.appointmentInModal = {}
            this.newAppointmentModal = new bootstrap.Modal(document.getElementById("newAppointmentModal"))
            this.newAppointmentModal.show()
        },
        async saveNewAppointment() {
            console.log("Saving:", this.appointmentInModal)
            const rawResponse = await fetch(this.API_URL + "/appointments/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.appointmentInModal)
            });
            if (rawResponse.ok) {
                this.newAppointmentModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    }
}