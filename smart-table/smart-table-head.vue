<template>
    <thead>
    <tr>
        <th v-for="(item, key) in columns" :key="key" v-model="columns">
            <div :class="{'d-flex': true, 'additional-controls': isSortable(item) || isFilterable(item), 'withsorting': isSortable(item), 'withfilter': isFilterable(item)}" :style="{ 'min-width': item.width ? item.width + 'px' : '' }">
                <span>{{ item.title }}</span>
                <div class="d-flex controls">
                    <div v-if="isFilterable(item)" class="float-right">
                        <button class="btn btn-table-order" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" ><i class="fas fa-ellipsis-v"></i></button>
                        <div class="dropdown-menu dropdown-menu-right p-4">
                            <label>Filter by value:</label>
                            <input type="text" class="ml-2" v-model="frame.filter" @input="reFrame">
                            <button class="btn" @click="filterBy(key)">OK</button>
                        </div>
                    </div>
                    <div v-if="isSortable(item)">
                        <button class="btn btn-table-order" @click="sortBy(key)"><i :class="sortIcon(item, key)"></i></button>
                    </div>
                </div>
            </div>
        </th>
    </tr>
    </thead>
</template>

<script>
    export default {
        props: ['columns', 'viewframe'],
        name: "smart-table-head",
        data() {
            return {
                frame: this.viewframe,
            }
        },
        methods: {
            isSortable(item) {
                return item.options !== undefined && item.options.sortable;
            },
            isFilterable(item) {
                return item.options !== undefined && item.options.filter;
            },
            sortIcon( item, key ) {
                let icons = { 'asc': 'fa-sort-up', desc: 'fa-sort-down', none: 'fa-sort' };
                let icon = icons[ key === this.frame.orderby ? (this.frame.order || 'none') : 'none'];
                return 'fas ' + icon;
            },
            sortBy: function (key) {
                let switches = { 'asc': 'desc', 'desc': 'none', 'none': 'asc'};
                if (this.frame.orderby !== key) {
                    this.frame.order = 'asc';
                    this.frame.orderby = key;
                } else {
                    this.frame.order = switches[this.frame.order];
                }
                this.reFrame();
            },
            filterBy(key) {
                this.frame.filter = '';
                this.frame.filterby = key;
            },
            reFrame() {
                this.$emit('reFrame', { ...this.frame })
            }
        }
    }
</script>

<style scoped>
    .smart-table .table thead th span {
        line-height: 28px;
    }
    .btn-table-order {
        max-width: 33px;
    }
    .date-range {
        max-width: 200px;
    }
    .additional-controls {
        justify-content: space-between;
    }

</style>