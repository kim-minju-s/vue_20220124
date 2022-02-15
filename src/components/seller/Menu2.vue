<template>
    <div>
        <h3>회원관리</h3>

        <div v-if="state.items">
            <table border="1">
                <tr>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>등록일</th>
                </tr>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp._id}}</td>
                    <td>{{tmp.name}}</td>
                    <td>{{tmp.regdate}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';

export default {
    setup () {
        const state = reactive({
            token: sessionStorage.getItem("TOKEN")
        });

        const handleLoadData = async()=> {
            const url = `/seller/memberlist`;
            const headers = {
                "Content-Type":"application/json",
                "token": state.token
            };
            const response = await axios.get(url, {headers});

            console.log('response.data--->', response.data.result);

            if (response.data.status === 200) {
                state.items = response.data.result;
            }
        };

        onMounted( ()=> {
            handleLoadData();
        });

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>