module.exports = (dbConnection, Sequelize) => {
    const Service = dbConnection.define("Service", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Service_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Service
}