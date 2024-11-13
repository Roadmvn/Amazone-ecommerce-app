<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { formatDate, formatPrice } from '../../utils/validation'

const store = useStore()
const toast = useToast()
const loading = ref(true)
const invoices = ref([])

onMounted(async () => {
  try {
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    invoices.value = [
      {
        id: 'INV-2024-001',
        orderId: '1',
        date: '2024-03-20',
        total: 699.99,
        status: 'paid'
      },
      {
        id: 'INV-2024-002',
        orderId: '2',
        date: '2024-03-19',
        total: 1299.99,
        status: 'pending'
      }
    ]
  } catch (error) {
    toast.error('Erreur lors du chargement des factures')
  } finally {
    loading.value = false
  }
})

const downloadInvoice = async (invoiceId) => {
  try {
    toast.info('Téléchargement en cours...')
    // Simuler le téléchargement
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Facture téléchargée')
  } catch (error) {
    toast.error('Erreur lors du téléchargement')
  }
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Mes Factures</h2>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-amazone-accent border-t-transparent"></div>
    </div>

    <div v-else-if="invoices.length === 0" class="text-center py-12">
      <p class="text-gray-500">Vous n'avez pas encore de facture</p>
    </div>

    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Numéro
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Montant
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="invoice in invoices" :key="invoice.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ invoice.id }}</div>
              <div class="text-sm text-gray-500">Commande #{{ invoice.orderId }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatDate(invoice.date) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">
                {{ formatPrice(invoice.total) }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': invoice.status === 'paid',
                  'bg-yellow-100 text-yellow-800': invoice.status === 'pending'
                }"
              >
                {{ invoice.status === 'paid' ? 'Payée' : 'En attente' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="downloadInvoice(invoice.id)"
                class="text-amazone-accent hover:text-amazone-light"
              >
                Télécharger
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>