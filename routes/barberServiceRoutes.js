const barberServiceController = require("../controllers/BarberServiceController.js")
module.exports = (app) => {
    app.route("/barberservices")
        .get(barberServiceController.getAll)
        .post(barberServiceController.createNew)      // Create
    app.route("/barberservices/:id")
        .get(barberServiceController.getById)         // Read
        .put(barberServiceController.editById)        // Update
        .delete(barberServiceController.deleteById)   // Delete
}