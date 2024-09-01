<script setup lang="ts">
import GuestLayout from "../components/GuestLayout.vue";
import {computed, ref} from "vue";
import store from "../store";
import {UserLoginRequest, UserLoginResponse} from "../types/user.type.ts";
import Spinner from "../assets/Spinner.vue";
import {useRouter} from "vue-router";
import {ApiResponse, PayloadError} from "../types/api.types.ts";

const router = useRouter()
const userLoginReq: UserLoginRequest = {
  email: '',
  password: '',
  remember: false
}

const errorMsg = ref([] as Array<PayloadError>)
const loadingState = computed(() => store.state.loading);

async function login() {
  await store.dispatch('toggleLoadingState', true)
  const res: ApiResponse<UserLoginResponse> = await store.dispatch('login', userLoginReq);
  if (res.success) {
    await router.push({name: 'app.dashboard'});
    await store.dispatch('toggleLoadingState', false)
  } else {
    errorMsg.value = res.errors;
    await store.dispatch('toggleLoadingState', false)
  }
}

</script>

<template>
  <GuestLayout title="Sign in to your account">
    <form class="space-y-6" @submit.prevent="login" method="POST">
      <div  v-if="errorMsg" class="flex flex-col gap-1.5">
        <div
            v-for="error in errorMsg"
            :key="error.key"
            class="flex items-center justify-center py-3 px-5 bg-red-500 text-white rounded"
        >
          {{ error.message }}
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input
              id="email"
              name="email"
              v-model="userLoginReq.email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input
              id="password"
              name="password"
              v-model="userLoginReq.password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div class="flex text-sm mt-5 justify-between">
          <router-link :to="{name: 'requestPassword'}" class="font-semibold text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </router-link>
          <div class="flex items-center">
            <input
                id="remember-me"
                name="remember-me"
                v-model="userLoginReq.remember"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
          </div>
        </div>
      </div>

      <div>
        <button
            type="submit"
            :disabled="loadingState"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :class="{
              'cursor-not-allowed': loadingState,
              'hover:bg-indigo-500': loadingState
            }"
        >
          <Spinner v-if="loadingState"/>
          Sign in
        </button>
      </div>
    </form>
  </GuestLayout>
</template>