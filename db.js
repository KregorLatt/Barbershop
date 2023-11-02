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

db.barbers.belongsToMany(db.services, { through: db.barberServices })
db.services.belongsToMany(db.barbers, { through: db.barberServices })
db.barbers.hasMany(db.barberServices)
db.services.hasMany(db.barberServices)
db.barberServices.belongsTo(db.barbers)
db.barberServices.belongsTo(db.services)

sync = async () => {
    if (process.env.DROP_DB) {
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
                name: "Maire",
                contact_details: 518318,
            }
        })
        console.log("barber created: ", createdB)
        const [service, createdS] = await db.services.findOrCreate({
            where: {
                Service_name: "Meesteloikus"
            },
            defaults: {
                Service_name: "Meesteloikus"
            }
        })
        console.log("service created: ", createdS)
        const [barberService, createdBS] = await db.barberServices.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                BarberId: barber.id,
                ServiceId: service.id,
                AssignedService: "meesteloikus"
            }
        })
        console.log("barberService created: ", createdBS)
    }
    else {
        await db.connection.sync({ alter: true }) // Alter existing to match the model
    }
}

module.exports = { db, sync }