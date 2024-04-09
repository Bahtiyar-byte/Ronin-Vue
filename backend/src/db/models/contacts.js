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

      name: {
        type: DataTypes.TEXT,
      },

      email: {
        type: DataTypes.TEXT,
      },

      phone: {
        type: DataTypes.TEXT,
      },

      adress: {
        type: DataTypes.TEXT,
      },

      firstName: {
        type: DataTypes.TEXT,
      },

      lastName: {
        type: DataTypes.TEXT,
      },

      stage: {
        type: DataTypes.ENUM,

        values: ['Lead', 'Prospect', 'Customer'],
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
    db.contacts.belongsToMany(db.jobs, {
      as: 'job',
      foreignKey: {
        name: 'contacts_jobId',
      },
      constraints: false,
      through: 'contactsJobJobs',
    });

    db.contacts.belongsToMany(db.estimates, {
      as: 'estimate',
      foreignKey: {
        name: 'contacts_estimateId',
      },
      constraints: false,
      through: 'contactsEstimateEstimates',
    });

    db.contacts.belongsToMany(db.appointments, {
      as: 'appointment',
      foreignKey: {
        name: 'contacts_appointmentId',
      },
      constraints: false,
      through: 'contactsAppointmentAppointments',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.contacts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.contacts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return contacts;
};
