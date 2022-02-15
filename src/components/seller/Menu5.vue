<template>
    <div>
        <h3>시간대별 주문수량(차트)</h3>
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

        const handleLoadData = async()=> {
            const url = `/seller/grouphour`;
            const headers = {
                "Content-Type":"application/json",
                "token":state.token
            };
            const response = await axios.get(url, {headers});
            console.log(response.data.result);
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