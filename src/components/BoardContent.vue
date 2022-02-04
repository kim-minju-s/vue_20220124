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
            <button @click="handleUpdate">수정</button>
            <button v-if="state.item.prev > 0" @click="handleData(1)">이전글</button>
            <button v-if="state.item.next > 0" @click="handleData(2)">다음글</button>
            <hr />

            <div v-for="tmp in state.reply" :key="tmp">
                {{tmp._id}}
                {{tmp.content}}
                {{tmp.writer}}
                {{tmp.regdate}}
                <button @click="handleReplyDelete(tmp._id)">댓글 삭제</button>
            </div>
            {{state.reply1}} <br />
            <textarea rows="6" placeholder="댓글내용" v-model="state.reply1.content"></textarea> <br />
            <input type="text" placeholder="댓글작성자" v-model="state.reply1.writer"/> <br />
            <button @click="handleInsertReply">댓글 저장</button>

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
            no  : route.query.no,
            reply: {},
            reply1 : {
                content : '',
                writer  : ''
            }
        });

        const handleReplyDelete = async(no) => {
            const url = `/board/deletereply?no=${no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.delete(url, {headers:headers, data:{}});

            console.log(response.data);
            if (response.data.status === 200) {
                await handleReplyMount(state.no);
            }
        };

        const handleInsertReply = async() => {
            const url = `/board/insertreply`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                boardno: state.no,
                content: state.reply1.content,
                writer: state.reply1.writer,
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);

            if (response.data.status === 200) {
                alert('댓글 등록 완료');
                await handleReplyMount(state.no);
            }

        };


        // 수정할 수 있는 화면으로 전환
        const handleUpdate = () => {
            router.push({name:"BoardUpdate", query:{no: state.no}});
        }

        const handleDelete = async() => {
            if (confirm('삭제할까요?')) {
                const url = `/board/delete?no=${state.no}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.delete(url, {headers:headers, data:{}});

                console.log(response.data);
                if (response.data.status === 200) {
                    router.push({name:"Board", query:{page:1, text:''}});
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

        //댓글
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

        // 이전글, 다음글 버튼
        const handleData = async(idx) => {
            if (idx === 1) {    // 이전글
                // 주소창 변경
                // 게시판 상세화면 -> 게시판 상세화면 onMounted()
                router.push({name:"BoardContent", query:{no: state.item.prev}});
                state.no = state.item.prev;
                await handleMount(state.no);
                await handleReplyMount(state.no);
            }
            else if (idx === 2) {   // 다음글
                router.push({name:"BoardContent", query:{no: state.item.next}});
                state.no = state.item.next;
                await handleMount(state.no);
                await handleReplyMount(state.no);
            }
        };

        return {
            state,
            handleDelete,
            handleData,
            handleUpdate,
            handleInsertReply,
            handleReplyDelete
        }
    },

}

</script>

<style lang="scss" scoped>

</style>