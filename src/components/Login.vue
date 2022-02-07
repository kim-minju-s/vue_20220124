<template>
    <div>
        <h3>Login.vue</h3>
        <el-form :inline="true" :model="state" class="demo-form-inline">
            <el-form-item label="아이디">
                <el-input placeholder="아이디 입력" v-model="state.userid"></el-input>
            </el-form-item>

            <el-form-item label="비밀번호">
                <el-input placeholder="비밀번호 입력" v-model="state.userpw"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="handleLogin">로그인</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

export default {
    setup () { // this 사용 불가
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            userid: 'asb@b.com',
            userpw: '1234'
        });

        const handleLogin = async() => {
            const url = `/member/select`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                email: state.userid,
                password: state.userpw
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                sessionStorage.setItem("TOKEN", response.data.token);
                alert('로그인 되었습니다.');

                // 주소창만 바뀜
                router.push({name:'Home'});

                // App.vue에 메뉴의 선택항목을 변경하도록 알려줌
                store.commit("setMenu","/");
                store.commit("setLogged",true);
            }
        };

        return {state, handleLogin}
    }
}
</script>

<style lang="scss" scoped>

</style>