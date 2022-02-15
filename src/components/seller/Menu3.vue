<template>
    <div>
        <h3>주문관리</h3>

        <div v-if="state.items">
            <table border="1">
                <tr>
                    <th>주문번호</th>
                    <th>주문코드</th>
                    <th>주문개수</th>
                    <th>주문자</th>
                    <th>주문일자</th>
                </tr>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp._id}}</td>
                    <td>{{tmp.itemcode}}</td>
                    <td>{{tmp.ordercnt}}</td>
                    <td>{{tmp.orderid}}</td>
                    <td>{{tmp.orderdata}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {onMounted, reactive} from 'vue';

export default {
    setup () {
        const state = reactive({
            token: sessionStorage.getItem("TOKEN")
        });

        // 외부에서 사용하지 않음 return에 추가하지 않음
        const handleLoadData = async()=> {
            const url = `/seller/orderlist`;
            const headers = {
                "Content-type":"application/json",
                "token": state.token
            };
            const response = await axios.get(url, {headers});

            console.log('seller/Menu3.vue/handleLoadData', response.data);
            if (response.data.status === 200) {
                state.items = response.data.result;
            }
        }

        onMounted( ()=> {
            handleLoadData();
        })

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>