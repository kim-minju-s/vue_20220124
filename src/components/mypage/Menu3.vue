<template>
    <div>
        <h3>Menu3: 회원탈퇴</h3>
        <input type="password" v-model="state.pw" placeholder="암호 확인" />
        <button @click="handleDeleteAction">회원탈퇴</button>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup () {
        const store = useStore();

        const router = useRoute();

        const state = reactive({
            pw: '',
            token: sessionStorage.getItem("TOKEN")
        });

        const handleDeleteAction = async() => {
            if (confirm('정말 탈퇴할까요?')) {
                const url = `/member/delete`;
                const headers = {
                    "Content-Type":"application/json",
                    "token":state.token
                };
                const body = {
                    password: state.pw
                };
                const response = await axios.delete(url, {headers:headers, data:body});
                console.log(response.data);

                if (response.data.status === 200) {
                    sessionStorage.removeItem("TOKEN");
                    alert('탈퇴 되었습니다.');
                    
                    // URL을 홈으로 변경
                    router.push({name:'Home'});
                    
                    // 메뉴 선택을 /
                    store.commit("setMenu","/");

                    // 로그인 상태를 false
                    store.commit("setLogged", false);
                }
            }
        };

        return {state, handleDeleteAction}
    }
}
</script>

<style lang="scss" scoped>

</style>