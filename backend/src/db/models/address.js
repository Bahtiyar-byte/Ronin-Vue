const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');
const stateAbbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'AS', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];
module.exports = function (sequelize, DataTypes) {
  const address = sequelize.define(
    'address',
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

        values: stateAbbreviations,
      },

      zip: {
        type: DataTypes.TEXT,
      },

      country: {
        type: DataTypes.ENUM,

        values: ['USA'],
      },

      is_mailing_address: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      is_location: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      is_billing_Address: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      latitude: {
        type: DataTypes.DECIMAL,
      },

      longitude: {
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

  address.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.address.belongsTo(db.contacts, {
      as: 'related_contact',
      foreignKey: {
        name: 'related_contactId',
      },
      constraints: false,
    });

    db.address.belongsTo(db.jobs, {
      as: 'related_job',
      foreignKey: {
        name: 'related_jobId',
      },
      constraints: false,
    });

    db.address.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.address.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return address;
};
