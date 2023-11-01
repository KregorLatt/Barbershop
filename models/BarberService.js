module.exports = (dbConnection, Sequelize, Barber, Service) => {
    const BarberService = dbConnection.define("BarberService", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        AssignedService: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        BarberId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Barber,
                key: "id"
            }
        },
        ServiceId: {
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