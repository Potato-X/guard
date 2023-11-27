import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { useRouteStore } from '@/store/route';
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    alias: '/',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/home',
    name: 'Index',
    meta: { title: '首页', nocache: false, tab: true },
    component: () => import('@/pages/home/index.vue'),
    children: [
      {
        path: 'index',
        name: 'homeIndex',
        meta: { title: '首页', nocache: false, tab: true },
        component: () => import('@/pages/home/homeindex.vue'),
      },
      {
        path: 'datasource',
        name: 'datasource',
        meta: { title: '数据源集合', nocache: false, tab: true },
        component: () => import('@/pages/datasource/index.vue'),
      },
      {
        path: 'interface',
        name: 'interface',
        meta: { title: '接口中心', nocache: false, tab: true },
        component: () => import('@/pages/interface/index.vue'),
      },
      {
        path: 'fgw-web',
        name: 'fgw-web',
        meta: { title: '金融网关总览', nocache: false, tab: true },
        component: () => import('@/pages/fgwweb/index.vue'),
      },
      {
        path: 'fgw-web/system',
        name: 'fgw-web_system',
        meta: { title: '金融网关接入系统', nocache: false, tab: true },
        component: () => import('@/pages/fgwweb/system.vue'),
      },
      {
        path: 'fgw-web/account',
        name: 'fgw-web_account',
        meta: { title: '金融网关账户', nocache: false, tab: true },
        component: () => import('@/pages/fgwweb/account.vue'),
      },
      {
        path: '/home/datasource/details',
        name: 'datasource_details',
        meta: {
          title: '数据源详情',
          nocache: false,
          tab: false,
        },
        component: () => import('@/pages/datasource/details.vue'),
      },
      {
        path: 'fgw-web/system/details',
        name: 'fgw-web_system_details',
        meta: { title: '接入系统详情', nocache: false, tab: false },
        component: () => import('@/pages/fgwweb/systemdetails.vue'),
      },
      {
        path: 'fgw-web/system/log',
        name: 'fgw-web_system_log',
        meta: { title: '接入系统详情', nocache: false, tab: false },
        component: () => import('@/pages/fgwweb/systemlog.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.back = function () {
  const routeStore = useRouteStore();
  const curTag = routeStore.routeStack[routeStore.activeTag];
  const curpath = curTag?.routeCur.path;
  let index = curTag!.stack.findIndex((item) => item.path == curpath);
  if (index > -1 && index != 0) {
    let path = curTag!.stack[index - 1].path;
    router.push(path);
  }
};
router.afterEach((to) => {
  const routeStore = useRouteStore();
  routeStore.setRoute(to);
  return true;
});
export default router;
