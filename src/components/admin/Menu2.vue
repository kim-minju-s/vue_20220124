<template>
    <div>
        <h3>src/components/admin/Menu2.vue</h3>
        {{ props }}

        <button @click="handleCount">부모 메서드 호출 후 값 증가</button>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        count: Number,
    },

    setup (props, {emit}) {
        console.log(props.title);
        const handleCount = () => {
            // 부모의 @handleCount="실제 호출 메소드"가 반응
            emit('handleCount', {});
        };
        return {props, handleCount}
    }
}
</script>

<style lang="scss" scoped>

</style>