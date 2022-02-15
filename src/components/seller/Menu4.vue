<template>
    <div>
        <h3>상품별 주문수량</h3>
        <div style="max-width:300px;height:200px;
            display: flex;flex-direction:column;">
            <vue3-chart-js
                :id="state.id"
                :type="state.type"
                ref="chartRef"
                :data="state.data">
            </vue3-chart-js>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
import axios from 'axios';

export default {
    components:{
        Vue3ChartJs
    },
    setup () {
        const chartRef = ref(null);

        const state = reactive({
            id: 'doughnut',
            type: 'doughnut',
            data: {
                labels : [],
                datasets : [
                    { 
                        backgroundColor: [],
                        data: []
                    }
                ],
            },
            token: sessionStorage.getItem("TOKEN")
        });

        // 현재 로그인한 판매자를 조건으로 물품별 주문수량
        const handleLoadData = async()=> {
            const url = `/seller/groupitem`;
            const headers = {
                "Content-Type":"application/json",
                "token": state.token
            };
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                // [{_id:111, count:2}, {_id:222, count:3},]

                let label = [];
                let background = [];
                let data = [];

                for(let tmp of response.data.result){
                    label.push(tmp._id);
                    background.push('#41B883', '#E46651', '#00D8FF');
                    data.push(tmp.count);
                }

                state.data.labels = label;
                state.data.datasets[0]['backgroundColor'] = background;
                state.data.datasets[0]['data'] = data;

                chartRef.value.update(250); // 업데이트 필수
            }
        }

        onMounted( ()=> {
            handleLoadData();
        });

        return {state, chartRef}
    }
}
</script>

<style lang="scss" scoped>

</style>