const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const estimates = sequelize.define(
    'estimates',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      description: {
        type: DataTypes.TEXT,
      },

      additionalNotes: {
        type: DataTypes.TEXT,
      },

      price: {
        type: DataTypes.DECIMAL,
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

  estimates.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.estimates.hasMany(db.orders, {
      as: 'orders_estimateId',
      foreignKey: {
        name: 'estimateIdId',
      },
      constraints: false,
    });

    //end loop

    db.estimates.belongsTo(db.jobs, {
      as: 'jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.estimates.belongsTo(db.contacts, {
      as: 'contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    db.estimates.belongsTo(db.templates, {
      as: 'templateId',
      foreignKey: {
        name: 'templateIdId',
      },
      constraints: false,
    });

    db.estimates.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.estimates.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return estimates;
};
