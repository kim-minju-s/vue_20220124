<template>
    <div>
        <h3>물품 상세 조회</h3>
        {{ state }}

        <div v-if="state.item">
            <img :src="state.item.imageUrl" style="width: 200px">
            {{state.item._id}} <br />
            {{state.item.name}} <br />
            {{state.item.price}} <br />
            {{state.item.content}} <br />
            <select v-model="state.item.ordercnt">
                <option v-for="no in 100" :key="no">
                    {{ no }}
                </option>
            </select>
            <button @click="handleOrderAction">주문하기</button>
            
            
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            code: route.query.code,
        });

        const handleOrderAction = async()=> {
            router.push({name:"Order",
                query : {
                    code: state.item._id,
                    cnt: state.item.ordercnt
                }

            });
        };

        const handleLoadData = async()=> {
            const url = `/shop/selectone?code=${state.code}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);

            if (response.data.status === 200) {
                state.item = response.data.result;
            }
        }

        onMounted( async()=> {
            await handleLoadData();
        })

        return {state, handleOrderAction}
    }
}
</script>

<style lang="scss" scoped>

</style>