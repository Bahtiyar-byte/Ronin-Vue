const Contracts = require('./contracts.js');

import { Service } from 'typedi';
import { IContractsDBApi } from './interfaces/IContractsDBApi.interface';
const db = require('../models')

@Service()
export default class ContractsDBApi
  extends Contracts
  implements IContractsDBApi {

    static async getContractPublicData(id: string, options?: any) {
        const transaction = (options && options.transaction) || undefined;
        const contract = await db.contracts.findByPk(id, {
            attributes: ['id', 'name', 'signed_date', 'related_contactId'],
            transaction,
        })

        if (!contract) {
            return contract;
        }

        const output = contract.get({ plain: true });

        output.related_contact = await contract.getRelated_contact({
            attributes: ['name', 'email'],
            transaction,
        })

        return output;
    }
}
