const venues = require("../Barbers/data")
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdBarber = barbers.create({
        name: req.body.name
    })
    res.status(201)
        .location(`${getBaseurl(req)}/barbers/${createdBarber.id}`)
        .send(createdBarber)
}
// READ
exports.getAll = (req, res) => {
    res.send(barbers.getAll())
}
exports.getById = (req, res) => {
    const foundBarber = barbers.getById(req.params.id)
    if (foundBarber === undefined) {
        return res.status(404).send({ error: `Barber not found` })
    }
    res.send(foundBarber)
}
// UPDATE
exports.editById = (req, res) => {

}
// DELETE
exports.deleteById = (req, res) => {
    if (barbers.delete(req.params.id) === undefined) {
        return res.status(404).send({ error: "Barber not found" })
    }
    res.status(204).send()
}