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
            return val.map(item => item.firstName)
        },
        usersOneListFormatter(val) {
            if (!val) return ''
            return val.firstName
        },
        usersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.firstName}
            });
        },
        usersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.firstName, id: val.id}
        },

        contactsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.firstName)
        },
        contactsOneListFormatter(val) {
            if (!val) return ''
            return val.firstName
        },
        contactsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.firstName}
            });
        },
        contactsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.firstName, id: val.id}
        },

        estimatesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        estimatesOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        estimatesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        estimatesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
        },

        jobsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        jobsOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        jobsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        jobsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
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

        templatesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        templatesOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        templatesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        templatesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
        },

        tradesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        tradesOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        tradesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        tradesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
        },

        ordersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        ordersOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        ordersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        ordersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
        },

        imagesManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        imagesOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        imagesManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        imagesOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
        },

        documentsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        documentsOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        documentsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        documentsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
        },

        appointmentsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.id)
        },
        appointmentsOneListFormatter(val) {
            if (!val) return ''
            return val.id
        },
        appointmentsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.id}
            });
        },
        appointmentsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.id, id: val.id}
        },

}
