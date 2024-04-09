const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const templates = sequelize.define(
    'templates',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      materialCost: {
        type: DataTypes.DECIMAL,
      },

      laborCost: {
        type: DataTypes.DECIMAL,
      },

      markup: {
        type: DataTypes.DECIMAL,
      },

      profitMargin: {
        type: DataTypes.DECIMAL,
      },

      name: {
        type: DataTypes.TEXT,
      },

      totalPrice: {
        type: DataTypes.DECIMAL,
      },

      unitOfMeasurement: {
        type: DataTypes.ENUM,

        values: ['SQ', 'LF'],
      },

      description: {
        type: DataTypes.TEXT,
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

  templates.associate = (db) => {
    db.templates.belongsToMany(db.trades, {
      as: 'tradeId',
      foreignKey: {
        name: 'templates_tradeIdId',
      },
      constraints: false,
      through: 'templatesTradeIdTrades',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.templates.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.templates.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return templates;
};
