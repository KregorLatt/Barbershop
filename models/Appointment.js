module.exports = (dbConnection, Sequelize) => {
    const Appointment = dbConnection.define("Appointment", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customerId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        barberId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        serviceId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        datetime: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Appointment
}