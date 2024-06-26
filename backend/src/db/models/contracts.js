const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const contracts = sequelize.define(
    'contracts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      amount: {
        type: DataTypes.DECIMAL,
      },

      body: {
        type: DataTypes.TEXT,
      },

      signedDate: {
        type: DataTypes.DATEONLY,

        get: function () {
          return this.getDataValue('signedDate')
            ? moment.utc(this.getDataValue('signedDate')).format('YYYY-MM-DD')
            : null;
        },
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

  contracts.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.contracts.belongsTo(db.contacts, {
      as: 'contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    db.contracts.belongsTo(db.jobs, {
      as: 'jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.contracts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.contracts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return contracts;
};
