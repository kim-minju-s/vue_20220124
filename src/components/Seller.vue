<template>
    <div>
        <h3>판매자 페이지</h3>
        <hr />
        <button @click="handleMenu(1)">물품관리</button>
        <button @click="handleMenu(2)">회원관리</button>
        <button @click="handleMenu(3)">주문관리</button>

        <menu-1 v-if="state.menu === 1"></menu-1>
        <menu-2 v-if="state.menu === 2"></menu-2>
        <menu-3 v-if="state.menu === 3"></menu-3>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import Menu1 from './seller/Menu1.vue';
import Menu2 from './seller/Menu2.vue';
import Menu3 from './seller/Menu3.vue';

export default {
    components:{
        Menu1, Menu2, Menu3
    },
    setup () {
        const state = reactive({
            menu: 1
        });

        const handleMenu = (idx) => {
            state.menu = idx;
        }

        return {state, handleMenu }
    }
}
</script>

<style lang="scss" scoped>

</style>