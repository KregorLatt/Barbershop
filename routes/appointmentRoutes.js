const appointmentcontroller = require("../controllers/appointmentcontroller")
module.exports = (app) => {
    app.route("/appointments")
        .get(appointmentcontroller.getAll)
        .post(appointmentcontroller.createNew) //Create
    app.route("/appointments/:id")
        .get(appointmentcontroller.getById)   //Read
        .put(appointmentcontroller.editById)  //Update
        .delete(appointmentcontroller.deleteById) //Delete
}