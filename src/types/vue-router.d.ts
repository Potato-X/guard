import { RouteLocationNormalizedLoaded } from 'vue-router';

declare module 'vue-router' {
  interface RouteLocationNormalizedLoaded {
    groupId?: string;
  }
}
