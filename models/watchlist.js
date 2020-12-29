//create To Watch list 
module.exports = function (sequelize, DataTypes) {
    const ToWatch = sequelize.define('ToWatch', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rated: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plot: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false
        },
        streaming: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        watched: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    return ToWatch;
};