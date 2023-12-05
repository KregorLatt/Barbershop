const servicesController = require("../controllers/ServicesController.js")
module.exports = (app) => {
    app.route("/services")
        .get(servicesController.getAll)
        .post(servicesController.createNew)      // Create
    app.route("/services/:id")
        .get(servicesController.getById)         // Read
        .put(servicesController.editById)        // Update
        .delete(servicesController.deleteById)   // Delete
}