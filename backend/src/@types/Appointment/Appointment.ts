import type StandardEntity from "../StandardEntity";

export default interface Appointment extends StandardEntity
{
    subject: string
    noted: string
    assigned_toId: string | null
    related_jobId: string | null
    related_contactId: string | null
}
