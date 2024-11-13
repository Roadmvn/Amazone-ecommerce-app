<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Rapports</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- KPIs -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Ventes totales</h3>
        <p class="text-3xl font-bold text-amazone-accent">{{ totalSales }}€</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Commandes</h3>
        <p class="text-3xl font-bold text-amazone-accent">{{ totalOrders }}</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Clients</h3>
        <p class="text-3xl font-bold text-amazone-accent">{{ totalCustomers }}</p>
      </div>
    </div>

    <!-- Filtres -->
    <div class="flex gap-4 mb-6">
      <select
        v-model="period"
        class="rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
      >
        <option value="day">Aujourd'hui</option>
        <option value="week">Cette semaine</option>
        <option value="month">Ce mois</option>
        <option value="year">Cette année</option>
      </select>

      <select
        v-model="reportType"
        class="rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
      >
        <option value="sales">Ventes</option>
        <option value="orders">Commandes</option>
        <option value="customers">Clients</option>
      </select>

      <button
        @click="generateReport"
        class="bg-amazone-accent hover:bg-amazone-light text-white px-4 py-2 rounded"
      >
        Générer le rapport
      </button>
    </div>

    <!-- Tableau des données -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ventes
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Commandes
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clients
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in reportData" :key="item.date">
            <td class="px-6 py-4 whitespace-nowrap">{{ item.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.sales }}€</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.orders }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ item.customers }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'

const store = useStore()
const toast = useToast()

const period = ref('month')
const reportType = ref('sales')
const totalSales = ref(0)
const totalOrders = ref(0)
const totalCustomers = ref(0)
const reportData = ref([])

onMounted(async () => {
  if (!store.getters['auth/isAdmin']) {
    router.push('/')
    toast.error('Accès non autorisé')
    return
  }

  await loadData()
})

const loadData = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    totalSales.value = 157899.99
    totalOrders.value = 1234
    totalCustomers.value = 567
    
    reportData.value = [
      {
        date: '2024-03-20',
        sales: 5789.99,
        orders: 45,
        customers: 23
      },
      {
        date: '2024-03-19',
        sales: 4567.99,
        orders: 38,
        customers: 19
      }
    ]
  } catch (error) {
    toast.error('Erreur lors du chargement des données')
  }
}

const generateReport = async () => {
  try {
    toast.info('Génération du rapport en cours...')
    await loadData()
    toast.success('Rapport généré avec succès')
  } catch (error) {
    toast.error('Erreur lors de la génération du rapport')
  }
}
</script>