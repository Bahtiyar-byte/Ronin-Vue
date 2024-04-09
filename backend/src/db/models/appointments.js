const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const appointments = sequelize.define(
    'appointments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      date: {
        type: DataTypes.DATE,
      },

      scheduled: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      name: {
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

  appointments.associate = (db) => {
    db.appointments.belongsToMany(db.contacts, {
      as: 'contact',
      foreignKey: {
        name: 'appointments_contactId',
      },
      constraints: false,
      through: 'appointmentsContactContacts',
    });

    db.appointments.belongsToMany(db.jobs, {
      as: 'job',
      foreignKey: {
        name: 'appointments_jobId',
      },
      constraints: false,
      through: 'appointmentsJobJobs',
    });

    db.appointments.belongsToMany(db.estimates, {
      as: 'estimate',
      foreignKey: {
        name: 'appointments_estimateId',
      },
      constraints: false,
      through: 'appointmentsEstimateEstimates',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.appointments.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.appointments.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return appointments;
};
