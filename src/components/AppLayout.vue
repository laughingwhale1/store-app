<script setup lang="ts">
  import Sidebar from "./Sidebar.vue";
  import Navbar from "./Navbar.vue";
  import {ref} from "vue";

  const SIDEBAR_OPENED = ref(true)

  function toggleSidebar () {
    SIDEBAR_OPENED.value = !SIDEBAR_OPENED.value
  }
</script>

<template>
  <div class="flex bg-gray-100 min-h-full">
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