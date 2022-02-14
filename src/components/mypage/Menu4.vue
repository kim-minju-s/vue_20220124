<template>
    <div>
        <h3>주문 내역</h3>

        <button @click="handleOrderDeleteAction">주문취소</button>
        <div v-if="state.items">
            <table border="1">
                <tr>
                    <th>체크</th>
                   <th>주문번호</th> 
                   <th>물품이름</th> 
                   <th>물품가격</th> 
                   <th>주문수량</th> 
                   <th>주문일자</th> 
                   <th>합계</th> 
                </tr>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td><input type="checkbox" :value="tmp._id" v-model="state.chk" /></td>
                    <td>{{tmp._id}}</td>
                    <td>{{tmp.itemname}}</td>
                    <td>{{tmp.itemprice}}</td>
                    <td>{{tmp.ordercnt}}</td>
                    <td>{{tmp.orderdata}}</td>
                    <td>{{tmp.total}}</td>
                </tr>
                <tr>
                   <th colspan="6">합계</th>
                   <td>{{state.rowtotal}}</td>
                </tr>
                
            </table>
            
            {{state.chk}}
        </div>
        
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';

export default {
    setup () {

        const state = reactive({
            token: sessionStorage.getItem("TOKEN"),
            rowtotal: 0,
            chk: []
        });

        const handleOrderDeleteAction = async()=> {
            if (state.chk.length === 0) {
                alert('항목을 선택하세요.');
                return false;
            }

            if (confirm('주문 취소 할까요?')) {
                const url = `/shop/orderdelete`;
                const headers = {
                    "Content-Type":"application/json",
                    "token": state.token
                }

                // data: { chk: [1, 2, 3, 4]}
                // req.body.chk => [1, 2, 3, 4]
                const response = await axios.delete(url, {headers:headers, data: {chk: state.chk} });
                console.log(response.data);

                if (response.data.status === 200) {
                    alert('주문 취소 되었습니다.');
                    state.chk = [];
                    handleLoadData();
                }
            }

        };

        const handleLoadData = async()=> {
            const url = `/shop/orderlist`;
            const headers = {
                "Content-Type":"application/json",
                "token": state.token
            };
            const response = await axios.get(url, {headers});
            console.log(response.data);

            if (response.data.status === 200) {
                state.items = response.data.result;

                for(let i=0;i<state.items.length;i++){
                    state.items[i]['total'] = Number(state.items[i]['itemprice'])
                        *Number(state.items[i].ordercnt);

                    state.rowtotal += Number(state.items[i].total);
                }

            }
        };

        onMounted( async()=> {
            await handleLoadData();
        })

        return {state, handleOrderDeleteAction}
    }
}
</script>

<style lang="scss" scoped>

</style>