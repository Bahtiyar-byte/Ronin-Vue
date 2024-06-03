const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const addresses = sequelize.define(
    'addresses',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      street: {
        type: DataTypes.TEXT,
      },

      suite_apt_unit: {
        type: DataTypes.TEXT,
      },

      city: {
        type: DataTypes.TEXT,
      },

      state: {
        type: DataTypes.ENUM,

        values: ['AL', 'AK', 'AZ', 'AR', 'CA'],
      },

      zip: {
        type: DataTypes.TEXT,
      },

      country: {
        type: DataTypes.TEXT,
      },

      type: {
        type: DataTypes.ENUM,

        values: ['Mailing', 'Billing', 'Location'],
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

  addresses.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.addresses.belongsTo(db.contacts, {
      as: 'contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    db.addresses.belongsTo(db.jobs, {
      as: 'jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.addresses.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.addresses.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return addresses;
};
