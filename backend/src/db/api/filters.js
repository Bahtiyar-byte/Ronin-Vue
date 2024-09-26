const db = require('../models');
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class FiltersDBApi {
  static async findVariants(filter, options) {
    const { entity, column } = filter;

    // Получаем модель по названию сущности
    const model = db[entity.toLowerCase()];

    if (!model) {
      throw new Error(`Model ${entity} not found`);
    }

    // Получаем описание столбца из метаданных модели
    const columnDefinition = model.rawAttributes[column.toLowerCase()];
    if (!columnDefinition) {
      throw new Error(`Column ${column} not found in model ${entity}`);
    }

    // Проверяем, что тип столбца - ENUM
    if (columnDefinition.type.key !== 'ENUM') {
      throw new Error(`Column ${column} is not of type ENUM`);
    }

    // Возвращаем варианты ENUM
    return columnDefinition.values;
  }
};
