
const ContactsDBApi = require('../db/api/contacts');
const ContactsService = require('../services/contacts');
const db = require("../db/models");

module.exports = class RoninContactsService extends ContactsService {
    static async update(data, id, currentUser) {
        await super.update(data, id, currentUser);

        return await ContactsDBApi.findBy({ id: id });
    }
}
