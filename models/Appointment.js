module.exports = (dbConnection, Sequelize, Customer, BarberService) => {
    const Appointment = dbConnection.define("Appointment", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Customer,
                key: "id"
            }
        },
        barberServiceId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: BarberService,
                key: "id"
            }
        },
        datetime: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Appointment
}