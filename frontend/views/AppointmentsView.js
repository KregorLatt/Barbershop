import carList from "../components/Appointment/AppointmentList.js"
import carInfoModal from "../components/Appointment/AppointmentInfoModal.js"
export default {
    /*html*/
    template: `
    <appointment-list :key="update" @showModal="openModal"></appointment-list>
    <appointment-info-modal @appointmentUpdated="updateView" :appointmentInModal="appointmentInModal"></appointment-info-modal>
    `,
    components: {
        appointmentList,
        appointmentInfoModal
    },
    data() {
        return {
            update: 0,
            appointmentInModal: { id: "", customerId: "", barberId: "", serviceId: "", datetime: "" }
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
        }
    }
}