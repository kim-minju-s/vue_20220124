<template>
    <div>
        <h3>Board.vue</h3>

        <router-link to="/boardwrite">글쓰기</router-link>

        <!-- <el-table v-for="tmp in state.items.result" :key="tmp" style="width: 100%">
            <el-table-column :prop="tmp._id" label="번호" width="180" />
            <el-table-column :prop="tmp.title" label="제목" width="180" />
            <el-table-column :prop="tmp.writer" label="작성자" width="180" />
            <el-table-column :prop="tmp.hit" label="조회수" width="180" />
            <el-table-column :prop="tmp.regdate" label="작성일" />
        </el-table> -->

        <table border="1px">
            
            <tr v-for="tmp in state.items.result" :key="tmp">
                <td @click="handleBoardContent(tmp._id)">{{ tmp._id }}</td>
                <td>{{ tmp.title }}</td>
                <td>{{ tmp.writer }}</td>
                <td>{{ tmp.hit }}</td>
                <td>{{ tmp.regdate }}</td>
            </tr>
            
        </table>
    </div>
</template>

<script>
import {onMounted, reactive} from 'vue';

import {useRouter} from 'vue-router';

import axios from 'axios';

export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            items: {},
            page: 1,
            text: ''
        });

        // 생명주기 onMounted()
        onMounted( async()=>{
            const url = `/board/select?page=${state.page}&text=${state.text}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);

            if(response.data.status === 200){
                state.items.result = response.data.rows;
            }

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