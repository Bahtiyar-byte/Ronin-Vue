const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const trades = sequelize.define(
    'trades',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      Name: {
        type: DataTypes.ENUM,

        values: [
          'Ventilation',

          'Vent Install',

          'TPO',

          'Tile',

          'Soffit/Fascia',

          'Slate',

          'Skylight',

          'Silicone',

          'Siding',

          'Shingles',

          'Service Repairs',

          'Service Callback',

          'Painting',

          'Metal',

          'Gutters',

          'Gutter Guards',

          'Gutter Cleaning',

          'Flat Roof',

          'Aluminum/Flashing',

          'Fascia',

          'EPDM',

          'Downspouts',

          'Chimney Cap',

          'Box Gutters',

          'Pressure Washing',
        ],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  trades.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.trades.hasMany(db.templates, {
      as: 'templates_tradeId',
      foreignKey: {
        name: 'tradeIdId',
      },
      constraints: false,
    });

    //end loop

    db.trades.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.trades.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return trades;
};
