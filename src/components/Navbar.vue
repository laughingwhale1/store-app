<script setup lang="ts">
import {Bars3BottomLeftIcon} from '@heroicons/vue/24/solid'
import UserAvatar from "./UserAvatar.vue";

const emit = defineEmits(['toggle-sidebar']);
</script>

<template>
  <header class="flex justify-between items-center h-16 px-6 shadow bg-white">
    <button @click="emit('toggle-sidebar')">
      <Bars3BottomLeftIcon class="w-7 transition-all hover:bg-black/10 rounded" />
    </button>
    <div class="flex ml-auto">
        <UserAvatar />
    </div>
  </header>
</template>