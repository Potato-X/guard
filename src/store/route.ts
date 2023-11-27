import { defineStore } from 'pinia';
import { RouteLocationNormalized, useRoute } from 'vue-router';
import type { IRouteStack, IStackInfo } from '@/types/route-stack';
const routeStack: IRouteStack = {};
const useRouteStore = defineStore('routeStack', {
  state: () => {
    return {
      routeStack,
      activeTag: '',
    };
  },
  actions: {
    setRoute(to: RouteLocationNormalized) {
      if (to.path == '/login') return;
      const routeInfo: IStackInfo = {
        path: to.path,
        pathName: to.meta.title as string,
        meta: to.meta,
      };
      const route = useRoute();
      if (to.meta.tab) {
        route.groupId = to.path;
        if (this.routeStack[to.path]) {
          let index = this.routeStack[to.path]!.stack.findIndex(
            (item) => item.path == routeInfo.path,
          );
          index > -1 ? '' : this.routeStack[to.path]!.stack.push(routeInfo);
          this.routeStack[to.path]!.routeCur = routeInfo;
        } else {
          this.routeStack[to.path] = {
            stack: [routeInfo],
            routeCur: routeInfo,
          };
        }
      } else {
        let groupId = route.groupId as string;
        let index = this.routeStack[groupId]!.stack.findIndex(
          (item) => item.path == routeInfo.path,
        );
        if (index == -1) {
          this.routeStack[groupId]!.stack.push(routeInfo);
        }
        this.routeStack[groupId]!.routeCur = routeInfo;
      }
    },
    clearRouteStack(groupId: string) {
      delete this.routeStack[groupId];
    },
    setactiveTag(activeTag: string) {
      this.activeTag = activeTag;
    },
  },
  persist: true,
});

export { useRouteStore };
