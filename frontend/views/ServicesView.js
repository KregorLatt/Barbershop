import servicesList from "../components/ServicesList.js"
import servicesInfoModal from "../components/ServiceInfoModal.js"
export default {
    /*html*/
    template: `
    <services-list :key="update" @showModal="openModal"></services-list>
    <service-info-modal @serviceUpdated="updateView" :serviceInModal="serviceInModal"></service-info-modal>
    `,
    components: {
        servicesList,
        serviceInfoModal
    },
    data() {
        return {
            update: 0,
            serviceInModal: { id: "", name: "" , price: "" , description:""}
        }
    },
    methods: {
        openModal(service) {
            this.serviceInModal = service
            let serviceInfoModal = new bootstrap.Modal(document.getElementById("serviceInfoModal"))
            serviceInfoModal.show()
        },
        updateView(service) {
            this.update++
            this.serviceInModal = service
        }
    }
}