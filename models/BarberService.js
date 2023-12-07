module.exports = (dbConnection, Sequelize, Barber, Service) => {
    const BarberService = dbConnection.define("BarberService", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
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
        }
    })
    return BarberService
}