<template>
    <div>
        <h3>Home.vue</h3>
        <vueper-slides>
            <vueper-slide v-for="tmp in state.slides" :key="tmp" 
                :title="tmp.title" 
                :image="tmp.image" />
        </vueper-slides>

        <div v-if="state.items">
            <el-row :gutter="20" style="padding-top:10px" v-for="(i, idx1) in state.items.length/4" :key="i">
                <el-col :span="6" :gutter="10" v-for="(j, idx2) in 4" :key="j">

                    <el-card :body-style="{ padding: '5px' }" style="cursor:pointer" 
                        @click="handleDetailPage(state.items[(idx1 * 4) + idx2]._id)">
                        
                        <img :src="state.items[(idx1 * 4) + idx2].imageUrl" class="image" />
                        <div style="padding: 14px">
                            <span>{{state.items[(idx1 * 4) + idx2].name}}</span>
                            <div class="bottom">
                                가격: {{state.items[(idx1 * 4) + idx2].price}} <br />
                                내용: {{state.items[(idx1 * 4) + idx2].content}}
                            </div>
                        </div>
                    </el-card>

                </el-col>
            </el-row>
        </div>
        
        
        <!-- <div v-if="state.items">
            <el-row :gutter="20" v-for="(i, idx1) in state.items.length/4" :key="i">
                <el-col :span="6" :gutter="10" v-for="(j, idx2) in 4" :key="j" >
                    <div style="border: 1px solid #cccccc;
                        padding:20px;
                        cursor:pointer;"
                        @click="handleDetailPage(state.items[(idx1 * 4) + idx2]._id)" >

                        {{idx1}}
                        {{idx2}}
                        {{ (idx1 * 4) + idx2 }} <br />
                        <img :src="state.items[(idx1 * 4) + idx2].imageUrl" style="width:100%"> <br />
                        {{state.items[(idx1 * 4) + idx2].name}}
                        {{state.items[(idx1 * 4) + idx2].price}}
                    </div>
                </el-col>
            </el-row>
        </div> -->
        
    </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';

import {onMounted, reactive} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';

export default {
    components: {
         VueperSlides, VueperSlide 
    },

    setup () {
        const router = useRouter();

        const state = reactive({
            slides: [
                { title: 'a', image:'https://picsum.photos/500/300?image=1' },
                { title: 'b', image:'https://picsum.photos/500/300?image=2' },
                { title: 'c', image:'https://picsum.photos/500/300?image=3' },
            ],
            page: 1,
        });

        // localhost:3000/itemcontent?code= 1085
        const handleDetailPage = async(code)=> {
            router.push({name:"ItemContent", query:{code:code}});
        };

        const handleLoadData = async()=> {
            const url = `/shop/select?page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                state.items = response.data.result;

                //14 % 4 = 2
                //13 % 4 = 1
                //12 % 4 = 0
                const mod = Math.floor(state.items.length % 4);
                if (mod !== 0) {
                    for(let i=0; i<4-mod; i++){
                        state.items.push({
                            content     : "준비 중입니다.",
                            imageUrl    : require('../assets/default.jpg'),
                            name        : "",
                            price       : 0,
                            quantity    : 0,
                            seller      : "",
                            _id         : 0,
                        });
                    }
                }
                
            }
        };

        onMounted( async()=> {
            await handleLoadData();
        })

        return {state, handleDetailPage}
    }
}
</script>

<style lang="scss" scoped>

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image {
  width: 100%;
  display: block;
}

</style>