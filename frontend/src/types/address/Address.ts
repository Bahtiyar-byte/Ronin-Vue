import type Entity from '@/types/common/Entity'

export default interface Address extends Entity {
  street: string,
  suit_apt_unit: string,
  city: string,
  state: string,
  zip: string,
  country: string,
  latitude: string,
  longitude: string,
  is_mailing_address: boolean,
  is_location: boolean,
  is_billng_address: boolean
}
