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
    db.appointments.belongsToMany(db.users, {
      as: 'userId',
      foreignKey: {
        name: 'appointments_userIdId',
      },
      constraints: false,
      through: 'appointmentsUserIdUsers',
    });

    db.appointments.belongsToMany(db.contacts, {
      as: 'contactId',
      foreignKey: {
        name: 'appointments_contactIdId',
      },
      constraints: false,
      through: 'appointmentsContactIdContacts',
    });

    db.appointments.belongsToMany(db.jobs, {
      as: 'jobId',
      foreignKey: {
        name: 'appointments_jobIdId',
      },
      constraints: false,
      through: 'appointmentsJobIdJobs',
    });

    db.appointments.belongsToMany(db.estimates, {
      as: 'estimateId',
      foreignKey: {
        name: 'appointments_estimateIdId',
      },
      constraints: false,
      through: 'appointmentsEstimateIdEstimates',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.appointments.belongsTo(db.users, {
      as: 'createdBy',
      foreignKey: {
        name: 'createdById',
      },
      constraints: false,
    });

    db.appointments.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.appointments.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return appointments;
};
