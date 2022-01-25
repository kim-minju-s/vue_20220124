<template>
    <div class="style1">
        <h3>src/components/Join.vue</h3>
        {{ userid }}
        <input type="text" ref="userid" v-model="state.userid" />
        <input type="password" ref="userpw" v-model="state.userpw" />
        <input type="password" ref="userpw1" v-model="state.userpw1" />

        {{username}}
        <input type="text" ref="username" v-model="state.username" />

        <button @click="handleJoin">회원가입</button>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import axios from 'axios'

export default {
    setup () {
        
        // High레벨 변수 생성: 오브젝트만 변화감지
        const state = reactive({
            userid: 'aaa',
            userpw: '',
            userpw1: '',
            username: ''
        });

        // Low레벨 변수 생성: 오브젝트가 아님
        const userid = ref(null); //위에서 연결하면 bbb값은 의미가 없어짐
        const userpw = ref(null);
        const userpw1 = ref(null);
        const username = ref(null);

        // function handleJoin(){}
        const handleJoin = async() => {
            if(state.userid === ''){
                alert('아이디를 입력하세요.');
                userid.value.focus(); // 포커싱하기

                return false;
            } //이 위치에서 메소드 종료(else if 사용X)
            if(state.userpw === ''){
                alert('비밀번호를 입력하세요.');
                userpw.value.focus();
                return false;
            }
            if(state.userpw1 === ''){
                alert('비밀번호1을 입력하세요.');
                userpw1.value.focus();
                return false;
            }
            if(state.username === ''){
                alert('이름을 입력하세요.');
                username.value.focus();
                return false;
            }// 유효성 검증 완료되는 시점에 백엔드 연동

            const url = "http://ihongss.com/json/exam13.json";
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);

        }


        return {state, userid, userpw, userpw1, username, handleJoin}
    }
}
</script>

<!-- scss, less => css -->
<!-- npm install -D sass-loader@^10 sass -->
<style lang="scss" scoped>
    .style1 {
        border: 1px solid #cccccc;
        padding: 20px;
    }
</style>