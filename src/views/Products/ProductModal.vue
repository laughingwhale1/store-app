<template>
    <TransitionRoot appear :show="props.isOpen" as="template">
        <Dialog as="div" @close="$emit('closeModal')" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        >
                            <div
                                v-if="isLoading"
                                class="flex justify-center items-center min-h-80"
                            >
                                <Spinner class="w-7 h-7" />
                            </div>

                            <div v-else>
                                <DialogTitle
                                    as="h3"
                                    class="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {{
                                        props?.product?.id ? 'Edit' : 'Create'
                                    }}
                                    Product
                                </DialogTitle>

                                <form @submit.prevent="onSubmit">
                                    <div class="bg-white pt-2">
                                        <CustomInput
                                            class="mb-2"
                                            v-model="product.title"
                                            label="Product Title"
                                        />
                                        <CustomInput
                                            type="file"
                                            class="mb-2"
                                            label="Product Image"
                                            @change="
                                                (file) => (product.image = file)
                                            "
                                        />
                                        <CustomInput
                                            type="textarea"
                                            class="mb-2"
                                            v-model="product.description"
                                            label="Description"
                                        />
                                        <CustomInput
                                            type="number"
                                            class="mb-2"
                                            v-model="product.price"
                                            label="Price"
                                            prepend="$"
                                        />
                                    </div>

                                    <div class="flex gap-2 mt-4">
                                        <button
                                            type="button"
                                            class="inline-flex justify-center rounded-md border border-transparent bg-blue-100
                                            px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none
                                            focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            @click="$emit('closeModal')"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            class="inline-flex justify-center rounded-md border border-transparent bg-blue-100
                                            px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none
                                            focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import { ProductResourceType } from '../../types/product.type.ts'
import { onUpdated, ref } from 'vue'
import Spinner from '../../assets/Spinner.vue'
import CustomInput from '../../components/CustomInput.vue'
import store from '../../store'
import { ApiResponseEmpty } from '../../types/api.types.ts'

interface IProps {
    isOpen: boolean
    product: ProductResourceType
    closeModal: VoidFunction
    refetchProducts: VoidFunction
}

const props = defineProps<IProps>()

const isLoading = ref(false)

const product = ref<ProductResourceType>({
    description: props.product?.description,
    id: props.product?.id,
    image: props.product?.image,
    price: props.product?.price,
    title: props.product?.title,
})

onUpdated(() => {
    product.value = {
        description: props.product?.description,
        id: props.product?.id,
        image: props.product?.image,
        price: props.product?.price,
        title: props.product?.title,
    }
})

async function onSubmit() {
    isLoading.value = true
    if (product.value.id) {
        const result: ApiResponseEmpty = await store.dispatch(
            'updateProduct',
            product.value,
        )
        if (result) {
            isLoading.value = false

            if (result.status === 200) {
                props.refetchProducts()
            }
        }
    } else {
        const result = await store.dispatch('createProduct', product.value)
        if (result) {
            isLoading.value = false;

            if (result.status === 201) {
                // TODO show notification
                props.refetchProducts()
                props.closeModal()
            }
        }
    }
}
</script>
