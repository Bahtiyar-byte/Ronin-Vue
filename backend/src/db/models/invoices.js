const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const invoices = sequelize.define(
    'invoices',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      number: {
        type: DataTypes.INTEGER,
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

  invoices.associate = (db) => {
    db.invoices.belongsToMany(db.jobs, {
      as: 'jobId',
      foreignKey: {
        name: 'invoices_jobIdId',
      },
      constraints: false,
      through: 'invoicesJobIdJobs',
    });

    db.invoices.belongsToMany(db.estimates, {
      as: 'estimateId',
      foreignKey: {
        name: 'invoices_estimateIdId',
      },
      constraints: false,
      through: 'invoicesEstimateIdEstimates',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.invoices.belongsTo(db.users, {
      as: 'createdBy',
      foreignKey: {
        name: 'createdById',
      },
      constraints: false,
    });

    db.invoices.belongsTo(db.documents, {
      as: 'document',
      foreignKey: {
        name: 'documentId',
      },
      constraints: false,
    });

    db.invoices.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.invoices.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return invoices;
};
