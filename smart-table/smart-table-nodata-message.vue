<template>
    <div >
        {{ message || 'No data found' }}
    </div>
</template>

<script>
    export default {
        props: ['message'],
        name: "smart-table-nodata-message"
    }
</script>

<style scoped>

</style>