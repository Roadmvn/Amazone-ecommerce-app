<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const store = useStore()
const router = useRouter()
const toast = useToast()

const activeTab = ref('overview')
const loading = ref(true)

const stats = ref({
  totalSales: 0,
  totalOrders: 0,
  totalCustomers: 0,
  totalProducts: 0
})

const recentOrders = ref([])
const topProducts = ref([])

onMounted(async () => {
  if (!store.getters['auth/isAdmin']) {
    router.push('/')
    toast.error('Accès non autorisé')
    return
  }

  try {
    // Simulate API calls
    await Promise.all([
      fetchStats(),
      fetchRecentOrders(),
      fetchTopProducts()
    ])
  } catch (error) {
    toast.error('Erreur lors du chargement des données')
  } finally {
    loading.value = false
  }
})

const fetchStats = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  stats.value = {
    totalSales: 15789.99,
    totalOrders: 127,
    totalCustomers: 89,
    totalProducts: 234
  }
}

const fetchRecentOrders = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  recentOrders.value = [
    {
      id: 1,
      customer: 'Jean Dupont',
      date: '2024-03-20',
      total: 299.99,
      status: 'completed'
    },
    {
      id: 2,
      customer: 'Marie Martin',
      date: '2024-03-19',
      total: 159.99,
      status: 'pending'
    }
  ]
}

const fetchTopProducts = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  topProducts.value = [
    {
      id: 1,
      name: 'Smartphone XYZ',
      sales: 45,
      revenue: 31495.55
    },
    {
      id: 2,
      name: 'Laptop ABC',
      sales: 28,
      revenue: 36399.72
    }
  ]
}
</script>

<template>
  <div class="space-y-6">
    <header class="bg-white shadow">
      <div class="px-6 py-4">
        <h1 class="text-2xl font-bold">Tableau de bord administrateur</h1>
      </div>
    </header>

    <div class="container mx-auto px-4">
      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 text-sm font-medium">Ventes totales</h3>
          <p class="text-2xl font-bold text-amazone-accent">{{ stats.totalSales.toLocaleString() }}€</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 text-sm font-medium">Commandes</h3>
          <p class="text-2xl font-bold text-amazone-accent">{{ stats.totalOrders }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 text-sm font-medium">Clients</h3>
          <p class="text-2xl font-bold text-amazone-accent">{{ stats.totalCustomers }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 text-sm font-medium">Produits</h3>
          <p class="text-2xl font-bold text-amazone-accent">{{ stats.totalProducts }}</p>
        </div>
      </div>

      <!-- Navigation -->
      <div class="bg-white shadow rounded-lg mb-8">
        <nav class="flex space-x-4 p-4">
          <button
            v-for="tab in ['overview', 'orders', 'products', 'customers']"
            :key="tab"
            @click="activeTab = tab"
            class="px-4 py-2 rounded-md"
            :class="{
              'bg-amazone-accent text-white': activeTab === tab,
              'text-gray-600 hover:bg-gray-100': activeTab !== tab
            }"
          >
            {{ {
              overview: 'Aperçu',
              orders: 'Commandes',
              products: 'Produits',
              customers: 'Clients'
            }[tab] }}
          </button>
        </nav>
      </div>

      <!-- Contenu principal -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-amazone-accent border-t-transparent"></div>
      </div>

      <div v-else>
        <!-- Aperçu -->
        <div v-if="activeTab === 'overview'" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Commandes récentes -->
          <div class="bg-white rounded-lg shadow">
            <div class="p-6">
              <h2 class="text-lg font-semibold mb-4">Commandes récentes</h2>
              <div class="space-y-4">
                <div v-for="order in recentOrders" :key="order.id"
                  class="flex justify-between items-center p-4 border rounded hover:bg-gray-50">
                  <div>
                    <p class="font-medium">{{ order.customer }}</p>
                    <p class="text-sm text-gray-500">{{ order.date }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold">{{ order.total }}€</p>
                    <span class="text-sm px-2 py-1 rounded"
                      :class="{
                        'bg-green-100 text-green-800': order.status === 'completed',
                        'bg-yellow-100 text-yellow-800': order.status === 'pending'
                      }"
                    >
                      {{ order.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Produits populaires -->
          <div class="bg-white rounded-lg shadow">
            <div class="p-6">
              <h2 class="text-lg font-semibold mb-4">Produits populaires</h2>
              <div class="space-y-4">
                <div v-for="product in topProducts" :key="product.id"
                  class="flex justify-between items-center p-4 border rounded hover:bg-gray-50">
                  <div>
                    <p class="font-medium">{{ product.name }}</p>
                    <p class="text-sm text-gray-500">{{ product.sales }} ventes</p>
                  </div>
                  <p class="font-bold">{{ product.revenue }}€</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Autres onglets -->
        <div v-else class="bg-white rounded-lg shadow p-6">
          <p class="text-center text-gray-500">
            Contenu de l'onglet "{{ activeTab }}" à implémenter
          </p>
        </div>
      </div>
    </div>
  </div>
</template>