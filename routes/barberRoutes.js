const barbersController = require("../controllers/BarbersController.js")
module.exports = (app) => {
    app.route("/gaeventsmes")
        .get(barbersController.getAll)
        .post(barbersController.createNew)      // Create
    app.route("/barbers/:id")
        .get(barbersController.getById)         // Read
        .put(barbersController.editById)        // Update
        .delete(barbersController.deleteById)   // Delete
} 