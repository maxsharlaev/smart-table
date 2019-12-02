<template>
    <div class="row" >
        <div class="col-md-6 col-sm-12 pt-2 pb-2 input-group">
            <label class="label-title">Time period:</label>
            <select class="form-control date-range ml-2" v-model="frame.dateby" @change="reFrame">
                <option value="all" :selected="ifDate('all')">All time</option>
                <option v-if="date_options.specific_date" value="specific" :selected="ifDate('specific')">Specific date</option>
                <option v-if="date_options.period" value="period" :selected="ifDate('period')">Period</option>
                <option v-for="(period, key) in settings.dates" :value="key" :select="ifDate(key)">{{ period }}</option>
            </select>
        </div>
        <div v-if="frame.dateby === 'specific' || frame.dateby === 'period'" class="col-md-6 col-sm-12">
            <div v-if="frame.dateby === 'specific'" class="specific-date input-group pt-2 pb-2 ">
                <label class="label-title mr-2">Select date:</label>
                <input type="date" class="form-control" v-model="frame.dates[0]" @change="reFrame">
            </div>
            <div v-if="frame.dateby === 'period'" class="speriod-date input-group pt-2 pb-2 ">
                <label class="label-title mr-2">From:</label>
                <input type="date" v-model="frame.dates[0]" class="form-control mr-2" @change="reFrame">
                <label class="label-title mr-2">To:</label>
                <input type="date" v-model="frame.dates[1]" class="form-control" @change="reFrame">
            </div>
        </div>
        <div :class="[frame.dateby === 'specific' || frame.dateby === 'period' ? 'col-md-12' : 'col-md-6',  'col-sm-12', 'pt-2', 'pb-2', 'input-group']">
            <label class="label-title">Search:</label>
            <input class="form-control ml-2" v-model="frame.search" >
            <button v-if="searched === false" @click="reFrameSearch" class="btn btn-info text-white"><i class="fa fa-search"></i></button>
            <button v-if="searched === true" @click="reFrameReset" class="btn btn-warning"><i class="fa fa-times"></i></button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['dates', 'date_options', 'viewframe', 'settings'],
        name: "smart-table-top",
        data() {
            return {
                frame: this.viewframe,
                searched: false,
            }
        },
        watch: {
            viewframe() {
                this.frame = this.viewframe;
            }
        },
        computed: {

        },
        methods: {
            ifDate(key) {
                return this.frame.dateby === key;
            },
            reFrame() {
                this.$emit('reFrame', { ...this.frame })
            },
            reFrameSearch() {
                if (this.frame.search) {
                    this.searched = true;
                    this.reFrame();
                }
            },
            reFrameReset() {
                this.searched = false;
                this.frame.search = '';
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

        }
    }
</script>

<style scoped>
</style>