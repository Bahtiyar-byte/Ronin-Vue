const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const jobs = sequelize.define(
    'jobs',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      category: {
        type: DataTypes.ENUM,

        values: ['Commercial', 'Property Management', 'Residential'],
      },

      type: {
        type: DataTypes.ENUM,

        values: [
          'New',

          'Repair',

          'Service',

          'Inspection',

          'Insurance',

          'Retail',

          'Warranty',
        ],
      },

      status: {
        type: DataTypes.ENUM,

        values: ['Quoted', 'Approved', 'Active', 'Completed', 'Invoiced'],
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

  jobs.associate = (db) => {
    db.jobs.belongsToMany(db.contacts, {
      as: 'contact',
      foreignKey: {
        name: 'jobs_contactId',
      },
      constraints: false,
      through: 'jobsContactContacts',
    });

    db.jobs.belongsToMany(db.users, {
      as: 'assignedUser',
      foreignKey: {
        name: 'jobs_assignedUserId',
      },
      constraints: false,
      through: 'jobsAssignedUserUsers',
    });

    db.jobs.belongsToMany(db.teams, {
      as: 'assignedTeam',
      foreignKey: {
        name: 'jobs_assignedTeamId',
      },
      constraints: false,
      through: 'jobsAssignedTeamTeams',
    });

    db.jobs.belongsToMany(db.estimates, {
      as: 'estimate',
      foreignKey: {
        name: 'jobs_estimateId',
      },
      constraints: false,
      through: 'jobsEstimateEstimates',
    });

    db.jobs.belongsToMany(db.appointments, {
      as: 'appointment',
      foreignKey: {
        name: 'jobs_appointmentId',
      },
      constraints: false,
      through: 'jobsAppointmentAppointments',
    });

    db.jobs.belongsToMany(db.images, {
      as: 'image',
      foreignKey: {
        name: 'jobs_imageId',
      },
      constraints: false,
      through: 'jobsImageImages',
    });

    db.jobs.belongsToMany(db.documents, {
      as: 'document',
      foreignKey: {
        name: 'jobs_documentId',
      },
      constraints: false,
      through: 'jobsDocumentDocuments',
    });

    db.jobs.belongsToMany(db.invoices, {
      as: 'invoice',
      foreignKey: {
        name: 'jobs_invoiceId',
      },
      constraints: false,
      through: 'jobsInvoiceInvoices',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.jobs.hasMany(db.estimates, {
      as: 'estimates_job',
      foreignKey: {
        name: 'jobId',
      },
      constraints: false,
    });

    //end loop

    db.jobs.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.jobs.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return jobs;
};
