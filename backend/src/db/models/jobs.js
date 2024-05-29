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

      Name: {
        type: DataTypes.TEXT,
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

      category: {
        type: DataTypes.ENUM,

        values: ['Commercial ', 'Residential', 'Property Management'],
      },

      status: {
        type: DataTypes.ENUM,

        values: [
          'Quoted',

          'Approved',

          'Active',

          'Completed',

          'Invoiced',

          'Closed',
        ],
      },

      startDate: {
        type: DataTypes.DATE,
      },

      endDate: {
        type: DataTypes.DATE,
      },

      description: {
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

  jobs.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.jobs.hasMany(db.addresses, {
      as: 'addresses_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.estimates, {
      as: 'estimates_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.invoices, {
      as: 'invoices_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.orders, {
      as: 'orders_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.images, {
      as: 'images_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.documents, {
      as: 'documents_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.emails, {
      as: 'emails_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.chats, {
      as: 'chats_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.appointments, {
      as: 'appointments_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.tasks, {
      as: 'tasks_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.contracts, {
      as: 'contracts_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.jobs.hasMany(db.amendments, {
      as: 'amendments_jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    //end loop

    db.jobs.belongsTo(db.contacts, {
      as: 'contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    db.jobs.belongsTo(db.orders, {
      as: 'orderId',
      foreignKey: {
        name: 'orderIdId',
      },
      constraints: false,
    });

    db.jobs.belongsTo(db.users, {
      as: 'assignedUserId',
      foreignKey: {
        name: 'assignedUserIdId',
      },
      constraints: false,
    });

    db.jobs.belongsTo(db.users, {
      as: 'createdBy',
      foreignKey: {
        name: 'createdById',
      },
      constraints: false,
    });

    db.jobs.belongsTo(db.users, {
      as: 'updatedBy',
      foreignKey: {
        name: 'updatedById',
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
