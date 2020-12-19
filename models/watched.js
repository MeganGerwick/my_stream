// Creating our Watched model
module.exports = function (sequelize, DataTypes) {
    //create Watched list 
    const Watched = sequelize.define('Watched', {
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
        }
    });
    return Watched;

};
