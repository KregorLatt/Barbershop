const { Sequelize } = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
        timestamps: true
    },
    logging: console.log // console.log
})
try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
const db = {}
db.Sequelize = Sequelize
db.connection = sequelize
db.barbers = require("./models/Barber")(sequelize, Sequelize)
db.services = require("./models/Service")(sequelize, Sequelize)
db.barberServices = require("./models/BarberService")(sequelize, Sequelize, db.barbers, db.services)
db.customers = require("./models/Customer")(sequelize, Sequelize)
db.appointments = require("./models/Appointment")(sequelize, Sequelize, db.customers, db.barberServices)

db.barbers.hasMany(db.barberServices, { foreignKey: "barberId", onDelete: 'CASCADE' });
db.barberServices.belongsTo(db.barbers, { foreignKey: "barberId", onDelete: 'CASCADE' });
db.services.hasMany(db.barberServices, { foreignKey: "serviceId", onDelete: 'CASCADE' });
db.barberServices.belongsTo(db.services, { foreignKey: "serviceId", onDelete: 'CASCADE' });
db.customers.hasMany(db.appointments, { foreignKey: "customerId", onDelete: 'CASCADE' });
db.barberServices.hasMany(db.appointments, { foreignKey: "barberServiceId", onDelete: 'CASCADE' });
db.appointments.belongsTo(db.barberServices, { foreignKey: "barberServiceId", onDelete: 'CASCADE' });
db.customers.hasMany(db.appointments, { foreignKey: "customerId", onDelete: 'CASCADE' });
db.appointments.belongsTo(db.customers, { foreignKey: "customerId", onDelete: 'CASCADE' });

sync = async () => {
    if (process.env.DROP_DB === "true") {
        console.log("Begin DROP")
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 0')
        console.log("Checks disabled")
        await db.connection.sync({ force: true })
        console.log('Database synchronised.');
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 1')
        console.log("Checks enabled")

        const [barber, createdB] = await db.barbers.findOrCreate({
            where: {
                name: "Maire"
            },
            defaults: {
                name: "Murk",
                contact_details: "Murk@gmail.com",
            }
        })
        console.log("barber created: ", createdB)
        const [service, createdS] = await db.services.findOrCreate({
            where: {
                service_name: "Meesteloikus",
                
            },
            defaults: {
                service_name: "Meesteloikus",
                description: "masina lõikus"
            }
        })
        console.log("service created: ", createdS)
        const [barberService, createdBS] = await db.barberServices.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                barberId: barber.id,
                serviceId: service.id,
                price: 10
            }
        })
        console.log("barberService created: ", createdBS)
        
        const [customer, createdC] = await db.customers.findOrCreate({
            where: {
                name: "Maire",
            },
            defaults: {
                name: "Maire",
                contact_details: "maire@gmail.com"
            }
        })
        console.log("customer created: ", createdC)

        const [appointment, createdA] = await db.appointments.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                customerId: customer.id,
                barberServiceId: barberService.id,
                datetime: "2021-05-05 12:00:00"
            }
        })
        console.log("appointment created: ", createdA)
    }
    else {
        console.log("Begin ALTER")
        await db.connection.sync({ alter: true }) // Alter existing to match the model
        console.log('Database synchronised.')
    }
}

module.exports = { db, sync }