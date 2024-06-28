import type StandardEntity from '~/@types/StandardEntity'

export default interface User extends StandardEntity
{
    name?: string
    firstname?: string
    lastname?: string
}
