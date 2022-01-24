<template>
  <div>
    <!-- Elmenu.vue -->
    <!-- props로 default-active 값을 전달 -->
    <!-- props로 router TRUE 값을 전달 -->
    <!-- 자식 컴포넌트 emit를 통해서 select 이벤트 -->
    <el-menu
      :default-active="state.activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      @select="handleSelect">

      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/login">Login</el-menu-item>
      <el-menu-item index="/board">Board</el-menu-item>
      <el-menu-item index="/admin">Admin</el-menu-item>

    </el-menu>
    {{menu}},{{logged}}
    <router-view></router-view>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import {computed, reactive} from 'vue';

export default {
  setup () {
    const store = useStore();

    // store 값 가져오기
    // 마지막으로 방문한 페이지를 session저장소에 보관 후 반환
    const menu = computed(() => {
      return store.getters.getMenu
    });

    // state 변수 생성
    // store 에서 읽은 메뉴값으로 초기값으로 세팅
    const state = reactive({
      activeIndex : menu
    });
    
    const logged = computed(() => {
      return store.getters.getLogged
    });

    // store 값 변경하기
    const handleSelect = (idx) => {
      console.log(idx);
      store.commit("setMenu",idx);
      // state.activeIndex = idx;
    };
   
    //store의 state 변수가 변경되는 시점을 바로 알 수 있음
    store.subscribe((mutation, state) => {
      console.log('store.subscribe', mutation, state);
    })

    return {state, menu, logged, handleSelect}
  }
}
</script>

<style lang="scss" scoped>

</style>