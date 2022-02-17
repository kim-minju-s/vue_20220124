<template>
    <div>
        <h3>물품 상세 조회</h3>
        {{ state }}

        <div v-if="state.item" style="width:800px">
            <el-descriptions title="상세 주문 페이지" :column="3" border>
                <el-descriptions-item label="물품번호" label-align="center" align="center" width="150px">
                    {{state.item._id}}
                </el-descriptions-item>

                <el-descriptions-item label="물품이름" label-align="center" align="center">
                    {{state.item.name}}
                </el-descriptions-item>

                <el-descriptions-item label="가격" label-align="center" align="center">
                    {{state.item.price}}
                </el-descriptions-item>

                <el-descriptions-item label="내용" label-align="center" align="center">
                    {{state.item.content}}
                </el-descriptions-item>

            </el-descriptions>

            <div class="demo-image">
                <el-image
                    style="width: 450px; height: 450px"
                    :src="state.item.imageUrl"
                    :fit="cover"
                ></el-image>
            </div>

            <el-select v-model="value" clearable placeholder="개수">
                <el-option
                    v-for="no in state.item.ordercnt" :key="no">
                </el-option>
            </el-select>

            <select v-model="state.item.ordercnt">
                <option v-for="no in 100" :key="no">
                    {{ no }}
                </option>
            </select>
            <button @click="handleOrderAction">주문하기</button>
            <button @click="handleCartAction">장바구니</button>
            <button @click="handleSelectCartAction">장바구니 목록</button>

        </div>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
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

        const value =  ref('');

        const handleSelectCartAction = async()=> {
            const url = `/shop/selectcart`;
            const headers = {"Content-Type":"application/json"};
            
            const response = await axios.get(url, {headers});
            console.log(response.data);
        }

        const handleCartAction = async()=> {
            const url = `/shop/insertcart`;
            const headers = {"Content-Type":"application/json"};

            console.log();
            // 물품번호, 수량, 로그인하지 않은 사용자의 정보
            const body = {
                code: state.item._id,
                cnt: state.item.ordercnt
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
        };

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

        return {
            state, 
            handleOrderAction, 
            handleCartAction,
            handleSelectCartAction,
            value
        }
    }
}
</script>

<style lang="scss" scoped>

</style>