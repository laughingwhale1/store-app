<script setup lang="ts">
import {HomeIcon, UserIcon, BuildingStorefrontIcon, BuildingLibraryIcon} from '@heroicons/vue/24/solid'

interface RouteItem {
  name: string
  icon: any
  label: string
  routeName: string
}

const DASHBOARD_ITEMS: RouteItem[] = [
  { name: 'dashboard', icon: HomeIcon, label: 'Dashboard', routeName: 'app.dashboard' },
  { name: 'products', icon: BuildingStorefrontIcon, label: 'Products', routeName: 'app.products' },
  { name: 'profile', icon: UserIcon, label: 'Users', routeName: 'app.dashboard' },
  { name: 'profile', icon: BuildingLibraryIcon, label: 'Reports', routeName: 'app.dashboard' },
]

</script>

<template>
  <div class="w-[200px] transition-all bg-indigo-700 text-gray-200 py-4 px-2 ">
    <router-link
        v-for="route in DASHBOARD_ITEMS"
        :key="route.name"
        :to="{ name: route.routeName }"
        class="flex items-center space-x-3 transition-all hover:bg-black/10 py-2 px-2 rounded"
    >
      <span>
        <component :is="route.icon" class="w-5" />
      </span>
      <span class="text-sm font-light">{{ route.label }}</span>
    </router-link>
  </div>
</template>