import Vue from "vue";
import VueRouter from "vue-router";
// import axiosPost from '@/utils/axiosPost';
// import Cookies from 'js-cookie';
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "hash",
    routes: [
        {
            path: "/",
            component: () => import('@/views/Home.vue'),
        },
        {
            path: "/login",
            component: () => import('@/views/Login.vue'),
        },
        {
            path: "/register",
            component: () => import('@/views/Register.vue'),
        },
        {
            path: "/verify",
            component: () => import('@/views/Verify.vue'),
        }
        ]
});

// router.beforeEach(async(to, from, next) => {
//     let username = Cookies.get('username');
//     let isLogin;
//     isLogin = await axiosPost('isLogin', { username: username });
//     console.log(isLogin)
//     if (to.path === "/login" || to.path === "/register") {
//         if (isLogin.status === 200) {
//             next("/");
//             console.log('已经登录，请注销后再操作！')
//         }else {
//             next();
//         }
//     } else {
//         console.log('进入了else')
//         isLogin.status === 200 ? next() : next("/login");
//     }
// });
export default router;
