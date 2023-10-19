const ServicesController = require("../controllers/ServicesController.js")
module.exports = (app) => {
    app.route("/services")
        .get(ServicesController.getAll)
        .post(ServicesController.createNew)      // Create
    app.route("/services/:id")
        .get(ServicesController.getById)         // Read
        .put(ServicesController.editById)        // Update
        .delete(ServicesController.deleteById)   // Delete
}