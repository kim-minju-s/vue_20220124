<template>
    <div>
        <h3>Login.vue</h3>
        {{ state }}
        <input type="text" v-model="state.userid" />
        <input type="password" v-model="state.userpw" />
        <input type="button" value="로그인" @click="handleLogin" />
    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    setup () { // this 사용 불가
        const state = reactive({
            userid: 'aaa',
            userpw: 'bbb'
        });

        const handleLogin = () => {
            console.log('로그인버튼 클릭됨', state.userid, state.userpw);
        };

        return {state, handleLogin}
    }
}
</script>

<style lang="scss" scoped>

</style>