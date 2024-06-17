
const ContactsDBApi = require('../db/api/contacts');
const ContactsService = require('../services/contacts');
const db = require("../db/models");

module.exports = class RoninContactsService extends ContactsService {
    static async create(data, currentUser) {
        const transaction = await db.sequelize.transaction();
        try {
            const contacts = await ContactsDBApi.create(data, {
                currentUser,
                transaction,
            });

            await transaction.commit();

            return contacts;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async update(data, id, currentUser) {
        await super.update(data, id, currentUser);

        return await ContactsDBApi.findBy({ id: id });
    }
}
