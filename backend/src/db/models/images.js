const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const images = sequelize.define(
    'images',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  images.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.images.hasMany(db.users, {
      as: 'users_imageId',
      foreignKey: {
        name: 'imageIdId',
      },
      constraints: false,
    });

    //end loop

    db.images.belongsTo(db.jobs, {
      as: 'jobId',
      foreignKey: {
        name: 'jobIdId',
      },
      constraints: false,
    });

    db.images.belongsTo(db.users, {
      as: 'userId',
      foreignKey: {
        name: 'userIdId',
      },
      constraints: false,
    });

    db.images.belongsTo(db.documents, {
      as: 'documentId',
      foreignKey: {
        name: 'documentIdId',
      },
      constraints: false,
    });

    db.images.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.images.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return images;
};
