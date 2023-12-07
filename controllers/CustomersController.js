const { db } = require("../db")
const customers = db.customers
const { getBaseurl } = require("./helpers.js")
//Create
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.contact_details) {
        return res.status(400).send({ error: "one or more parameters are missing" })
    }
    const createdCustomer = await customers.create(req.body, {
        fields: ["name", "contact_details"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/customers/${createdCustomer.id}`)
        .json(createdCustomer)
}

//Read
exports.getAll = async (req, res) => {
    const result = await customers.findAll({ attributes: ["id","name", "contact_details"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    try {
        const foundCustomer = await customers.findByPk(req.params.id, {
            include: [
                {
                    model: db.appointments,
                    attributes: ["id", "barberServiceId", "datetime"],
                    include: [
                        {
                            model: db.barberServices,
                            include: [
                                {
                                    model: db.barbers,
                                },
                                {
                                    model: db.services,
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (foundCustomer === null) {
            return res.status(404).send({ error: `Customer not found` });
        }

        res.json(foundCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

// UPDATE
exports.editById = async (req, res) => {
    const updatedResult = await customers.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "contact_details"]
    })
    if (updatedResult[0] == 0) {
        return res.status(404).send({ error: "customer not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/customers/${req.params.id}`)
        .send()
}


// DELETE
exports.deleteById = async (req, res) => {
    const deleteAmount = await customers.destroy({
        where: { id: req.params.id }
    })
    if (deleteAmount === 0) {
        return res.status(404).send({ error: "customer not found" })
    }
    res.status(204).send()
}