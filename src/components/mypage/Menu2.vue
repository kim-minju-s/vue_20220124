<template>
    <div>
        <h3>Menu2: 암호변경</h3>
        <input type="password" v-model="state.pw" placeholder="현재 암호"/>
        <input type="password" v-model="state.pw1" placeholder="변경할 암호"/>
        <input type="password" v-model="state.pw2" placeholder="변경할 암호 확인"/>
        <button @click="handleUpdateAction">변경하기</button>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup () {
        const store = useStore();

        const router = useRouter();

        const state = reactive({
            pw:'',
            pw1:'',
            pw2:'',
            token: sessionStorage.getItem("TOKEN")
        });

        const handleUpdateAction = async() => {
            if (state.token !== null) {
                const url = `/member/updatepw`;
                const headers = {
                    "Content-Type":"application/json",
                    "token": state.token
                };
                const body = {
                    password: state.pw,
                    password1: state.pw1
                };
                const response = await axios.put(url, body, {headers});
                console.log(response.data);
                if (response.data.status === 200) {
                    alert('암호 변경 완료');
                }
            }
            else{
                // URL을 홈으로 변경
                router.push({name:'Home'});

                // 메뉴 선택을 /
                store.commit("setMenu","/");

                // 로그인 상태를 false
                store.commit("setLogged", false);
            }
        }
        

        return {state, handleUpdateAction}
    }
}
</script>

<style lang="scss" scoped>

</style>