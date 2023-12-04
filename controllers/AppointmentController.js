const { db } = require("../db.js")
const appointments = db.appointmentsCreate
const { getBaseurl } = require("./helpers.js")
//Create
exports.createNew = async (req, res) => {
    if (!req.body.id || !req.body.customerId || !req.body.serviceId || !req.body.datetime) {
        return res.status(400).send({ error: "one or more parameters are missing" })
    }
    const createdAppointment = await appointments.create(req.body, {
        fields: ["id", "customerId", "serviceId", "datetime"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/appointments/${createdAppointment.id}`)
        .json(createdAppointment)
}

//Read
exports.getAll = async (req, res) => {
    const result = await appointments.findAll({ attributes: ["id","customerId", "serviceId", "datetime"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundAppointment = await appointments.findByPk(req.params.id)
    if (foundAppointment === null) {
        return res.status(404).send({ error: `Appointment not found` })
    }
    res.json(foundAppointment)
}
// UPDATE
exports.editById = async (req, res) => {
    const updatedResult = await appointments.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["id", "customerId", "serviceId", "datetime"]
    })
    if (updatedResult[0] == 0) {
        return res.status(404).send({ error: "Appointment not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/appointments/${req.params.id}`)
        .send()
}


// DELETE
exports.deleteById = async (req, res) => {
    const deleteAmount = await appointments.destroy({
        where: { id: req.params.id }
    })
    if (deleteAmount === 0) {
        return res.status(404).send({ error: "Appointment not found" })
    }
    res.status(204).send()
}