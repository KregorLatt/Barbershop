const { db } = require("../db.js")
const appointments = db.appointments
const { getBaseurl } = require("./helpers.js")

//Create
exports.createNew = async (req, res) => {
  try {
    if (!req.body.customerId || !req.body.barberServiceId || !req.body.datetime) {
        return res.status(400).send({ error: "One or more parameters are missing" });
    }

    const createdAppointment = await appointments.create(req.body, {
        fields: ["customerId", "barberServiceId", "datetime"]
    });

    res.status(201)
        .location(`${getBaseurl(req)}/appointments/${createdAppointment.id}`)
        .json(createdAppointment);
  } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).send({ error: "Internal Server Error" });
  }
}

// Function to format datetime to a string suitable for HTML datetime-local input
const formatDatetimeForHTMLInput = (datetime) => {
  if (!datetime) {
    // If datetime is undefined or null, return an empty string or handle as needed
    return "";
  }

  const pad = (value) => (value < 10 ? `0${value}` : value);

  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Read
exports.getAll = async (req, res) => {
  const result = await appointments.findAll({
    attributes: ["id", "customerId", "barberServiceId", "datetime"],
    include: [
      {
        model: db.customers,
      },
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
  });

  // Map the result to format datetime for HTML input
  const formattedResult = result.map((appointment) => ({
    ...appointment.get(),
    datetime: formatDatetimeForHTMLInput(appointment.datetime),
  }));

  res.json(formattedResult);
};

exports.getById = async (req, res) => {
  const foundAppointment = await appointments.findByPk(req.params.id, {
    include: [
      {
        model: db.customers,
      },
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
  });
  if (foundAppointment === null) {
    return res.status(404).send({ error: `Appointment not found` });
  }

  // Format datetime for HTML input
  const formattedAppointment = {
    ...foundAppointment.get(),
    datetime: formatDatetimeForHTMLInput(foundAppointment.datetime),
  };

  res.json(formattedAppointment);
};
// UPDATE
exports.editById = async (req, res) => {
    const updatedResult = await appointments.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["id", "customerId", "barberServiceId", "datetime"]
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