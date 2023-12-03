const customersController = require("../controllers/CustomersController.js")
module.exports = (app) => {
    app.route("/customers")
        .get(customersController.getAll)
        .post(customersController.createNew)      // Create
    app.route("/customers/:id")
        .get(customersController.getById)         // Read
        .put(customersController.editById)        // Update
        .delete(customersController.deleteById)   // Delete
} 