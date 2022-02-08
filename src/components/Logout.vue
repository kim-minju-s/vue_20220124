<template>
    <div>

    </div>
</template>

<script>
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import { nextTick, onMounted } from 'vue';

export default {
    
    setup () {
        const router = useRouter();
        const store = useStore();

        onMounted( async() => {
            nextTick( () => {
                sessionStorage.removeItem("TOKEN");
                alert('로그아웃 되었습니다.');
                // 1. 주소창만 바뀜
                router.push({name:'Home'});
                // App.vue에 메뉴의 선택항목을 변경하도록 알려줌
                // 2. 메뉴 활성화
                store.commit("setMenu","/");
                // 3. 로그인 상태
                store.commit("setLogged",false);
            })
        });

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>