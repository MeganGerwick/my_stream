//create To Watch list 
module.exports = function (sequelize, DataTypes) {
    const Watchlist = sequelize.define('Watchlist', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plot: {
            type: DataTypes.TEXT,
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
        rent: {
            type: DataTypes.STRING,
            allowNull: true
        },
        flatrate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        buy: {
            type: DataTypes.STRING,
            allowNull: true
        },
        movieID: {
            type: DataTypes.INTEGER,
            allowNull: false
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
    return Watchlist;
};