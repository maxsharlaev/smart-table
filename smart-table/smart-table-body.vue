<template>
    <tbody >
    <tr v-for="(row_item, row_key) in data">
        <td v-for="(item, key) in columns" class="table-cell">
            <span v-if="item.type === 'img'">
                <img :src="row_item[key]">
            </span>
            <span v-else-if="item.type === 'button'">
                <button :class="item.classes(row_item)" v-html="render(item, key, row_item)" @click="buttonClicked(item, key, row_item)"></button>
            </span>
            <span v-else-if="item.type === 'link'">
                <a :href="item.url(row_item)" :class="item.classes(row_item)" v-html="render(item, key, row_item)"></a>
            </span>
            <span v-else-if="item.type === 'delete'">
                <a href="" :class="item.classes(row_item)" v-html="render(item, key, row_item)" @click.prevent="deleteItem(item, key, row_item)"></a>
            </span>
            <span v-else-if="item.type === 'select'">
                <select :class="item.classes(row_item)" @change="selectChanged" :item="row_key" :col="key">
                    <option v-for="option in item.options" :value="option" :selected="option == row_item.payout_status">{{ option }}</option>
                </select>
            </span>
            <span v-else v-html="render(item, key, row_item)"></span>
        </td>
    </tr>
    </tbody>
</template>

<script>
    export default {
        props: ['columns', 'data'],
        name: "smart-table-body",
        methods: {
            render(item, key, data) {
                if (item.render) {
                    return item.render( item.getter ? item.getter(data) : data[key])
                }
                return item.getter ? item.getter(data) : data[key]
            },
            buttonClicked(item, key, data) {
                if (item.click) {
                    item.click(item, key, data)
                }
            },
            deleteItem(item, key, data) {
                this.$emit('delete', { ...data });
            },
            selectChanged(e) {
                let key = e.target.getAttribute('col');
                let col = this.columns[key];
                let item = this.data[ e.target.getAttribute('item') ];
                if (col.changed) {
                    col.changed(col, key, item, e.target.value);
                }
            }
        }
    }
</script>

<style scoped>

</style>