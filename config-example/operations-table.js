export default {
    columns: {
        date: {
            title: 'Date',
            options: {sortable: true, filter: true},
            width: 120,
            getter(item) {
                return item.created_at;
            }
        },
        amount: {
            title: 'Amount',
            options: {sortable: true, filter: true},
            width: 120,
            render(data) {
                return (data < 0 ? '&ndash;' : '+') + '$' + Math.abs(data)
            }
        },
        type: {
            title: 'Type',
            options: {sortable: true, filter: true},
            width: 120,
        },
        subject: {
            title: 'Subject',
            options: {sortable: true, filter: true},
            width: 120,
        },
        description: {
            title: 'Description',
            width: 200
        },
        invoice: {
            title: 'Invoice',
            getter(item) {
                return item.uuid
            },
            render(data) {
                return '<a href="/invoice/'+data+'">Download</a>';
            }

        }
    },
    options: {
        nodata_message: true,
        top_panel: true,
        bottom_panel: true
    },
    dates: {
        'this-month': 'This month',
        'last-month': 'Last month',
    },
    date_options: {
        specific_date: true,
        period: true
    },
    pageby: [10, 50, 100],
    searchby: ['description'],
    input_delay: 1000
}
