import barberServicesList from "../components/BarberService/BarberServicesList.js"
import barberServiceInfoModal from "../components/BarberService/BarberServiceInfoModal.js"
import newObjectModal from "../components/NewObjectModal.js"
import barberServiceForm from "../components/BarberService/BarberServiceForm.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newBarberService">New Service</button>
    <barberServices-list :key="update" @showModal="openModal"></barberServices-list>
    <barberService-info-modal @barberServiceUpdated="updateView" :barberServiceInModal="barberServiceInModal"></barberService-info-modal>
    <new-object-modal id="newBarberServiceModal" @save="saveNewBarberService">
        <barberService-form v-model:price="barberServiceInModal.price" v-model:serviceId="barberServiceInModal.serviceId" v-model:barberId="barberServiceInModal.barberId"></barberService-form>
        <div class="alert alert-danger" role="alert" v-show="error">{{error}}</div>
    </new-object-modal>
    `,
    components: {
        barberServicesList,
        barberServiceInfoModal,
        newObjectModal,
        barberServiceForm
    },
    data() {
        return {
            update: 0,
            barberServiceInModal: { id: "", price: "" , serviceId: "", barberId: ""},
            newBarberServiceModal: {},
            error: ""
        }
    },
    methods: {
        openModal(barberService) {
            this.barberServiceInModal = barberService
            let barberServiceInfoModal = new bootstrap.Modal(document.getElementById("barberServiceInfoModal"))
            barberServiceInfoModal.show()
        },
        newBarberService() {
            this.error = ""
            this.barberServiceInModal = {}
            this.newBarberServiceModal = new bootstrap.Modal(document.getElementById("newBarberServiceModal"))
            this.newBarberServiceModal.show()
        },
        updateView(barberService) {
            this.update++
            this.barberServiceInModal = barberService
        },
        async saveNewBarberService() {
            console.log("Saving:", this.barberServiceInModal)
            const rawResponse = await fetch(this.API_URL + "/barberservices/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.barberServiceInModal)
            });
            if (rawResponse.ok) {
                this.newBarberServiceModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    }
}