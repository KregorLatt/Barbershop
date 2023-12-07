const { db } = require("../db")
const barberService = db.barberServices
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.barberId || !req.body.serviceId || !req.body.price) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdBarberService = await barberService.create(req.body, {
        fields: ["barberId", "serviceId","price"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/barberservices/${createdBarberService.id}`)
        .json(createdBarberService)
}
// READ
exports.getAll = async (req, res) => {
    const result = await barberService.findAll({
        include: [db.barbers, db.services]
    })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundBarberService = await barberService.findByPk(req.params.id, {
        include: [db.barbers, db.services]
    })
    if (foundBarberService === null) {
        return res.status(404).send({ error: `BarberService not found` })
    }
    res.json(foundBarberService)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await barberService.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["barberId", "serviceId","price"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "BarberService not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/barberservices/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await barberService.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "BarberService not found" })
    }
    res.status(204).send()
}