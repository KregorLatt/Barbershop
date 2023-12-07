const { db } = require("../db")
const services = db.services
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.service_name|| !req.body.price|| !req.body.description) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdService = await services.create({ ...req.body }, {
        fields: ["service_name","description"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/services/${createdService.id}`)
        .send(createdService)
} 
// READ
exports.getAll = async (req, res) => {
    const result = await services.findAll({ attributes: ["id","service_name","description"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundPlayer = await services.findByPk(req.params.id)
    if (foundPlayer === null) {
        return res.status(404).send({ error: `Service  not found` })
    }
    res.json(foundPlayer)
}
// UPDATE
exports.editById = async (req, res) => {
    const foundPlayer = await services.findByPk(req.params.id)
    if (foundPlayer === null) {
        return res.status(404).send({ error: `Service  not found` })
    }
    
    const updateResult = await services.update({ ...foundPlayer,...req.body }, {
        where: { id: req.params.id },
        fields: ["service_name","description"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Service  not found" })
    }
    res.status(202)
        .location(`${getBaseurl(req)}/services/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await services.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Service not found" })
    }
    res.status(204).send()
}