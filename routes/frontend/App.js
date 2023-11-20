import barberList from "./components/BarberList.js"
import barberInfoModal from "./components/BarberInfoModal.js"
export default {
    /*html*/
    template: `
    <barber-list :key="update" @showModal="openModal"></barber-list>
    <barber-info-modal @barberUpdated="updateView" :barberInModal="barberInModal"></barber-info-modal>
    `,
    components: {
        barberList,
        barberInfoModal
    },
    data() {
        return {
            update: 0,
            barberInModal: { id: "", name: "", contact_details: ""}
        }
    },
    methods: {
        openModal(barber){
            this.barberInModal = barber
            let barberInfoModal = new bootstrap.Modal(document.getElementById("barberInfoModal"))
            barberInfoModal.show()
        },
        updateView(barber) {
            this.update++
            this.barberInModal = barber
        }
    }
}