import servicesList from "../components/Service/ServicesList.js"
import serviceInfoModal from "../components/Service/ServiceInfoModal.js"
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
            serviceInfoModal: { id: "", name: "" , price: "" , description:""}
        }
    },
    methods: {
        openModal(service) {
            this.serviceInfoModal = service
            let serviceInfoModal = new bootstrap.Modal(document.getElementById("serviceInfoModal"))
            serviceInfoModal.show()
        },
        updateView(service) {
            this.update++
            this.serviceInfoModal = service
        }
    }
}