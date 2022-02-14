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
import ItemContent from '@/components/ItemContent.vue';
import Order from '@/components/Order.vue';

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
    { path: '/itemcontent', name: "ItemContent", component: ItemContent},
    { path: '/order', name: "Order", component: Order},
]

// localhost:8080/#/

// 라우터 생성(주소표기방식, 라우터설정변수)
const router = createRouter({
    history: createWebHashHistory(), // 127.0.0.1:8080/#/login
    routes: routes
});

// 라우터 이동결로 확인(이동하는페이지, 이동전페이지, 다음페이지로 이동)
router.beforeEach((to, from, next)=>{
    console.log(to, from);

    const token = sessionStorage.getItem("TOKEN");
    // console.log(token);

    // 추가) 토큰이 유효한 상태인지를 주기적으로 확인 후에 페이지 진입
    // axios를 이용해서 백엔드 연동할 예정...
    

    // 로그인이 되어야만 이동하는 이동하는 페이지 조건
    // ex) 주문페이지, 회원용 게시판의 글쓰기 ... 
    if (to.name === 'Order' || to.name === 'BoardWrite') {
        if (token === null) {
            // 로그인 성공하고 이동하고자 페이지를 알려주는 역할
            // 로그인 페이지에서 CURL을 꺼내 원하는 페이지 이동
            sessionStorage.setItem("CURL", to.name);
            // sessionStorage 는 object 자체를 보관할 수 없음
            // 방법은 object -> string으로 변환해서 보관
            sessionStorage.setItem("CURL_QUERY", JSON.stringify(to.query));
            sessionStorage.setItem("CURL_PARAMS", JSON.stringify(to.params));

            return next({name:'Login'})    // 로그인페이지로 이동
        }
    }

    if (to.name !== 'Login') {
        sessionStorage.removeItem("CURL");
        sessionStorage.removeItem("CURL_QUERY");
        sessionStorage.removeItem("CURL_PARAMS");
    }
    next(); // 원래 이동하고자 하는 페이지
    
});

export default router;