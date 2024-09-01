<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import store from "../../store";
import {ApiResponse} from "../../types/api.types.ts";
import {ProductArrayType} from "../../types/product.type.ts";
import Spinner from "../../assets/Spinner.vue";
import {SortDirection} from "../../constants/sort.ts";

const isLoading = computed(() => store.state.loading)

const perPage = ref(10);
const currentPage = ref(1)
const search = ref('');
const orderBy = ref(SortDirection.DESC)
const products = computed(() => store.state.products)
const lastPage = computed(() => products.value.totalCount / Number(perPage.value))

console.log(perPage.value, products.value.totalCount)

onMounted(() => {
  getProducts(currentPage.value, perPage.value, search.value, orderBy.value)
})

async function getProducts(page: number, perPage: number, search: string, orderBy: SortDirection) {
  currentPage.value = page
  await store.dispatch('toggleLoadingState', true)
  const result: ApiResponse<Array<ProductArrayType>> = await store.dispatch('getProducts', {page, perPage, search, orderBy})
  if (result) {
    console.log(result)
    await store.dispatch('toggleLoadingState', false)
  }
}

function orderByFn(orderedBy: SortDirection) {
  if (orderedBy === SortDirection.DESC) {
    orderBy.value = SortDirection.ASC;
    return SortDirection.ASC;
  } else {
    orderBy.value = SortDirection.DESC;
    return SortDirection.DESC;
  }
}

</script>

<template>
  <div class="flex items-center justify-between mb-3">
    <h1>Products</h1>
    <button
        class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Add new product
    </button>
  </div>

  <div class="bg-white p-4 rounded-lg shadow">

    <div class="flex justify-between border-b-2 pb-3">
      <div class="flex items-center">
        <span class="whitespace-nowrap mr-3">Per page</span>
      </div>
      <div>
        <select
            @change="getProducts(1, perPage, search, orderBy)"
            v-model="perPage"
            class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <div>
        <input
            v-model="search"
            @change="getProducts(1, perPage, search, orderBy)"
            placeholder="Type to search products"
            class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
      </div>
    </div>

    <div v-if="isLoading" class="flex mt-4 w-full justify-center items-center">
      <Spinner class="text-black w-10 h-10"/>
    </div>
    <template v-else>

      <table class="table-auto w-full">
        <thead>
        <tr>
          <th class="border-b-2 p-2 text-left">Id</th>
          <th class="border-b-2 p-2 text-left">Image</th>
          <th class="border-b-2 p-2 text-left">Title</th>
          <th class="border-b-2 p-2 text-left">Price</th>
          <th class="border-b-2 p-2 text-left cursor-pointer" @click="getProducts(currentPage, perPage, search, orderByFn(orderBy))">
            <div class="flex justify-center items-center gap-2">
              Last updated at
              <svg v-if="orderBy === SortDirection.ASC" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"/>
              </svg>
            </div>
          </th>
        </tr>
        </thead>

        <tbody v-for="product of products.data">
        <tr>
          <td class="border-b p-2">{{ product.id }}</td>
          <td class="border-b p-2">
            <img class="w-16 min-h-[48px]" :src="product.image" :alt="product.title"/>
          </td>
          <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{{ product.title }}
          </td>
          <td class="border-b p-2">{{ product.price }}</td>
          <td class="border-b p-2">{{ product.updated_at }}</td>
        </tr>
        </tbody>

      </table>

      <div class="flex justify-between items-center mt-5">

        <div class="flex gap-7 items-center">

          <span>Page {{ currentPage }} of {{ lastPage.toFixed(0) }}</span>

          <div class="flex gap-5 ">
            <button
                class="disabled:text-gray-500 bg-indigo-200 p-2 rounded hover:bg-indigo-300"
                :class="{'cursor-not-allowed': currentPage === 1 }"
                :disabled="currentPage === 1"
                @click="getProducts(currentPage - 1, perPage, search, orderBy)">
              Previous
            </button>


            <button
                class="disabled:text-gray-500 bg-indigo-200 p-2 rounded hover:bg-indigo-300"
                :class="{'cursor-not-allowed': currentPage === lastPage}"
                :disabled="currentPage === lastPage"
                @click="getProducts(currentPage + 1, perPage, search, orderBy)">
              Next
            </button>
          </div>

        </div>

      </div>

    </template>
  </div>
</template>

<style scoped>

</style>