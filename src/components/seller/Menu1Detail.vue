<template>
    <div>
        <h3>물품 상세 내용</h3>
        {{state.items}}
        <hr />
        <router-link to="/seller">목록으로</router-link>
        <div v-if="state.items">
            번호:{{state.items._id}} <br />
            이름:{{state.items.name}} <br />
            가격:{{state.items.price}} <br />
            갯수:{{state.items.quantity}} <br />
            내용:{{state.items.content}} <br />
            날짜:{{state.items.regdate}} <br />
            이미지: <img :src="state.items.imageUrl" style="width:200px; height:200px" />

            <div v-for="tmp in state.items.subImage" :key="tmp">
                <img :src="tmp.imageUrl" style="width:50px; height:50px" />
            </div>
        </div>
        
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
    setup () {
        const route = useRoute();
        
        const state = reactive({
            code: route.query.code,
            token: sessionStorage.getItem("TOKEN")
        });
        
        // 생명주기 onMounted 에서
        // /seller/selectone?code=111 을 호출해서 화면에 표시하시오.

        const handleLoadData = async()=> {
            const url = `/seller/selectone?code=${state.code}`;
            const headers = {
                "Content-Type":"application/json",
                "token":state.token
            };
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                state.items = response.data.result;
            }
        };

        onMounted( async() => {
            await handleLoadData();
        });

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>