module.exports = (dbConnection, Sequelize) => {
    const Service = dbConnection.define("Service", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        service_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price:
        {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
    })
    return Service
}