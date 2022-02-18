<template>
    <div class="style1">
        <h3>src/components/Join.vue</h3>

        {{state.userrole}}
        <el-form
            label-width="100px"
            :model="state"
            style="max-width: 460px">

            <el-form-item label="이메일">
                <el-input v-model="state.userid" @keyup="handleEmailCheck" ></el-input>
            </el-form-item>

            <el-form-item label="암호">
                <el-input v-model="state.userpw"></el-input>
            </el-form-item>

            <el-form-item label="암호 확인">
                <el-input v-model="state.userpw1"></el-input>
            </el-form-item>

            <el-form-item label="이름">
                <el-input v-model="state.username"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleJoin">회원가입</el-button>
            </el-form-item>
        </el-form>

        권한 :
        <select v-model="state.userrole">
            <option value="CUSTOMER">고객</option>
            <option value="SELLER">판매자</option>
        </select> <br />

    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router';

export default {
    setup () {
        const router = useRouter();
        
        // High레벨 변수 생성: 오브젝트만 변화감지
        const state = reactive({
            userid: 'aaa',
            userpw: '',
            userpw1: '',
            username: '',
            useremailcheck: '중복확인',
            userrole : 'CUSTOMER'
        });

        // Low레벨 변수 생성: 오브젝트가 아님
        const userid = ref(null); //위에서 연결하면 bbb값은 의미가 없어짐
        const userpw = ref(null);
        const userpw1 = ref(null);
        const username = ref(null);

        // 정확한 이메일 주소인지 확인
        const validEmail = (email) => {
            // 정규표현식
            var re = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]*$/i;
            return re.test(email);
        }

        // 이메일 중복확인
        const handleEmailCheck = async() => {
            if (validEmail(state.userid)) {
                console.log(state.userid);
                const url = `/member/emailcheck?email=${state.userid}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers});
                console.log(response.data);
                if (response.data.status === 200) {
                    if (response.data.result === 1) {
                    state.useremailcheck = '사용불가';
                    }
                    else {
                        state.useremailcheck = '사용가능';
                    }
                }
            }
            else{
                state.useremailcheck = '사용가능';
            }
        }

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
            if(state.userpw !== state.userpw1){
                alert('비밀번호를 확인하세요.');
                userpw1.value.focus();
                return false;
            }
            if(state.username === ''){
                alert('이름을 입력하세요.');
                username.value.focus();
                return false;
            }// 유효성 검증 완료되는 시점에 백엔드 연동

            if (state.useremailcheck !== '사용가능') {
                alert('이메일 중복체크하세요');
            }

            // 유효성 검증 완료되는 시점에서 백엔드 연동
            const url = "/member/insert";
            const headers = {"Content-Type":"application/json"};
            const body = {
                email: state.userid,
                password: state.userpw,
                name: state.username,
                role: state.userrole
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                alert('회원가입 되었습니다.');
                router.push({name:'Home'});
            }
        }

        return {
            state,
            userid,
            userpw,
            userpw1,
            username,
            handleJoin,
            handleEmailCheck
        }
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