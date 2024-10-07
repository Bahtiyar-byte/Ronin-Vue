// initialFieldsContacts.ts
import * as yup from 'yup'
import type FormField from '@/types/forms/FormField'
import type FormFieldsGroup from '@/types/forms/FormFieldsGroup'
import { useAddress } from '@/composables/useAddress'
import { useContactPhones } from '@/composables/useContactPhones'
import { useContactEmails } from '@/composables/useContactEmails'

const { autocomplete: autocompleteAddress } = useAddress()
const { autocomplete: autocompletePhone } = useContactPhones()
const { autocomplete: autocompleteEmail } = useContactEmails()

export const initialFieldsContacts = (): (FormField | FormFieldsGroup)[] => {
  return [
    {
      title: 'General',
      fields: [
        {
          type: 'input',
          name: 'firstName',
          label: 'First Name',
          value: '',
          rules: yup.string().required('First Name is required'),
        },
        {
          type: 'input',
          name: 'lastName',
          label: 'Last Name',
          value: '',
          rules: yup.string().required('Last Name is required'),
        },
        {
          type: 'contact_emails',
          name: 'related_emails',
          label: 'Emails',
          value: [],
        },
        {
          type: 'related_phones',
          name: 'related_phones',
          label: 'Phones',
          value: [],
        },
        {
          type: 'address_related_contact',
          name: 'address_related_contact',
          label: 'Address',
          value: [],
        },
        // {
        //   type: 'input',
        //   name: 'email',
        //   label: 'Email',
        //   value: '',
        //   rules: yup.string().email('Invalid email').required('Email is required'),
        // },
        // {
        //   type: 'autocomplete',
        //   name: 'related_emails',
        //   label: 'Emails',
        //   value: [],
        //   multiple: true,
        //   eager: true,
        //   clearable: true,
        //   autocomplete_function: async (query: string = '') => {
        //     const { data } = await autocompleteEmail(query)
        //     if (data.value === null) {
        //       return
        //     }
        //
        //     return data.value.map(item => ({
        //       value: item.id,
        //       title: item.label,
        //     }))
        //   },
        //   rules: yup
        //     .array().required('Email is required'),
        // },
        {
          type: 'select',
          name: 'status',
          label: 'Status',
          value: '',
          variants: [],
          rules: yup.string().required('Status is required'),
        },
        // {
        //   type: 'input',
        //   name: 'phone',
        //   label: 'Phone Number',
        //   value: '',
        //   rules: yup.string().required('Phone Number is required'),
        // },
        // related_emails
        // {
        //   type: 'autocomplete',
        //   name: 'related_phones',
        //   label: 'Phone Number',
        //   value: [],
        //   multiple: true,
        //   eager: true,
        //   clearable: true,
        //   autocomplete_function: async (query: string = '') => {
        //     const { data } = await autocompletePhone(query)
        //     if (data.value === null) {
        //       return
        //     }
        //
        //     return data.value.map(item => ({
        //       value: item.id,
        //       title: item.label,
        //     }))
        //   },
        //
        //   rules: yup
        //     .array().required('Phone Number is required'),
        // },
        // {
        //   type: 'autocomplete',
        //   name: 'address_related_contact',
        //   label: 'Address',
        //   value: [],
        //   multiple: true,
        //   eager: true,
        //   clearable: true,
        //   autocomplete_function: async (query: string = '') => {
        //     const { data } = await autocompleteAddress(query)
        //     if (data.value === null) {
        //       return
        //     }
        //
        //     return data.value.map(item => ({
        //       value: item.id,
        //       title: item.label,
        //     }))
        //   },
        //
        //   rules: yup
        //     .array().required('Address is required'),
        // },
        {
          type: 'select',
          name: 'source',
          label: 'Source',
          value: '',
          variants: [],
        },
      ],
    },
  ]
}
