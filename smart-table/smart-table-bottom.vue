<template>
    <div v-if="viewsize" class="background-gray row mt-2">
        <div class="col-md-6">
            <span class="mr-2">Total: {{ totalPages || viewsize }}</span> |
            <span class="ml-2">Per page:</span>
            <select v-model="frame.pageby" @change="reFrame">
                <option v-for="item in settings.pageby" :selected="frame.pageby === item">{{ item }}</option>
            </select>
        </div>
        <div class="col-md-6 text-right pagination">
            <div v-if="totalPages > 0" class="container-fluid">
                <a href="" :class="{'mr-2': true, 'disabled': isPageFirst}" @click.prevent="pageStart"><i class="fa fa-angle-double-left"></i></a>
                <a href="" :class="{'mr-2': true, 'disabled': isPageFirst}" @click.prevent="pagePrev"><i class="fa fa-angle-left"></i></a>
                <select @change="reFrame" v-model="frame.page">
                    <option v-for="i in totalPages" :selected="frame.page === i">{{ i }}</option>
                </select>
                <a href="" :class="{'ml-2': true, 'disabled': isPageLast}" @click.prevent="pageNext"><i class="fa fa-angle-right"></i></a>
                <a href="" :class="{'ml-2': true, 'disabled': isPageLast}" @click.prevent="pageEnd"><i class="fa fa-angle-double-right"></i></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['viewsize', 'viewframe', 'total', 'settings'],
        name: "smart-table-bottom",
        data() {
            return {
                frame: this.viewframe
            }
        },
        watch: {
            viewframe() {
                this.frame = this.viewframe;
            }
        },
        computed: {
            totalPages() {
                return Math.ceil( parseInt(this.total) / this.settings.pageby[0])
            }
        },
        methods: {
            reFrame() {

            },
            isPageFirst() {
                return this.frame.page === 1
            },
            isPageLast() {
                return this.frame.page === this.totalPages()
            },
            pageStart() {
                if (!this.isPageFirst()) {
                    this.frame.page = 1;
                    this.reFrame();
                }
            },
            pageEnd() {
                if (!this.isPageLast()) {
                    this.frame.page = this.totalPages();
                    this.reFrame();
                }
            },
            pagePrev() {
                if (!this.isPageFirst()) {
                    this.frame.page--;
                    this.reFrame();
                }
            },
            pageNext() {
                if (!this.isPageLast()) {
                    this.frame.page++;
                    this.reFrame();
                }
            },

        }
    }
</script>

<style scoped>
    .pagination a.disabled {
        color: #999;
        pointer-events: none;
    }
</style>