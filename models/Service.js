module.exports = (dbConnection, Sequelize) => {
    const Service = dbConnection.define("Service", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        service_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
    return Service
}