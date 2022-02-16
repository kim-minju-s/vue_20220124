<template>
    <div>
        <h3>시간대별 주문수량(차트)</h3>
        <div style="max-width:300px;height:200px;
            display: flex;flex-direction:column;">
            <vue3-chart-js
                v-bind="state"
                ref="chartRef">
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
        // 차트를 업데이트 하기 위해 연결
        const chartRef = ref(null);

        const state = reactive({
            
            type: 'bar',
            data: {
                labels : [],
                datasets : [
                    {
                        label: '시간대별 주문수량',
                        backgroundColor: [],
                        data: []
                    }
                ],
            },
            token: sessionStorage.getItem("TOKEN")
        });

        // 
        const handleLoadData = async()=> {
            const url = `/seller/grouphour`;
            const headers = {
                "Content-Type":"application/json",
                "token":state.token
            };
            const response = await axios.get(url, {headers});
            console.log(response.data.result);

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
        })

        return {state, chartRef }
    }
}
</script>

<style lang="scss" scoped>

</style>