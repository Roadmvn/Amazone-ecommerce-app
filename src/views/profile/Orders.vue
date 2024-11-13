<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { formatDate, formatPrice } from '../../utils/validation'

const store = useStore()
const toast = useToast()
const loading = ref(true)
const orders = ref([])

onMounted(async () => {
  try {
    const response = await store.dispatch('orders/fetchOrders')
    orders.value = response
  } catch (error) {
    toast.error('Erreur lors du chargement des commandes')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Mes Commandes</h2>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-amazone-accent border-t-transparent"></div>
    </div>

    <div v-else-if="orders.length === 0" class="text-center py-12">
      <p class="text-gray-500">Vous n'avez pas encore de commande</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="order in orders" :key="order.id" 
        class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-semibold">Commande #{{ order.id }}</h3>
            <p class="text-sm text-gray-600">{{ formatDate(order.date) }}</p>
          </div>
          <span class="px-3 py-1 rounded-full text-sm"
            :class="{
              'bg-green-100 text-green-800': order.status === 'completed',
              'bg-yellow-100 text-yellow-800': order.status === 'pending',
              'bg-red-100 text-red-800': order.status === 'cancelled'
            }"
          >
            {{ order.status }}
          </span>
        </div>

        <div class="space-y-3">
          <div v-for="item in order.items" :key="item.id"
            class="flex justify-between items-center py-2 border-t">
            <div class="flex items-center gap-4">
              <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded" />
              <div>
                <p class="font-medium">{{ item.name }}</p>
                <p class="text-sm text-gray-600">Quantité: {{ item.quantity }}</p>
              </div>
            </div>
            <p class="font-semibold">{{ formatPrice(item.price * item.quantity) }}</p>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t flex justify-between items-center">
          <span class="font-bold">Total</span>
          <span class="font-bold text-lg">{{ formatPrice(order.total) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>