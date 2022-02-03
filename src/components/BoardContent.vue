<template>
    <div>
        <h3>BoardContent.vue</h3>

        <div v-if="state.item">
            제목: {{state.item.title}} <br />
            내용: {{state.item.content}} <br />
            작성자: {{state.item.writer}} <br />
            이미지: <img :src="state.item.imageurl" style="width:200px" /> <br />
            <hr />

            <button @click="handleDelete">삭제</button>
            <button>수정</button>
            <button v-if="state.item.prev > 0" @click="handleData(1)">이전글</button>
            <button v-if="state.item.next > 0" @click="handleData(2)">다음글</button>
            <hr />

            <div>
                <tr v-for="tmp in state.reply" :key="tmp">
                    <td>{{tmp._id}}</td>
                    <td>{{tmp.content}}</td>
                    <td>{{tmp.writer}}</td>
                    <td>{{tmp.regdate}}</td>
                </tr>
            </div>
            <textarea rows="6" placeholder="댓글내용" ></textarea> <br />
            <input type="text" placeholder="댓글작성자" /> <br />
            <button>댓글 저장</button>

        </div>
        
    </div>
</template>

<script>

import axios from 'axios';  //백엔드 연동
import { useRoute } from 'vue-router';  // 페이지 이동 후 route.query
import { useRouter } from 'vue-router';  // 페이지 이동시킴
import { reactive, onMounted } from 'vue';   //state변수


export default {
    setup () {
        const route = useRoute();   //이동 후 받기
        const router = useRouter(); //이동하기

        // state 변수 생성
        const state = reactive({
            no: route.query.no
        });

        const handleDelete = async() => {
            if (confirm('삭제할까요?')) {
                const url = `/board/delete?no=${state.no}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.delete(url, {headers:headers, data:{}});

                console.log(response.data);
                if (response.data.status === 200) {
                    router.push({name:"Board", query:{page:1, text:''}})
                }
            }
        };

        const handleMount = async(no) => {

            const url = `/board/selectone?no=${no}`
            const headers = {"Content-Type":"application/json"};

            const response = await axios.get(url, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                console.log(response.data.result);
                state.item = response.data.result;
            }
        };

        const handleReplyMount = async(no) => {

            const url = `/board/selectreply?no=${no}`;
            const headers = {"Content-Type":"application/json"};

            const response = await axios.get(url, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                state.reply = response.data.result;
            }
            
        }

        onMounted( async() => {
            await handleMount(state.no);
            await handleReplyMount(state.no);
        });

        const handleData = async(idx) => {
            if (idx === 1) {    // 이전글
                router.push({name:"BoardContent", query:{no:state.item.prev}});
                state.no = state.item.prev;
                await handleMount(state.no);
            }
            else if (idx === 2) {   // 다음글
                router.push({name:"BoardContent", query:{no:state.item.next}});
                state.no = state.item.next;
                await handleMount(state.no);
            }
        };

        return {state, handleDelete, handleData }
    },

}

</script>

<style lang="scss" scoped>

</style>