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
      <el-menu-item v-show="!logged" index="/login">Login</el-menu-item>
      <el-menu-item v-show="logged===true" index="/logout">Logout</el-menu-item>
      <el-menu-item v-show="logged===true && urole ==='CUSTOMER'" index="/mypage">Mypage</el-menu-item>
      <el-menu-item v-show="logged===true && urole ==='SELLER'" index="/seller">Seller</el-menu-item>
      <el-menu-item index="/board">Board</el-menu-item>
      <el-menu-item index="/admin">Admin</el-menu-item>
      <el-menu-item index="/join">Join</el-menu-item>
      <el-menu-item index="/chart">Chart</el-menu-item>

    </el-menu>

    <div v-if="logged === true">{{uid}},{{uname}}님의 로그인</div>
    {{menu}},{{logged}}
    <router-view></router-view>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import {computed, reactive, onMounted } from 'vue';

export default {
  setup () {
    const store = useStore();

    // store 값 가져오기
    // 마지막으로 방문한 페이지를 session저장소에 보관 후 반환
    const menu = computed(() => {
      return store.getters.getMenu
    });

    // store의 logged값의 실시간으로 확인
    // 로그인 상태 (로그인 T, 로그아웃 F)
    const logged = computed(() => {
      return store.getters.getLogged
    });

    // 아이디 정보(로그인 정보추가, 로그아웃 정보제거)
    const uid = computed(() => {
      return store.getters.getUid
    });

    const uname = computed(() => {
      return store.getters.getUname
    });

    // SELLER, CUSTOMER
    const urole = computed(() => {
      return store.getters.getUrole
    });

    // store의 munu값 실시간으로 확인
    // state 변수 생성
    // store 에서 읽은 메뉴값으로 초기값으로 세팅
    const state = reactive({
      activeIndex : menu
    });

    onMounted( async() => { // F5 새로고침
      // 저장소에 있는 TOKEN값을 읽어서 존재 유무
      // TOKEN을 추가하는 시점 로그인이 완료되었을 때
      // TOKEN의 값을 제거하는 시점 로그아웃 되었을 때
      if (sessionStorage.getItem("TOKEN") === null) {
        store.commit("setLogged", false);
      }
      else{
        // mutations 을 호출하는 경우
        store.commit("setLogged", true);

        // actions를 호출할 경우
        store.dispatch("handleData", {});
      }
    })

    // 메뉴를 클릭했을 때
    // store 값 변경하기
    const handleSelect = (idx) => {
      console.log(idx);
      store.commit("setMenu",idx);
      // state.activeIndex = idx;
    };
   
    /*
    //store의 state 변수가 변경되는 시점을 바로 알 수 있음
    store.subscribe((mutation, state) => {
      console.log('store.subscribe', mutation, state);
    })
    */

    return {state, menu, logged, handleSelect, uid, uname, urole}
  }
}
</script>

<style lang="scss" scoped>

</style>