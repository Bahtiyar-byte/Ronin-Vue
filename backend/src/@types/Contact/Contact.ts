import type StandardEntity from '~/@types/StandardEntity'

export default interface Contact extends StandardEntity
{
    name?: string
    email?: string
}
