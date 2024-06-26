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

      name: {
        type: DataTypes.TEXT,
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
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.templates.hasMany(db.estimates, {
      as: 'estimates_templateId',
      foreignKey: {
        name: 'templateIdId',
      },
      constraints: false,
    });

    //end loop

    db.templates.belongsTo(db.trades, {
      as: 'tradeId',
      foreignKey: {
        name: 'tradeIdId',
      },
      constraints: false,
    });

    db.templates.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.templates.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return templates;
};
