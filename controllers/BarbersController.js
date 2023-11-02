const { db } = require("../db")
const barbers = db.barbers
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.contact_details) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdBarber = await barbers.create(req.body, {
        fields: ["name", "Contact_details"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/barber/${createdBarber.id}`)
        .json(createdBarber)
}
// READ
exports.getAll = async (req, res) => {
    const result = await barbers.findAll({ attributes: ["id", "name"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundBarber = await barbers.findByPk(req.params.id)
    if (foundBarber === null) {
        return res.status(404).send({ error: `Barber not found` })
    }
    res.json(foundBarber)
}
// UPDATE
exports.editById = async (req, res) => {
    console.log(req.body)
    console.log(req.params)
    const updateResult = await barbers.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "Contact_details"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Barber not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/barbers/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await barbers.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Barber not found" })
    }
    res.status(204).send()
}