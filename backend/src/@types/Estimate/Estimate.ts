import type StandardEntity from '../StandardEntity';
import type Contact from '~/@types/Contact/Contact';

export default interface Estimate extends StandardEntity
{
    related_contactId: string
    related_contact: string | Contact
}
