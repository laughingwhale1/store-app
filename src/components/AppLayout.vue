<script setup lang="ts">
  import Sidebar from "./Sidebar.vue";
  import Navbar from "./Navbar.vue";
  import {computed, onMounted, ref} from "vue";
  import store from "../store";
  import {ApiResponse} from "../types/api.types.ts";
  import {IUser} from "../types/user.type.ts";

  const SIDEBAR_OPENED = ref(true)
  const USER_REQ_COMPLETED = computed(() => store.state.user.data.id)
  function toggleSidebar () {
    SIDEBAR_OPENED.value = !SIDEBAR_OPENED.value
  }

  onMounted(async () => {
    await store.dispatch('toggleLoadingState', true)
    const res: ApiResponse<IUser> = await store.dispatch('getUser')
    if (res) {
      await store.dispatch('toggleLoadingState', false)
    }
  })

</script>

<template>
  <div class="flex bg-gray-100 min-h-full" v-if="Boolean(USER_REQ_COMPLETED)">
    <Sidebar  :class="{'-ml-[200px]': !SIDEBAR_OPENED}" />

    <div class="flex-1">
      <Navbar @toggle-sidebar="toggleSidebar" />

      <!--    Content-->
      <main class="p-6">
        <div class="p-4 bg-white rounded">
          <router-view></router-view>
        </div>
      </main>
      <!--  /  Content-->
    </div>
  </div>
</template>