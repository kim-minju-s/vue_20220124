<template>
    <div>
        <h3>Chart.vue</h3>
        <div style="max-width:300px;height:200px">
            <vue3-chart-js
                :id="state.id"
                :type="state.type"
                ref = "chartRef"
                :data="state.data">
            </vue3-chart-js>

            <button @click="updateChart">Update Chart</button>
        </div>
        
    </div>
</template>

<script>
import { ref } from 'vue';
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';

export default {
    components:{
        Vue3ChartJs
    },

    setup () {
        // object(R) -> reactive(RW) -> ref(RW Deep)
        const state = { // Read
            id: 'doughnut',
            type: 'doughnut',
            data: {
                labels : ['html', 'css', 'script', 'vue3'],
                datasets : [
                    { 
                        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: [40, 20, 80, 10]
                    }
                ],
            }
        }
        //빈 것 만들기
        const chartRef = ref(null);

        const updateChart = () => {
            // 변경 데이터 설정
            state.data.labels = ['Cats', 'Dogs', 'Hamsters', 'Dragons']
            state.data.datasets = [
                { 
                    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                    data: [40, 20, 80, 10]
                }
            ]

            // 컴포넌트에 변화되었음을 알려줌
            chartRef.value.update(250);
        }

        return {state, updateChart, chartRef}
    }
}
</script>

<style lang="scss" scoped>

</style>