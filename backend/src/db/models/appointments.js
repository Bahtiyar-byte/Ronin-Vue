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

      subject: {
        type: DataTypes.TEXT,
      },

      startTime: {
        type: DataTypes.DATE,
      },

      endTime: {
        type: DataTypes.DATE,
      },

      description: {
        type: DataTypes.TEXT,
      },

      location: {
        type: DataTypes.TEXT,
      },

      reminder: {
        type: DataTypes.DATE,
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
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.appointments.hasMany(db.tasks, {
      as: 'tasks_appointmentId',
      foreignKey: {
        name: 'appointmentIdId',
      },
      constraints: false,
    });

    //end loop

    db.appointments.belongsTo(db.users, {
      as: 'assignedUserId',
      foreignKey: {
        name: 'assignedUserIdId',
      },
      constraints: false,
    });

    db.appointments.belongsTo(db.contacts, {
      as: 'contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    db.appointments.belongsTo(db.jobs, {
      as: 'jobId',
      foreignKey: {
        name: 'jobIdId',
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
