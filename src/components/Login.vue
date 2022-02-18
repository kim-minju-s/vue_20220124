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
            userid: 'asd@b.com',
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
            console.log('response.data---->', response.data);
            if (response.data.status === 200) {
                // 저장소에 보관하기 (공통변수)
                sessionStorage.setItem("TOKEN", response.data.token);
                alert('로그인 되었습니다.');

                // actios 를 호출하여 store/state 변수를 변경함
                store.dispatch("handleData", {});
                // // store/index.js state를 변경하는 곳
                // // 이메일, 이름정보, 권한, 로그인 (공통변수)
                // store.commit("setUid", response.data.uid);
                // store.commit("setUname",response.data.uname);
                // store.commit("setUrole",response.data.urole);
                // store.commit("setLogged", true); // 3. 로그인 상태


                const curl = sessionStorage.getItem("CURL");
                if (curl === null) {
                    // 1. 주소창만 바뀜
                    router.push({name:'Home'});

                    // App.vue에 메뉴의 선택항목을 변경하도록 알려줌
                    // 2. 메뉴 활성화
                    store.commit("setMenu","/");
                }
                else {  // 이동하고자 하는 페이지가 존재하면
                    const query = JSON.parse(sessionStorage.getItem("CURL_QUERY"));
                    const params = JSON.parse(sessionStorage.getItem("CURL_PARAMS"));

                    router.push({name:curl, query:query, params:params});
                }

                
            }
        };

        return {state, handleLogin}
    }
}
</script>

<style lang="scss" scoped>

</style>