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
      as: 'contactId',
      foreignKey: {
        name: 'jobs_contactIdId',
      },
      constraints: false,
      through: 'jobsContactIdContacts',
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
      as: 'estimateId',
      foreignKey: {
        name: 'jobs_estimateIdId',
      },
      constraints: false,
      through: 'jobsEstimateIdEstimates',
    });

    db.jobs.belongsToMany(db.appointments, {
      as: 'appointmentId',
      foreignKey: {
        name: 'jobs_appointmentIdId',
      },
      constraints: false,
      through: 'jobsAppointmentIdAppointments',
    });

    db.jobs.belongsToMany(db.images, {
      as: 'imageId',
      foreignKey: {
        name: 'jobs_imageIdId',
      },
      constraints: false,
      through: 'jobsImageIdImages',
    });

    db.jobs.belongsToMany(db.documents, {
      as: 'documentId',
      foreignKey: {
        name: 'jobs_documentIdId',
      },
      constraints: false,
      through: 'jobsDocumentIdDocuments',
    });

    db.jobs.belongsToMany(db.invoices, {
      as: 'invoiceId',
      foreignKey: {
        name: 'jobs_invoiceIdId',
      },
      constraints: false,
      through: 'jobsInvoiceIdInvoices',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.jobs.hasMany(db.estimates, {
      as: 'estimates_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    //end loop

    db.jobs.belongsTo(db.users, {
      as: 'createdBy',
      foreignKey: {
        name: 'createdById',
      },
      constraints: false,
    });

    db.jobs.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.jobs.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return jobs;
};
