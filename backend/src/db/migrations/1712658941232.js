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
        'teams',
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

      await queryInterface.addColumn(
        'roles',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'permissions',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'teams',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'name',
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
        'adress',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
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
        'stage',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Lead', 'Prospect', 'Customer'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'contacts',
        'createdById',
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
        'users',
        'createdById',
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
        'trades',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'trades',
        'createdById',
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
        'templates',
        'materialCost',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'laborCost',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'scheduled',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'createdById',
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
        'templates',
        'markup',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'profitMargin',
        {
          type: Sequelize.DataTypes.DECIMAL,
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
        'estimates',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'totalPrice',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'templates',
        'unitOfMeasurement',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['SQ', 'LF'],
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
        'jobs',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'category',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Commercial', 'Property Management', 'Residential'],
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
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Quoted', 'Approved', 'Active', 'Completed', 'Invoiced'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'jobs',
        'createdById',
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
        'documents',
        'createdById',
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
        'createdById',
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
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
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
        'invoices',
        'createdById',
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
        'invoices',
        'documentId',
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
        'images',
        'url',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'documents',
        'url',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'number',
        {
          type: Sequelize.DataTypes.INTEGER,
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
      await queryInterface.removeColumn('invoices', 'number', { transaction });

      await queryInterface.removeColumn('documents', 'url', { transaction });

      await queryInterface.removeColumn('images', 'url', { transaction });

      await queryInterface.removeColumn('invoices', 'documentId', {
        transaction,
      });

      await queryInterface.removeColumn('invoices', 'createdById', {
        transaction,
      });

      await queryInterface.removeColumn('documents', 'name', { transaction });

      await queryInterface.removeColumn('images', 'name', { transaction });

      await queryInterface.removeColumn('images', 'createdById', {
        transaction,
      });

      await queryInterface.removeColumn('documents', 'createdById', {
        transaction,
      });

      await queryInterface.removeColumn('jobs', 'createdById', { transaction });

      await queryInterface.removeColumn('jobs', 'status', { transaction });

      await queryInterface.removeColumn('jobs', 'type', { transaction });

      await queryInterface.removeColumn('jobs', 'category', { transaction });

      await queryInterface.removeColumn('jobs', 'name', { transaction });

      await queryInterface.removeColumn('templates', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'unitOfMeasurement', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'totalPrice', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'name', {
        transaction,
      });

      await queryInterface.removeColumn('estimates', 'name', { transaction });

      await queryInterface.removeColumn('templates', 'name', { transaction });

      await queryInterface.removeColumn('templates', 'profitMargin', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'markup', { transaction });

      await queryInterface.removeColumn('appointments', 'createdById', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'scheduled', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'date', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'laborCost', {
        transaction,
      });

      await queryInterface.removeColumn('templates', 'materialCost', {
        transaction,
      });

      await queryInterface.removeColumn('trades', 'createdById', {
        transaction,
      });

      await queryInterface.removeColumn('trades', 'name', { transaction });

      await queryInterface.removeColumn('users', 'createdById', {
        transaction,
      });

      await queryInterface.removeColumn('contacts', 'createdById', {
        transaction,
      });

      await queryInterface.removeColumn('contacts', 'stage', { transaction });

      await queryInterface.removeColumn('contacts', 'lastName', {
        transaction,
      });

      await queryInterface.removeColumn('contacts', 'firstName', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'name', { transaction });

      await queryInterface.removeColumn('contacts', 'adress', { transaction });

      await queryInterface.removeColumn('contacts', 'phone', { transaction });

      await queryInterface.removeColumn('contacts', 'email', { transaction });

      await queryInterface.removeColumn('contacts', 'name', { transaction });

      await queryInterface.removeColumn('teams', 'name', { transaction });

      await queryInterface.removeColumn('roles', 'permissions', {
        transaction,
      });

      await queryInterface.removeColumn('roles', 'name', { transaction });

      await queryInterface.dropTable('invoices', { transaction });

      await queryInterface.dropTable('teams', { transaction });

      await queryInterface.dropTable('roles', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
