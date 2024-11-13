<content><script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'

const store = useStore()
const toast = useToast()

const loading = ref(true)
const selectedPeriod = ref('month')
const selectedReport = ref('sales')

const salesData = ref({
  total: 0,
  items: []
})

const periods = [
  { id: 'day', label: 'Aujourd\'hui' },
  { id: 'week', label: 'Cette semaine' },
  { id: 'month', label: 'Ce mois' },
  { id: 'year', label: 'Cette année' }
]

const reports = [
  { id: 'sales', label: 'Ventes' },
  { id: 'products', label: 'Produits' },
  { id: 'customers', label: 'Clients' }
]

onMounted(async () => {
  try {
    await fetchReportData()
  } catch (error) {
    toast.error('Erreur lors du chargement des données')
  } finally {
    loading.value = false
  }
})

const fetchReportData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  salesData.value = {
    total: 15789.99,
    items: [
      { date: '2024-03-20', amount: 1299.99, orders: 5 },
      { date: '2024-03-19', amount: 2499.99, orders: 8 },
      { date: '2024-03-18', amount: 1999.99, orders: 6 }
    ]
  }
}

const downloadReport = async () => {
  try {
    toast.info('Génération du rapport en cours...')
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.success('Rapport téléchargé')
  } catch (error) {
    toast.error('Erreur lors du téléchargement')
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Rapports</h2>
      <div class="flex space-x-4">
        <select
          v-model="selectedPeriod"
          class="rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
        >
          <option v-for="period in periods" :key="period.id" :value="period.id">
            {{ period.label }}
          </option>
        </select>
        <select
          v-model="selectedReport"
          class="rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
        >
          <option v-for="report in reports" :key="report.id" :value="report.id">
            {{ report.label }}
          </option>
        </select>
        <button
          @click="downloadReport"
          class="bg-amazone-accent hover:bg-amazone-light text-white px-4 py-2 rounded"
        >
          Télécharger
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-amazone-accent border-t-transparent"></div>
    </div>

    <template v-else>
      <!-- Statistiques générales -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2">Chiffre d'affaires</h3>
          <p class="text-3xl font-bold text-amazone-accent">
            {{ salesData.total.toLocaleString() }}€
          </p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2">Commandes</h3>
          <p class="text-3xl font-bold text-amazone-accent">
            {{ salesData.items.reduce((acc, item) => acc + item.orders, 0) }}
          </p>
        </div>
        <div class="bg-div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-2">Panier moyen</h3>
          <p class="text-3xl font-bold text-amazone-accent">
            {{ (salesData.total / salesData.items.reduce((acc, item) => acc + item.orders, 0)).toFixed(2) }}€
          </p>
        </div>
      </div>

      <!-- Tableau détaillé -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commandes
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Panier moyen
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in salesData.items" :key="item.date">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ item.date }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ item.orders }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ item.amount.toLocaleString() }}€</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ (item.amount / item.orders).toFixed(2) }}€
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template></content>