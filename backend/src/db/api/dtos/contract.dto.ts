import type StandardEntity from '~/@types/StandardEntity'

export interface ContractDTO extends StandardEntity {
  name: string | null
  amount: number | null
  body: string | null
  signed_date: Date | null
  related_contactId: string | null
  related_contact: any | null
}
