<template>
    <div style="border:1px; solid:#cccccc;padding:20px">
        <h3>물품관리</h3>
        <hr />

        <button @click="handlePage">일괄추가</button>
        <button @click="handleDeleteBatch">일괄삭제</button>
        <button @click="handleUpdateBatch">일괄수정</button>

        {{state.items}}
        <hr />
        {{state.chk}}

        <table border="1">
            <tr>
                <th>체크</th>
                <th>번호</th>
                <th>이미지</th>
                <th>이름</th>
                <th>내용</th>
                <th>가격</th>
                <th>갯수</th>
                <th>등록일</th>
                <th>버튼</th>
            </tr>
            <tr v-for="(item, idx) in state.items" :key="item">
                <td><input type="checkbox" v-model="state.chk" :value="item._id"></td>
                <td><button @click="handleDetailPage(item._id)">{{item._id}}</button></td>
                <td>
                    <img :src="item.imageUrl" style="width:50px; height:50px" />
                    <input type="file" @change="handleImage($event, idx)">
                </td>
                <td><input type="text" v-model="item.name" style="width:50px" /></td>
                <td><input type="text" v-model="item.content" style="width:50px"/></td>
                <td><input type="text" v-model="item.price" style="width:50px" /></td>
                <td><input type="text" v-model="item.quantity" style="width:50px" /></td>
                <td>{{item.regdate}}</td>
                <td>
                    <button @click="handleDeleteAction([item._id])">삭제</button>
                    <button @click="handleUpdateAction(idx)">수정</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            token: sessionStorage.getItem("TOKEN"),
            chk: []
        });

        const handleDetailPage = (code)=> {
            router.push({name:'Menu1Detail', query:{code:code}});
        }

        const handleDeleteBatch = async()=> {
            await handleDeleteAction(state.chk);
        };

        const handleUpdateBatch = async()=> {
            let arr = [];
            // 전체 갯수
            for(let i=0; i<state.items.length; i++){
                // 체크한 갯수
                for(let j=0; j<state.chk.length; j++){
                    // 전체 내용에서 체크한 번화가 일치하면
                    if (state.items[i]._id === state.chk[j]) {
                        console.log(state.items[i]._id, state.chk[j]);

                        // arr 변수에 일치하는 것만 저장
                        arr.push( state.items[i] );
                    }
                }
            }

            console.log(arr);
            const url = `/seller/update`;
            const headers = {
                "Content-Type":"multipart/form-data",
                "token": state.token
            };

            // o => {code: [], title: []}
            const body = new FormData();
            for(let i=0; i<arr.length; i++){
                body.append( 'image', arr[i].image );   // 배열X
                body.append( 'code', arr[i]._id );
                body.append( 'title', arr[i].name );
                body.append( 'content', arr[i].content );
                body.append( 'price', arr[i].price );
                body.append( 'quantity', arr[i].quantity );
            }

            const response = await axios.put(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                await handleLoadData();
            }
        };

        const handleDeleteAction = async(code) => {
            if (confirm('삭제할까요?')) {
                console.log(code);  // 삭제할 항목을 코드로 지정함
                const url = `/seller/delete`;
                const headers = {
                    "Content-Type":"application/json",
                    "token": state.token    // 토큰을 인증해야 삭제됨.
                };
                // {"code":[1054]}
                const body = { code: code }; // 데이터베이스에서 일괄삭제를 위해 배열을 사용함.
                const response = await axios.delete(url, {headers:headers, data:body});
                console.log(response.data);
                if (response.data.status === 200) {
                    await handleLoadData();
                    state.chk = [];
                }
            }
            
        };

        const handleUpdateAction = async(idx) => {
            console.log(state.items[idx]);
            const url = `/seller/update`;
            const headers = {
                "Content-Type":"multipart/form-data",
                "token": state.token
            };

            // o => {code: [], title: []}
            const body = new FormData();
            body.append( 'image', state.items[idx].image );   // 배열X
            body.append( 'code', state.items[idx]._id );
            body.append( 'title', state.items[idx].name );
            body.append( 'content', state.items[idx].content );
            body.append( 'price', state.items[idx].price );
            body.append( 'quantity', state.items[idx].quantity );

            const response = await axios.put(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                await handleLoadData();
            }
        }

        const handleImage = async(e, idx) => {
            console.log(e);
            console.log(idx);
            if (e.target.files[0]) {
                state.items[idx].image = e.target.files[0];
            }
            else{
                state.items[idx].image = '';
            }
        };
        
        // 화면을 로드함(변수에 담아서 재활용)
        const handleLoadData = async() => { 
            const url = `/seller/selectlist`;
            const headers = {
                "Content-Type":"application/json",
                "token": state.token
            };
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                state.items = response.data.result;
            }
        };

        onMounted( async() => { // 생명주기
            await handleLoadData();
        });

        const handlePage = async() => {
            router.push({name:"Menu1Insert"});
        }

        return {
            state,
            handlePage,
            handleDeleteAction,
            handleImage,
            handleUpdateAction,
            handleDeleteBatch,
            handleUpdateBatch,
            handleDetailPage
        }
    }
}
</script>

<style lang="scss" scoped>

</style>