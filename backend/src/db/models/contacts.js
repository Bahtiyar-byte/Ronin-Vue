const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const contacts = sequelize.define(
    'contacts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      firstName: {
        type: DataTypes.TEXT,
      },

      lastName: {
        type: DataTypes.TEXT,
      },

      email: {
        type: DataTypes.TEXT,
      },

      phone: {
        type: DataTypes.TEXT,
      },

      company: {
        type: DataTypes.TEXT,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['Lead', 'Prospect', 'Customer'],
      },

      source: {
        type: DataTypes.ENUM,

        values: ['Google Ads', 'Facebook', 'Website', 'Other'],
      },

      crossReference: {
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

  contacts.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.contacts.hasMany(db.addresses, {
      as: 'addresses_contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    db.contacts.hasMany(db.jobs, {
      as: 'jobs_contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    db.contacts.hasMany(db.estimates, {
      as: 'estimates_contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    db.contacts.hasMany(db.emails, {
      as: 'emails_contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    db.contacts.hasMany(db.appointments, {
      as: 'appointments_contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    db.contacts.hasMany(db.contracts, {
      as: 'contracts_contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    //end loop

    db.contacts.belongsTo(db.users, {
      as: 'assignedUserId',
      foreignKey: {
        name: 'assignedUserIdId',
      },
      constraints: false,
    });

    db.contacts.belongsTo(db.users, {
      as: 'createdBy',
      foreignKey: {
        name: 'createdById',
      },
      constraints: false,
    });

    db.contacts.belongsTo(db.users, {
      as: 'updatedBy',
      foreignKey: {
        name: 'updatedById',
      },
      constraints: false,
    });

    db.contacts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.contacts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return contacts;
};
