// npm install vue-router@next --save
// 파일명 : src/routes/index.js
import { createWebHashHistory, createRouter } from "vue-router";

// 라우트 설정하기
import Home from '@/components/Home.vue';
import Board from '@/components/Board.vue';
import Login from '@/components/Login.vue';
import Logout from '@/components/Logout.vue';
import Mypage from '@/components/Mypage.vue';
import Seller from '@/components/Seller.vue';
import Admin from '@/components/Admin.vue';
import Join from '@/components/Join.vue';
import BoardContent from '@/components/BoardContent.vue';
import Chart from '@/components/Chart.vue';
import BarChart from '@/components/BarChart.vue';
import BoardWrite from '@/components/BoardWrite.vue';
import BoardUpdate from '@/components/BoardUpdate.vue';
import Menu1Insert from '@/components/seller/Menu1Insert.vue';
import Menu1Detail from '@/components/seller/Menu1Detail.vue';

const routes = [
    { path: '/', name: "Home", component: Home},
    { path: '/login', name: "Login", component: Login},
    { path: '/logout', name: "Logout", component: Logout},
    { path: '/mypage', name: "Mypage", component: Mypage},
    { path: '/seller', name: "Seller", component: Seller},
    { path: '/board', name: "Board", component: Board},
    { path: '/admin', name: "Admin", component: Admin},
    { path: '/join', name: "Join", component: Join},
    { path: '/boardcontent', name: "BoardContent", component: BoardContent},
    { path: '/chart', name: "Chart", component: Chart},
    { path: '/barchart', name: "BarChart", component: BarChart},
    { path: '/boardwrite', name: "BoardWrite", component: BoardWrite},
    { path: '/boardupdate', name: "BoardUpdate", component: BoardUpdate},
    { path: '/menu1insert', name: "Menu1Insert", component: Menu1Insert},
    { path: '/menu1detail', name: "Menu1Detail", component: Menu1Detail},
]

// localhost:8080/#/

// 라우터 생성(주소표기방식, 라우터설정변수)
const router = createRouter({
    history: createWebHashHistory(), // 127.0.0.1:8080/#/login
    routes: routes
});

// 라우터 이동결로 확인(이동하는페이지, 이동전페이지, 다음페이지로 이동)
router.beforeEach((to, from, next)=>{
    console.log('이동하는 페이지:',to.path);

    //저장소에 보관하기
    sessionStorage.setItem("CURL", to.path);
    
    console.log('이동전 페이지:',from);
    next(); //다음페이지로 이동
});

export default router;