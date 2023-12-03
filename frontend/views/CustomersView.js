import customerList from "../components/Customer/CustomerList.js"
import customerInfoModal from "../components/Customer/CustomerInfoModal.js"
export default {
    /*html*/
    template: `
    <customer-list :key="update" @showModal="openModal"></customer-list>
    <customer-info-modal @customerUpdated="updateView" :customerInModal="customerInModal"></customer-info-modal>
    `,
    components: {
        customerList,
        customerInfoModal
    },
    data() {
        return {
            update: 0,
            customerInModal: { id: "", brand: "", model: "", year: "", origin: "" }
        }
    },
    methods: {
        openModal(customer){
            this.customerInModal = customer
            let customerInfoModal = new bootstrap.Modal(document.getElementById("customerInfoModal"))
            customerInfoModal.show()
        },
        updateView(customer) {
            this.update++
            this.customerInModal = customer
        }
    }
}