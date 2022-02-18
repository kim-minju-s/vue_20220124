<template>
    <div>
        <h3>주소관리</h3>

        <h5>주소 추가하기</h5>
        주소: <input type="text" v-model="state.address" /> <br />
        대표주소로 등록: <input type="checkbox" v-model="state.chk" @change="handleCheck"/> <br />
        <button @click="handleInsertaddr">주소등록</button> <br />

        <h5>주소 조회하기</h5>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from '@vue/reactivity'

export default {
    setup () {
        const state = reactive({
            address: '',
            chk:0,
            token: sessionStorage.getItem("TOKEN"),
        });

        const handleCheck = ()=> {
            console.log('체크박스 클릭 값----->',state.chk);
            
        }

        const handleInsertaddr = async()=> {
            const url = `/member/insertaddr`;
            const headers = {
                "Content-Type":"application/json",
                "token": state.token
            };
            const body = {
                address: state.address
            };
            const response = await axios.post(url, body, {headers});
            console.log('주소등록------>',response);
            if (response.data.status === 200) {
                //
            }
        }

        return {
            state, 
            handleInsertaddr, 
            handleCheck
        }
    }
}
</script>

<style lang="scss" scoped>

</style>