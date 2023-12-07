module.exports = (dbConnection, Sequelize) => {
    const Barber = dbConnection.define("Barber", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contact_details: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Barber
}