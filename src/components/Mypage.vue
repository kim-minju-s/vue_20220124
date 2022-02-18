<template>
    <div>
        <h3>Mypage</h3>

        <el-tabs v-model="activeName" type="border-card" class="demo-tabs" @tab-click="handleClick" >

            <el-tab-pane label="정보수정" name="1">
                <menu-1></menu-1>
            </el-tab-pane>

            <el-tab-pane label="암호변경" name="2">
                <menu-2></menu-2>
            </el-tab-pane>

            <el-tab-pane label="회원탈퇴" name="3">
                <menu-3></menu-3>
            </el-tab-pane>

            <el-tab-pane label="주문내역" name="4">
                <menu-4></menu-4>
            </el-tab-pane>

            <el-tab-pane label="주소관리" name="5">
                <menu-5></menu-5>
            </el-tab-pane>
        </el-tabs>

        <button @click="handleMenu(1)">정보수정</button>
        <button @click="handleMenu(2)">암호변경</button>
        <button @click="handleMenu(3)">회원탈퇴</button>
        <button @click="handleMenu(4)">주문내역</button>
        <button @click="handleMenu(5)">주소관리</button>
        <hr />

        {{ state }}
        <menu-1 v-if="state.menu === 1"></menu-1>
        <menu-2 v-if="state.menu === 2"></menu-2>
        <menu-3 v-if="state.menu === 3"></menu-3>
        <menu-4 v-if="state.menu === 4"></menu-4>
        <menu-5 v-if="state.menu === 5"></menu-5>

    </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue';

import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import Menu1 from './mypage/Menu1.vue';
import Menu2 from './mypage/Menu2.vue';
import Menu3 from './mypage/Menu3.vue';
import Menu4 from './mypage/Menu4.vue';
import Menu5 from './mypage/Menu5.vue';

export default {
    components:{
        Menu1, Menu2, Menu3, Menu4,
        Menu5
    },
    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            menu: Number(route.query.menu),
        });

        const activeName = ref('1')

        onMounted(()=> {
            console.log(route.query.menu);
            if (typeof route.query.menu === 'undefined') {
                state.menu = 1;

            }
        })
        
        const handleMenu = (idx) => {
            console.log('sadfasdf');
            router.push({name:'Mypage', query:{menu:idx}});
            state.menu = idx;
        }

        const handleClick = (idx, event)=> {
            console.log('tab 클릭시--->', idx);
            console.log('event---->', event);
            // router.push({name:"Mypage", query:{menu:idx}});
        }

        return {state, handleMenu, handleClick, activeName}
    }
}
</script>

<style lang="scss" scoped>

</style>