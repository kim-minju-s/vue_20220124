<template>
    <div>
        <h3>주문하기</h3>
        
        {{state}}

        <button @click="handleOrderAction">결제하기</button>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            code: route.query.code,
            cnt: route.query.cnt,
            token: sessionStorage.getItem("TOKEN")
        });

        const handleOrderAction = async()=> {
            const url = `/shop/order`;
            const headers = {
                "Content-Type":"application/json",
                "token": state.token
            };
            const body = {
                itemcode: Number(state.code),
                ordercnt: Number(state.cnt)
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);

            if (response.data.status === 200) {
                router.push({name:"Mypage", query:{menu:4}});
            }
        };

        return {state, handleOrderAction}
    }
}
</script>

<style lang="scss" scoped>

</style>