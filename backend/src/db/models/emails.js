const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const emails = sequelize.define(
    'emails',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      toAddress: {
        type: DataTypes.TEXT,
      },

      fromAddress: {
        type: DataTypes.TEXT,
      },

      isInbound: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      subject: {
        type: DataTypes.TEXT,
      },

      body: {
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

  emails.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.emails.belongsTo(db.jobs, {
      as: 'jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.emails.belongsTo(db.users, {
      as: 'userId',
      foreignKey: {
        name: 'userIdId',
      },
      constraints: false,
    });

    db.emails.belongsTo(db.contacts, {
      as: 'contactId',
      foreignKey: {
        name: 'contactIdId',
      },
      constraints: false,
    });

    db.emails.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.emails.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return emails;
};
