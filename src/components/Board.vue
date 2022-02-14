<template>
    <div>
        <h3>Board.vue</h3>

        <!-- <router-link to="/boardwrite">글쓰기</router-link> -->
        <el-button type="primary" @click="handleWriteAction">글쓰기</el-button>
        <!-- {{state.items.result}} -->
        
        <el-table :data="state.items.result" border fit style="width: 100%" @row-click="handleColumn">
            <el-table-column prop="_id" label="번호" width="50"/>
            <el-table-column prop="title" label="제목" width="180" />
            <el-table-column prop="writer" label="작성자" width="180" />
            <el-table-column prop="hit" label="조회수" width="80" />
            <el-table-column prop="regdate" label="작성일" width="200" />
        </el-table>

        <!-- <table border="1px">
            <tr v-for="tmp in state.items.result" :key="tmp">
                <td @click="handleBoardContent(tmp._id)">{{ tmp._id }}</td>
                <td>{{ tmp.title }}</td>
                <td>{{ tmp.writer }}</td>
                <td>{{ tmp.hit }}</td>
                <td>{{ tmp.regdate }}</td>
            </tr>
        </table> -->
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

        const handleWriteAction = async()=> {
            router.push({name:"BoardWrite"})
        };

        const handleColumn = (no)=> {
            console.log(no._id);
            router.push({name:"BoardContent", query:{no:no._id}});
        }

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

        return {state, handleBoardContent, handleColumn, handleWriteAction}
    },

    // mounted(){}
}
</script>

<style lang="css">
    .ck-editor__editable {
        min-height: 500px;
    }
</style>