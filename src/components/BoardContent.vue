<template>
    <div>
        <h3>BoardContent.vue</h3>
    </div>
</template>

<script>
import { reactive } from 'vue';

//query 받기
import { useRoute } from 'vue-router';

export default {
    setup () {
        const route = useRoute();

        const state = reactive({
            no: route.query.no
        })

        return {state}
    }
}

</script>

<style lang="scss" scoped>

</style>