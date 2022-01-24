<template>
    <div>
        <h3>src/components/admin/Menu3.vue</h3>
        {{ props }}
    </div>
</template>

<script>
export default {
    // 부모 컴포넌트에서 전달되는 값을 보관
    props: {
        title: String,
        count: Number,
    },

    setup (props) {
        console.log(props.title);
        return {props}
    }
}
</script>

<style lang="scss" scoped>

</style>