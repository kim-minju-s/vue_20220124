<template>
    <div>
        <h3>물품 일괄 추가</h3>
        
        <button @click="handleAdd">항목 추가</button>
        <button @click="handleSub">항목 삭제</button>
        {{state.items}}
        <table border="1">
            <tr v-for="(tmp, idx) in state.cnt" :key="tmp">
                <td><input type="file" @change="handleImage($event, idx)" /></td>
                <td><input type="text" placeholder="물품명" v-model="state.items[idx].name"/></td>
                <td><input type="text" placeholder="가격" v-model="state.items[idx].price"/></td>
                <td><input type="text" placeholder="수량" v-model="state.items[idx].quantity"/></td>
                <td><input type="text" placeholder="설명" v-model="state.items[idx].content"/></td>
            </tr>
        </table>
        <button @click="handleInsertAction">일괄추가</button>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            cnt: 2,
            token: sessionStorage.getItem("TOKEN"),
            items: [
                {
                    image:'',
                    name:'귤',
                    price:'541564',
                    quantity:'564',
                    content:'좋아',
                },
                {
                    image:'',
                    name:'아보카도',
                    price:'541564',
                    quantity:'564',
                    content:'싫어',
                }
            ] 
        });

        const handleAdd = () => {
            state.cnt++;
            // state.items의 마지막에 {}을 추가
            state.items.push({
                image:'',
                name:'아보카도',
                price:'541564',
                quantity:'564',
                content:'싫어',
            })
        };

        const handleSub = () => {
            if (state.cnt-1 >= 2) { // 1개를 뺏을 때 2이상이면
                state.cnt--;    // 실제적으로 숫자를 뺌
                // state.items의 마지막에 {}을 제거
                state.items.pop();
            }
        };

        // 파일을 첨부하거나 또는 취소하거나
        const handleImage = (e, idx)=> {
            if (e.target.files[0]) {
                console.log(e); // 첨부한 파일의 정보
                console.log(idx);   // 위치
                state.items[idx].image = e.target.files[0];
            }
            else{
                state.items[idx].image = '';
            }
            
        }

        const handleInsertAction = async()=> {
            const url = `/seller/insert`;
            const headers = {
                "Content-Type":"multipart/form-data",
                "token":state.token
            };
            const body = new FormData();
            // state.item = [{}, {}]
            for(let i=0;i<state.items.length;i++){
                body.append("image", state.items[i].image);
                body.append("title", state.items[i].title);
                body.append("price", state.items[i].price);
                body.append("quantity", state.items[i].quantity);
                body.append("content", state.items[i].content);
            }

            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                router.push({name:"Seller"})
            }
        }

        return {state,handleAdd, handleSub, handleInsertAction, handleImage}
    }
}
</script>

<style lang="scss" scoped>

</style>