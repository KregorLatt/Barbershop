import servicesList from "../components/Service/ServicesList.js"
import serviceInfoModal from "../components/Service/ServiceInfoModal.js"
import newObjectModal from "../components/NewObjectModal.js"
import ServiceForm from "../components/Service/ServiceForm.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newService">New Service</button>
    <services-list :key="update" @showModal="openModal"></services-list>
    <service-info-modal @serviceUpdated="updateView" :serviceInModal="serviceInModal"></service-info-modal>
    <new-object-modal id="newServiceModal" @save="saveNewService">
    <service-form v-model:name="serviceInModal.name" v-model:price="serviceInModal.price"></service-form>
    <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
</new-object-modal>
    `,
    components: {
        servicesList,
        serviceInfoModal,
        newObjectModal,
        ServiceForm
    },
    data() {
        return {
            update: 0,
            serviceInModal: { id: "", name: "" , price: "" , description:""},
            newServiceModal: {},
            error: ""
        }
    },
    methods: {
        openModal(service) {
            this.serviceInfoModal = service
            let serviceInfoModal = new bootstrap.Modal(document.getElementById("serviceInfoModal"))
            serviceInfoModal.show()
        },
        newService() {
            this.error = ""
            this.serviceInModal = {}
            this.newServiceModal = new bootstrap.Modal(document.getElementById("newServiceModal"))
            this.newServiceModal.show()
        },
        updateView(service) {
            this.update++
            this.serviceInfoModal = service
        },
        async saveNewService() {
            console.log("Saving:", this.serviceInModal)
            const rawResponse = await fetch(this.API_URL + "/services/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.serviceInModal)
            });
            if (rawResponse.ok) {
                this.newServiceModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    }
}