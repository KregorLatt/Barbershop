const { db } = require("../db")
const barberService = db.barberService
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.contact_details) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdBarber = await barberService.create(req.body, {
        fields: ["name", "contact_details"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/barbers/${createdBarber.id}`)
        .json(createdBarber)
}
// READ
exports.getAll = async (req, res) => {
    const result = await barberService.findAll({
        include: [db.barbers, db.services]
    })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundBarber = await barberService.findByPk(req.params.id)
    if (foundBarber === null) {
        return res.status(404).send({ error: `Barber not found` })
    }
    res.json(foundBarber)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await barberService.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "contact_details"]
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
    const deletedAmount = await barberServicePlays.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Barber not found" })
    }
    res.status(204).send()
}