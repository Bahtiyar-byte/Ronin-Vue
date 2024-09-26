import type StandardEntity from '~/@types/StandardEntity'

export default interface Contact extends StandardEntity
{
    name: string
    email: string
    phone: string;
    address: string;
    status: string;
    firstName: string;
    lastName: string;
    source: string;
}
