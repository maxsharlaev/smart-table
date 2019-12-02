<template>
    <div class="smart-table container-fluid p-0" :id="id">

        <smart-table-loader v-if="settings.columns === undefined"></smart-table-loader>

        <div v-if="settings.columns !== undefined" class="">
            <smart-table-top v-if="settings.options.top_panel"
                             :dates="settings.dates" :date_options="settings.date_options" :viewframe="frame"
                             :settings="settings"
                             @reFrame="reFrameTop">
            </smart-table-top>

            <div class="row pl-3 pr-3 table-responsive" :style="{'overflow-x': data_loaded && data.length ? 'auto':'hidden'}">

                <table class="table table-striped">
                    <smart-table-head :columns="settings.columns" :viewframe="frame" @reFrame="reFrameTableHead"></smart-table-head>
                    <smart-table-body v-if="data_loaded" :columns="settings.columns" :data="data" @reFrame="reFrameTableBody" @delete="deleteItem"></smart-table-body>
                </table>
            </div>

            <smart-table-loader v-if="data_loaded === undefined || data_loaded === false"></smart-table-loader>

            <smart-table-nodata-message
                    v-if="data_loaded !== undefined && data_loaded && data.length === 0 && settings.options.nodata_message"
                    :message="settings.options.nodata_message_text">
            </smart-table-nodata-message>

        </div>

        <smart-table-bottom v-if="settings.options.bottom_panel" :viewsize="data.length" :total="total" :viewframe="frame" :settings="settings" @reFrame="reFrameBottom"></smart-table-bottom>

    </div>
</template>

<script>
    import SmartTableLoader from "./smart-table/smart-table-loader";
    import SmartTableTop from "./smart-table/smart-table-top";
    import SmartTableHead from "./smart-table/smart-table-head";
    import SmartTableBody from "./smart-table/smart-table-body";
    import SmartTableBottom from "./smart-table/smart-table-bottom";
    import SmartTableNodataMessage from "./smart-table/smart-table-nodata-message";
    export default {
        components: {SmartTableNodataMessage, SmartTableHead, SmartTableBody, SmartTableBottom, SmartTableTop, SmartTableLoader},
        props: ['id', 'settings', 'data', 'page', 'total', 'data_loaded'],
        name: "smart-table",
        data() {
            return {
                frame: {
                    orderby: '',
                    order: '',
                    filterby: '',
                    filter: '',
                    searchby: this.settings ? this.settings.searchby : '',
                    search: '',
                    page: 1,
                    pageby: this.settings.pageby[0],
                    dateby: 'all',
                    dates: [null, null]
                },
                columns: this.settings.columns,
                timer: null
            }
        },
        watch: {
            settings() {
                this.frame.searchby = this.settings.searchby;
                this.frame.pageby = this.settings.pageby;
            }
        },
        computed: {
            /*sortedList () {
                let that = this;
                let sortParam = that.sortParam;
                //let order = that.sortOrders[sortParam] || 1;
                //let filterString = that.filterString;
                //let filterKey = that.filterKey;
                //let data = that.data;
                if (filterString&&filterKey) {
                    return this.data.filter(function (elem) {
                        elem = elem[filterKey];
                        if(filterString==='') return true;
                        else return elem.toLowerCase().indexOf(filterString.toLowerCase()) > -1;
                    })
                }
                if (sortParam) {
                    that.data.sort(function (a, b) {
                        a = a[sortParam]
                        b = b[sortParam]
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    });
                }
                return this.data;
            }*/
        },
        methods: {
            reFrame() {
                this.$emit('reFrame', { ...this.frame })
            },
            reFrameInput() {
                if (this.timer !== null) {
                    clearTimeout(this.timer);
                }
                let that = this;
                this.timer = window.setTimeout(function() {
                    that.reFrame();
                }, this.settings.input_delay);
            },
            reFrameTop(data) {
                this.frame.search = data.search;
                this.frame.dateby = data.dateby;
                this.frame.dates = data.dates;
                this.$emit('reFrame', { ...this.frame })
            },
            reFrameTableHead() {
                this.frame.order = data.order;
                this.frame.orderby = data.orderby;
                this.frame.filter = data.filter;
                this.frame.filterby = data.filterby;
                this.$emit('reFrame', { ...this.frame })
            },
            reFrameTableBody() {

            },
            reFrameBottom() {
                this.frame.pageby = data.pageby;
                this.frame.page = data.page;
                this.$emit('reFrame', { ...this.frame })
            },
            deleteItem(data) {
                this.$emit('delete', data);
            }
        },
    }
</script>

<style scoped>
</style>
