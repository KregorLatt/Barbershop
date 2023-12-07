module.exports = (dbConnection, Sequelize, Customer, Service, Barber) => {
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
        barberId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Barber,
                key: "id"
            }
        },
        serviceId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Service,
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