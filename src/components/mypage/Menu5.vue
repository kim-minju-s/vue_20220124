<template>
    <div>
        <h3>주소관리</h3>

        <h5>주소 추가하기</h5>
        <input type="text" v-model="state.address" placeholder="주소입력"/> <br />
        <button @click="handleInsertaddr">주소등록</button> <br />
        <hr />

        <h5>주소 조회하기</h5>
        <div v-if="state.items">

            <table border="1">
                <tr>
                    <th>선택</th>
                    <th>주소</th>
                    <th>버튼</th>
                </tr>
                <tr v-for="(item, idx) in state.items" :key="item">
                    <td>{{item.chk}}</td>
                    <td><input type="text" v-model="item.address" /></td>
                    <td>
                        <button @click="handleAddressUpdate(idx)">수정</button>
                        <button @click="handleAddressDelete(item._id)">삭제</button>
                        <button @click="handleChkUpdate(item._id)">대표주소설정</button>
                    </td>
                </tr>
            </table>

        </div>
        

        
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive } from 'vue';

export default {
    setup () {
        const state = reactive({
            address: '',
            chk:0,
            token: sessionStorage.getItem("TOKEN"),
        });

        const handleLoadData = async()=> {
            const url = `/member/selectaddr`;
            const headers = {
                "Content-Type":"application/json",
                "token": state.token
            };
            const response = await axios.get(url, {headers});
            console.log('주소 조회------>', response.data);
            if (response.data.status === 200) {
                state.items = response.data.result;
            }
        }

        onMounted( ()=> {
            handleLoadData();
        });

        // 주소 추가
        const handleInsertaddr = async()=> {
            const url = `/member/insertaddr`;
            const headers = {
                "Content-Type":"application/json",
                "token": state.token
            };
            const body = {
                address: state.address
            };
            const response = await axios.post(url, body, {headers});
            console.log('주소등록------>',response);
            if (response.data.status === 200) {
                alert('등록되었습니다.');
            }
        }

        // 주소 삭제
        const handleAddressDelete = async(no)=> {
            if (confirm('삭제할까요?')) {
                const url = `/member/deleteaddr`;
                const headers = {
                    "Content-Type":"application/json",
                    "token": state.token
                };
                const body = {no : no};

                const response = await axios.delete(url, {headers:headers, data:body});

                console.log('주소 삭제------>', response.data);
                if (response.data.status === 200) {
                    alert('삭제되었습니다.')
                    handleLoadData();
                }
            }
        }

        // 대표주소 변경
        const handleChkUpdate = async(no) => {
            if (confirm('변경할까요?')) {
                const url = `/member/updatechkaddr`;
                const headers = {
                    "Content-Type":"application/json",
                    "token": state.token
                };
                const body = {no : no};

                const response = await axios.put(url, body, {headers:headers});

                console.log('대표주소 변경------>', response.data);
                if (response.data.status === 200) {
                    alert('변경되었습니다.')
                    handleLoadData();
                }
            }
        }

        // 주소 변경
        const handleAddressUpdate = async(idx)=> {
            if (confirm('수정할까요?')) {
                const url = `/member/updateaddr`;
                const headers = {
                    "Content-Type":"application/json",
                    "token": state.token
                };

                const body = {
                    no : state.items[idx]._id,
                    address: state.items[idx].address
                };

                const response = await axios.put(url, body, {headers:headers});
                console.log('주소 수정하기------>', response.data);

                if (response.data.status === 200) {
                    alert('변경되었습니다.');
                    handleLoadData();
                }
            }
            
        }

        return {
            state, 
            handleInsertaddr,
            handleAddressDelete,
            handleChkUpdate,
            handleAddressUpdate
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>