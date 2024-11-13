<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { formatDate, formatPrice } from '../../utils/validation'

const store = useStore()
const toast = useToast()

const loading = ref(true)
const orders = ref([])
const selectedStatus = ref('all')

const statuses = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'pending', label: 'En attente' },
  { value: 'processing', label: 'En traitement' },
  { value: 'shipped', label: 'Expédié' },
  { value: 'delivered', label: 'Livré' },
  { value: 'cancelled', label: 'Annulé' }
]

onMounted(async () => {
  if (!store.getters['auth/isAdmin']) {
    router.push('/')
    toast.error('Accès non autorisé')
    return
  }

  try {
    await fetchOrders()
  } catch (error) {
    toast.error('Erreur lors du chargement des commandes')
  } finally {
    loading.value = false
  }
})

const fetchOrders = async () => {
  // Simuler un appel API
  await new Promise(resolve => setTimeout(resolve, 1000))
  orders.value = [
    {
      id: 1,
      customer: {
        name: 'Jean Dupont',
        email: 'jean@example.com'
      },
      date: '2024-03-20',
      total: 699.99,
      status: 'pending',
      items: [
        {
          id: 1,
          name: 'Smartphone XYZ',
          price: 699.99,
          quantity: 1
        }
      ]
    }
  ]
}

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = newStatus
      toast.success('Statut mis à jour')
    }
  } catch (error) {
    toast.error('Erreur lors de la mise à jour du statut')
  }
}

const filteredOrders = computed(() => {
  if (selectedStatus.value === 'all') return orders.value
  return orders.value.filter(order => order.status === selectedStatus.value)
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Gestion des commandes</h2>
      <select
        v-model="selectedStatus"
        class="rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
      >
        <option v-for="status in statuses" :key="status.value" :value="status.value">
          {{ status.label }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-amazone-accent border-t-transparent"></div>
    </div>

    <div v-else-if="filteredOrders.length === 0" class="text-center py-12">
      <p class="text-gray-500">Aucune commande trouvée</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="order in filteredOrders" :key="order.id"
        class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-semibold">Commande #{{ order.id }}</h3>
            <p class="text-sm text-gray-600">{{ formatDate(order.date) }}</p>
          </div>
          <select
            v-model="order.status"
            @change="updateOrderStatus(order.id, $event.target.value)"
            class="rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
          >
            <option v-for="status in statuses.slice(1)" :key="status.value" :value="status.value">
              {{ status.label }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <h4 class="font-medium mb-2">Client</h4>
          <p>{{ order.customer.name }}</p>
          <p class="text-sm text-gray-600">{{ order.customer.email }}</p>
        </div>

        <div class="space-y-3">
          <div v-for="item in order.items" :key="item.id"
            class="flex justify-between items-center py-2 border-t">
            <div>
              <p class="font-medium">{{ item.name }}</p>
              <p class="text-sm text-gray-600">Quantité: {{ item.quantity }}</p>
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