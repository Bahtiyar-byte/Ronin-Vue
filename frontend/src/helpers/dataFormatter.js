import dayjs from 'dayjs';

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            name: item.name,
            publicUrl: item.publicUrl || ''
        }))
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },

        usersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        usersOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        usersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        usersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        contactsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        contactsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        contactsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        contactsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        appointmentsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        appointmentsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        appointmentsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        appointmentsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        jobsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        jobsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        jobsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        jobsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        estimatesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        estimatesOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        estimatesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        estimatesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        tradesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        tradesOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        tradesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        tradesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        templatesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        templatesOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        templatesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        templatesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        documentsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.url)
        },
        documentsOneListFormatter(val) {
            if (!val) return ''
            return val.url
        },
        documentsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.url}
            });
        },
        documentsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.url, id: val.id}
        },

        imagesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.url)
        },
        imagesOneListFormatter(val) {
            if (!val) return ''
            return val.url
        },
        imagesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.url}
            });
        },
        imagesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.url, id: val.id}
        },

        rolesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        rolesOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        rolesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        rolesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
        },

        teamsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        teamsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        teamsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        teamsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

        invoicesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        invoicesOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        invoicesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        invoicesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
        },

}
