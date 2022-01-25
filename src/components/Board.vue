<template>
    <div>
        <h3>Board.vue</h3>
        <table border="1px">
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>조회수</th>
            </tr>
            <tr v-for="tmp in state.items.result" :key="tmp">
                <td @click="handleBoardContent(tmp.no)">{{tmp.no}}</td>
                <td>{{tmp.title}}</td>
                <td>{{tmp.writer}}</td>
                <td>{{tmp.hit}}</td>
            </tr>
            
        </table>
    </div>
</template>

<script>
import {onMounted, reactive} from 'vue';

import {useRouter} from 'vue-router';

export default {
    setup () {
        const router = useRouter();

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

        const handleBoardContent = (no) => {
            console.log(no);
            // 127.0.0.1:3000/boardcontent?no=2
            router.push({name:"BoardContent", query:{no:no}});
        }

        return {state, handleBoardContent}
    },

    // mounted(){}
}
</script>

<style lang="css">
    .ck-editor__editable {
        min-height: 500px;
    }
</style>