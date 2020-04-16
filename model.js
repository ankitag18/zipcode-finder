const { db } = require('./db');

const LocationModel = db.sequelize.define('location_details', {
    id: { type: db.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    state_id: { type: db.DataTypes.STRING(100) },
    state_name: { type: db.DataTypes.STRING(100) },
    city_name: { type: db.DataTypes.STRING(100) },
    city_id: { type: db.DataTypes.STRING(100) },
    country_id: { type: db.DataTypes.STRING(100) },
    country_name: { type: db.DataTypes.STRING(100) },
    file_url: { type: db.DataTypes.TEXT },
    filename: { type: db.DataTypes.TEXT },
}, {
        timestamps: false
    }
);

module.exports = LocationModel;