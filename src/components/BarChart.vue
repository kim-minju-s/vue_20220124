<template>
    <div>
        <h3>BarChart.vue</h3>
        <div style="max-width: 600px">
            <vue3-chart-js v-bind="{ ...state }" ref="chartRef" />
            <button @click="updateChart">Update Chart</button>
        </div>
        
    </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import { ref } from 'vue';

export default {
    name: "App",
    components: {
        Vue3ChartJs,
    },
    setup () {
        const state = {
            type: "bar",
            options: { min: 0, max: 100, responsive: true, plugins: {
                legend: {position: "top", },
                },
                scales: {
                    y: {
                        min: -100,
                        max: 100,
                        ticks: {
                        callback: function (value) {
                            return `${value}%`;
                        },
                        },
                    },
                },
            },
            data: {
                labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
                datasets: [
                {
                    label: "My First Dataset",
                    backgroundColor: ["#1abc9c", "#f1c40f", "#2980b9", "#34495e"],
                    data: [40, 20, 50, 10],
                },
                {
                    label: "My Second Dataset",
                    backgroundColor: ["#2ecc71", "#e67e22", "#9b59b6", "#bdc3c7"],
                    data: [-40, -20, -10, -10],
                },
                ],
            },
        }
        const chartRef = ref(null);

        const updateChart = () => {
            state.data.labels = ['Cats', 'Dogs', 'Hamsters', 'Dragons']
            state.data.datasets = [
                {
                    label: "My First Dataset",
                    backgroundColor: ["#1abc9c", "#f1c40f", "#2980b9", "#34495e"],
                    data: [54, 24, 43, 98],
                },
                {
                    label: "My Second Dataset",
                    backgroundColor: ["#2ecc71", "#e67e22", "#9b59b6", "#bdc3c7"],
                    data: [-24, -14, -37, -79],
                },
            ]

            // 컴포넌트에 변화되었음을 알려줌
            chartRef.value.update(250);
        }

        return {state, chartRef, updateChart}
    }
}
</script>

<style lang="scss" scoped>

</style>