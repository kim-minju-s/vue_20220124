<template>
    <div>
        <h3>Menu1: 정보수정</h3>
        <input type="text" v-model="state.name" placeholder="변경할 이름" />
        <button @click="handleUpdateAction">정보변경</button>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import { useStore } from 'vuex';


export default {
    setup () {
        const router = useRouter();

        const store = useStore();

        const state = reactive({
            name:'a',
            token: sessionStorage.getItem("TOKEN")
        });

        const handleUpdateAction = async() => {
            if (state.token !== null) {
                const url = `/member/update`;
                const headers = {
                    "Content-Type":"application/json",
                    "token": state.token
                };
                const body = {
                    name: state.name
                }
                const response = await axios.put(url, body, {headers});
                console.log(response.data);

                if (response.data.status === 200) {
                    alert('회원정보 변경 완료');
                    
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
            
        };
        

        return {state, handleUpdateAction}
    }
}
</script>

<style lang="scss" scoped>

</style>