import { createWebHistory, createRouter, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { post } from '@/utils/axiosService';
import { cookieService } from '@/utils/cookieService';

const routes: RouteRecordRaw[] = [
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
    },
    {
        path: "/privacy",
        component: () => import('@/views/Privacy.vue'),
    },
    {
        path: "/about",
        component: () => import('@/views/About.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 不需要登录验证的白名单路由
const whiteList = ['/login', '/register', '/privacy', '/about'];

// router.beforeEach(async (
//     to: RouteLocationNormalized,
//     from: RouteLocationNormalized,
//     next: NavigationGuardNext
// ): Promise<void> => {
//     try {
//         // 优先检查白名单
//         if (whiteList.includes(to.path)) {
//             next();
//             return;
//         }

//         const username = cookieService.get('username');

//         // 如果没有用户名，直接跳转登录
//         if (!username) {
//             next('/login');
//             return;
//         }

//         try {
//             interface LoginResponse {
//                 status: number;
//                 data: any;
//                 message?: string;
//             }

//             const loginResponse: LoginResponse = await post('isLogin', { username });
//             const isLoggedIn = loginResponse.status === 200;

//             // 已登录用户访问登录/注册页面
//             if (['/login', '/register'].includes(to.path) && isLoggedIn) {
//                 console.warn('已登录状态，无需重复登录');
//                 next('/');
//                 return;
//             }

//             // 未登录用户访问需要登录的页面
//             if (!isLoggedIn && !whiteList.includes(to.path)) {
//                 next('/login');
//                 return;
//             }

//             // 其他情况放行
//             next();

//         } catch (error) {
//             console.error('登录状态验证失败:', error instanceof Error ? error.message : String(error));
//             cookieService.remove('username'); // 清除失效的 cookie
//             next('/login');
//         }

//     } catch (error) {
//         console.error('路由守卫执行失败:', error instanceof Error ? error.message : String(error));
//         next('/login');
//     }
// });

export default router;
