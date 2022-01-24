<template>
    <div>
        <h3>Board.vue</h3>
        <table>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>조회수</th>
            </tr>
            <tr v-for="tmp in state.items.result" :key="tmp">
                <td>{{tmp.no}}</td>
                <td>{{tmp.title}}</td>
                <td>{{tmp.writer}}</td>
                <td>{{tmp.hit}}</td>
            </tr>
            
        </table>
    </div>
</template>

<script>
import {onMounted, reactive} from 'vue';

export default {
    setup () {
        const state = reactive({
            items: {},
        });

        // 생명주기 onMounted()
        onMounted(()=>{
            // 백엔드에서 데이터를 받음
            state.items.result = [
                {no:1, title:'가1', writer:'b', hit:14},
                {no:2, title:'가2', writer:'a', hit:14},
                {no:3, title:'가3', writer:'c', hit:14},
            ];
        });    

        return {state}
    },

    // mounted(){}
}
</script>

<style lang="scss" scoped>

</style>