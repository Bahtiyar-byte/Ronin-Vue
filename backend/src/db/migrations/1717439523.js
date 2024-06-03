module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'contacts',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'addresses',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'estimates',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'jobs',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'roles',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'permissions',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'templates',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'trades',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'invoices',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'orders',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'images',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'documents',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'emails',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'chats',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'appointments',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'tasks',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'contracts',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'amendments',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'milestones',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'phoneNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'disabled',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'password',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerified',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'provider',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'userName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'imageIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'images',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'roleIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'roles',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'phone',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'company',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Lead', 'Prospect', 'Customer'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'source',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Google Ads', 'Facebook', 'Website', 'Other'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'crossReference',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'assignedUserIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'addresses',
        'contactIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'contacts',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'addresses',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'addresses',
        'street',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'addresses',
        'suite_apt_unit',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'addresses',
        'city',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'addresses',
        'state',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['AL', 'AK', 'AZ', 'AR', 'CA'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'addresses',
        'zip',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'addresses',
        'country',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'addresses',
        'type',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Mailing', 'Billing', 'Location'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estimates',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estimates',
        'additionalNotes',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estimates',
        'price',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estimates',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estimates',
        'contactIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'contacts',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estimates',
        'templateIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'templates',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'Name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'type',
        {
          type: Sequelize.DataTypes.ENUM,

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
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'category',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Commercial ', 'Residential', 'Property Management'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: [
            'Quoted',
            'Approved',
            'Active',
            'Completed',
            'Invoiced',
            'Closed',
          ],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'startDate',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'endDate',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'contactIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'contacts',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'orderIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'orders',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'assignedUserIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'permissions',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'tradeIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'trades',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'trades',
        'Name',
        {
          type: Sequelize.DataTypes.ENUM,

          values: [
            'Ventilation',
            'Vent Install',
            'TPO',
            'Tile',
            'Soffit/Fascia',
            'Slate',
            'Skylight',
            'Silicone',
            'Siding',
            'Shingles',
            'Service Repairs',
            'Service Callback',
            'Painting',
            'Metal',
            'Gutters',
            'Gutter Guards',
            'Gutter Cleaning',
            'Flat Roof',
            'Aluminum/Flashing',
            'Fascia',
            'EPDM',
            'Downspouts',
            'Chimney Cap',
            'Box Gutters',
            'Pressure Washing',
          ],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'invoiceNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'invoiceDate',
        {
          type: Sequelize.DataTypes.DATEONLY,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'terms',
        {
          type: Sequelize.DataTypes.ENUM,

          values: [
            'By Due Date',
            'Upon Receipt',
            'Net 7 Days',
            'Net 10 Days',
            'Net 15 Days',
            'Net 30 Days',
            'Net 45 Days',
            'Net 60 Days',
          ],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'approvedJobValue',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'invoicedAmount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'balanceAmount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'orders',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'orders',
        'estimateIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'estimates',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'orders',
        'orderNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'orders',
        'totalAmount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'images',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'images',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'images',
        'userIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'images',
        'documentIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'documents',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'documents',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'documents',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'documents',
        'active',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'emails',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'emails',
        'toAddress',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'emails',
        'fromAddress',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'emails',
        'isInbound',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'emails',
        'userIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'emails',
        'contactIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'contacts',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'emails',
        'subject',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'emails',
        'body',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'chats',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'chats',
        'senderIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'chats',
        'receiverIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'chats',
        'message',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'chats',
        'sentTime',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'subject',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'assignedUserIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'contactIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'contacts',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'startTime',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'endTime',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'location',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'reminder',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'subject',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'assignedToUserIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'appointmentIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'appointments',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'dueDateAndTime',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'priority',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['High', 'Medium', 'Low'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'tasks',
        'completed',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contracts',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contracts',
        'amount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contracts',
        'body',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contracts',
        'contactIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'contacts',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contracts',
        'signedDate',
        {
          type: Sequelize.DataTypes.DATEONLY,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contracts',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'amendments',
        'jobIdId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'jobs',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'amendments',
        'type',
        {
          type: Sequelize.DataTypes.ENUM,

          values: [
            'Change Order',
            'Discount',
            'Insurance Claim',
            'Supplement',
            'Upgrade',
          ],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'amendments',
        'amount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'amendments',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'milestones',
        'Name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('milestones', 'Name', { transaction });

      await queryInterface.removeColumn('amendments', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('amendments', 'amount', {
        transaction,
      });

      await queryInterface.removeColumn('amendments', 'type', { transaction });

      await queryInterface.removeColumn('amendments', 'jobIdId', {
        transaction,
      });

      await queryInterface.removeColumn('contracts', 'jobIdId', {
        transaction,
      });

      await queryInterface.removeColumn('contracts', 'signedDate', {
        transaction,
      });

      await queryInterface.removeColumn('contracts', 'contactIdId', {
        transaction,
      });

      await queryInterface.removeColumn('contracts', 'body', { transaction });

      await queryInterface.removeColumn('contracts', 'amount', { transaction });

      await queryInterface.removeColumn('contracts', 'name', { transaction });

      await queryInterface.removeColumn('tasks', 'completed', { transaction });

      await queryInterface.removeColumn('tasks', 'priority', { transaction });

      await queryInterface.removeColumn('tasks', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('tasks', 'jobIdId', { transaction });

      await queryInterface.removeColumn('tasks', 'dueDateAndTime', {
        transaction,
      });

      await queryInterface.removeColumn('tasks', 'appointmentIdId', {
        transaction,
      });

      await queryInterface.removeColumn('tasks', 'assignedToUserIdId', {
        transaction,
      });

      await queryInterface.removeColumn('tasks', 'subject', { transaction });

      await queryInterface.removeColumn('appointments', 'reminder', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'jobIdId', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'location', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'endTime', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'startTime', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'contactIdId', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'assignedUserIdId', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'subject', {
        transaction,
      });

      await queryInterface.removeColumn('chats', 'sentTime', { transaction });

      await queryInterface.removeColumn('chats', 'message', { transaction });

      await queryInterface.removeColumn('chats', 'receiverIdId', {
        transaction,
      });

      await queryInterface.removeColumn('chats', 'senderIdId', { transaction });

      await queryInterface.removeColumn('chats', 'jobIdId', { transaction });

      await queryInterface.removeColumn('emails', 'body', { transaction });

      await queryInterface.removeColumn('emails', 'subject', { transaction });

      await queryInterface.removeColumn('emails', 'contactIdId', {
        transaction,
      });

      await queryInterface.removeColumn('emails', 'userIdId', { transaction });

      await queryInterface.removeColumn('emails', 'isInbound', { transaction });

      await queryInterface.removeColumn('emails', 'fromAddress', {
        transaction,
      });

      await queryInterface.removeColumn('emails', 'toAddress', { transaction });

      await queryInterface.removeColumn('emails', 'jobIdId', { transaction });

      await queryInterface.removeColumn('documents', 'active', { transaction });

      await queryInterface.removeColumn('documents', 'name', { transaction });

      await queryInterface.removeColumn('documents', 'jobIdId', {
        transaction,
      });

      await queryInterface.removeColumn('images', 'documentIdId', {
        transaction,
      });

      await queryInterface.removeColumn('images', 'userIdId', { transaction });

      await queryInterface.removeColumn('images', 'jobIdId', { transaction });

      await queryInterface.removeColumn('images', 'name', { transaction });

      await queryInterface.removeColumn('orders', 'totalAmount', {
        transaction,
      });

      await queryInterface.removeColumn('orders', 'orderNumber', {
        transaction,
      });

      await queryInterface.removeColumn('orders', 'estimateIdId', {
        transaction,
      });

      await queryInterface.removeColumn('orders', 'jobIdId', { transaction });

      await queryInterface.removeColumn('invoices', 'jobIdId', { transaction });

      await queryInterface.removeColumn('invoices', 'balanceAmount', {
        transaction,
      });

      await queryInterface.removeColumn('invoices', 'invoicedAmount', {
        transaction,
      });

      await queryInterface.removeColumn('invoices', 'approvedJobValue', {
        transaction,
      });

      await queryInterface.removeColumn('invoices', 'terms', { transaction });

      await queryInterface.removeColumn('invoices', 'invoiceDate', {
        transaction,
      });

      await queryInterface.removeColumn('invoices', 'invoiceNumber', {
        transaction,
      });

      await queryInterface.removeColumn('trades', 'Name', { transaction });

      await queryInterface.removeColumn('templates', 'tradeIdId', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'name', { transaction });

      await queryInterface.removeColumn('permissions', 'name', { transaction });

      await queryInterface.removeColumn('roles', 'name', { transaction });

      await queryInterface.removeColumn('jobs', 'assignedUserIdId', {
        transaction,
      });

      await queryInterface.removeColumn('jobs', 'orderIdId', { transaction });

      await queryInterface.removeColumn('jobs', 'contactIdId', { transaction });

      await queryInterface.removeColumn('jobs', 'description', { transaction });

      await queryInterface.removeColumn('jobs', 'endDate', { transaction });

      await queryInterface.removeColumn('jobs', 'startDate', { transaction });

      await queryInterface.removeColumn('jobs', 'status', { transaction });

      await queryInterface.removeColumn('jobs', 'category', { transaction });

      await queryInterface.removeColumn('jobs', 'type', { transaction });

      await queryInterface.removeColumn('jobs', 'Name', { transaction });

      await queryInterface.removeColumn('estimates', 'templateIdId', {
        transaction,
      });

      await queryInterface.removeColumn('estimates', 'contactIdId', {
        transaction,
      });

      await queryInterface.removeColumn('estimates', 'jobIdId', {
        transaction,
      });

      await queryInterface.removeColumn('estimates', 'price', { transaction });

      await queryInterface.removeColumn('estimates', 'additionalNotes', {
        transaction,
      });

      await queryInterface.removeColumn('estimates', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('addresses', 'type', { transaction });

      await queryInterface.removeColumn('addresses', 'country', {
        transaction,
      });

      await queryInterface.removeColumn('addresses', 'zip', { transaction });

      await queryInterface.removeColumn('addresses', 'state', { transaction });

      await queryInterface.removeColumn('addresses', 'city', { transaction });

      await queryInterface.removeColumn('addresses', 'suite_apt_unit', {
        transaction,
      });

      await queryInterface.removeColumn('addresses', 'street', { transaction });

      await queryInterface.removeColumn('addresses', 'jobIdId', {
        transaction,
      });

      await queryInterface.removeColumn('addresses', 'contactIdId', {
        transaction,
      });

      await queryInterface.removeColumn('contacts', 'assignedUserIdId', {
        transaction,
      });

      await queryInterface.removeColumn('contacts', 'crossReference', {
        transaction,
      });

      await queryInterface.removeColumn('contacts', 'source', { transaction });

      await queryInterface.removeColumn('contacts', 'status', { transaction });

      await queryInterface.removeColumn('contacts', 'company', { transaction });

      await queryInterface.removeColumn('contacts', 'phone', { transaction });

      await queryInterface.removeColumn('contacts', 'email', { transaction });

      await queryInterface.removeColumn('contacts', 'lastName', {
        transaction,
      });

      await queryInterface.removeColumn('contacts', 'firstName', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'roleIdId', { transaction });

      await queryInterface.removeColumn('users', 'imageIdId', { transaction });

      await queryInterface.removeColumn('users', 'userName', { transaction });

      await queryInterface.removeColumn('users', 'provider', { transaction });

      await queryInterface.removeColumn(
        'users',
        'passwordResetTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'passwordResetToken', {
        transaction,
      });

      await queryInterface.removeColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'emailVerificationToken', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'emailVerified', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'password', { transaction });

      await queryInterface.removeColumn('users', 'disabled', { transaction });

      await queryInterface.removeColumn('users', 'email', { transaction });

      await queryInterface.removeColumn('users', 'phoneNumber', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'lastName', { transaction });

      await queryInterface.removeColumn('users', 'firstName', { transaction });

      await queryInterface.dropTable('milestones', { transaction });

      await queryInterface.dropTable('amendments', { transaction });

      await queryInterface.dropTable('contracts', { transaction });

      await queryInterface.dropTable('tasks', { transaction });

      await queryInterface.dropTable('appointments', { transaction });

      await queryInterface.dropTable('chats', { transaction });

      await queryInterface.dropTable('emails', { transaction });

      await queryInterface.dropTable('documents', { transaction });

      await queryInterface.dropTable('images', { transaction });

      await queryInterface.dropTable('orders', { transaction });

      await queryInterface.dropTable('invoices', { transaction });

      await queryInterface.dropTable('trades', { transaction });

      await queryInterface.dropTable('templates', { transaction });

      await queryInterface.dropTable('permissions', { transaction });

      await queryInterface.dropTable('roles', { transaction });

      await queryInterface.dropTable('jobs', { transaction });

      await queryInterface.dropTable('estimates', { transaction });

      await queryInterface.dropTable('addresses', { transaction });

      await queryInterface.dropTable('contacts', { transaction });

      await queryInterface.dropTable('users', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
