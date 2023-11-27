<template>
  <div class="nav-link-bar">
    <el-tag
      v-for="tag in tags"
      :key="tag"
      :closable="tag.groupId !== '/home/index'"
      :effect="activeTag == tag.groupId ? 'dark' : 'plain'"
      :type="activeTag == tag.groupId ? '' : 'info'"
      class="mgr8"
      @close.stop="handleClose(tag.groupId)"
      @click="toTagUrl(tag.routeInfo, tag.groupId)"
    >
      {{ tag!.routeInfo.routeCur.pathName }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRouteStore } from '@/store/route';
import type { IrouteInfo } from '@/types/route-stack';
const routeStore = useRouteStore();
const route = useRoute();
const router = useRouter();
const activeTag = ref<string>('');
const tags = computed(() => {
  let tags = [];
  for (const key in routeStore.routeStack) {
    if (Object.prototype.hasOwnProperty.call(routeStore.routeStack, key)) {
      if (routeStore.routeStack[key]?.routeCur.path == '/home/index') {
        tags.unshift({
          routeInfo: routeStore.routeStack[key] as IrouteInfo,
          groupId: key,
        });
      } else {
        tags.push({
          routeInfo: routeStore.routeStack[key] as IrouteInfo,
          groupId: key,
        });
      }
      if (route.path == key) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        activeTag.value = key;
        routeStore.setactiveTag(key);
      }
    }
  }
  return tags;
});
function handleClose(groupId: string) {
  let target = tags.value.find((item) => item.groupId == groupId);
  let targetIndex = tags.value.findIndex((item) => item.groupId == groupId);
  if (tags.value.length == 1) {
    return routeStore.clearRouteStack(target!.groupId);
  }
  if (tags.value.length - 1 == targetIndex) {
    toTagUrl(
      tags.value[targetIndex - 1].routeInfo,
      tags.value[targetIndex - 1].groupId,
    );
  } else {
    toTagUrl(
      tags.value[targetIndex + 1].routeInfo,
      tags.value[targetIndex + 1].groupId,
    );
  }
  routeStore.clearRouteStack(target!.groupId);
}
function toTagUrl(tag: IrouteInfo, groupId: string) {
  if (activeTag.value == groupId) return;
  activeTag.value = groupId;
  routeStore.setactiveTag(groupId);
  route.groupId = groupId;
  router.push({
    path: tag.routeCur.path,
  });
}
</script>

<style lang="scss" scoped>
.nav-link-bar {
  height: 30px;
  line-height: 30px;
  padding: 0 8px;
  overflow: auto;
}

.mgr8 {
  cursor: pointer;
  margin-right: 8px;
}
</style>
