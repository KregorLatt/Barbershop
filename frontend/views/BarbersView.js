import barbersList from "../components/Barber/BarbersList.js"
import barberInfoModal from "../components/Barber/BarberInfoModal.js"
import newObjectModal from "../components/NewObjectModal.js"
import barberForm from "../components/Barber/BarberForm.js"
export default {
    /*html*/
    template: `
    <button class="btn btn-secondary" @click="newBarber">New Barber</button>
    <barbers-list :key="update" @showModal="openModal"></barbers-list>
    <barber-info-modal @barberUpdated="updateView" :barberInModal="barberInModal"></barber-info-modal>
    `,
    components: {
        barbersList,
        barberInfoModal,
        newObjectModal,
        barberForm
    },
    data() {
        return {
            update: 0,
            barberInModal: { id: "", name: "", contact_details: "" }
        }
    },
    methods: {
        openModal(barber) {
            this.barberInModal = barber
            let barberInfoModal = new bootstrap.Modal(document.getElementById("barberInfoModal"))
            barberInfoModal.show()
        },
        newBarber() {
            this.error = ""
            this.barberInModal = {}
            this.newBarberModal = new bootstrap.Modal(document.getElementById("newGameModal"))
            this.newBarberModal.show()
        },
        updateView(barber) {
            this.update++
            this.barberInModal = barber
        },
        async saveNewBarber() {
            console.log("Saving:", this.barberInModal)
            const rawResponse = await fetch(this.API_URL + "/barbers/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.barberInModal)
            });
            if (rawResponse.ok) {
                this.newBarberModal.hide()
                this.update++
            }
            else {
                const errorResponse = await rawResponse.json()
                this.error = errorResponse.error
            }
        }
    }
}