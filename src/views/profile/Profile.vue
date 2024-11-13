<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const store = useStore()
const router = useRouter()
const toast = useToast()

const user = computed(() => store.state.auth.user)
const orders = computed(() => store.state.orders.orders)
const loading = ref(true)

const profileForm = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

onMounted(async () => {
  if (!store.state.auth.isAuthenticated) {
    router.push('/auth/login')
    return
  }

  profileForm.value = {
    name: user.value.name,
    email: user.value.email,
    phone: user.value.phone || '',
    address: user.value.address || ''
  }

  try {
    await store.dispatch('orders/fetchOrders')
  } catch (error) {
    toast.error('Erreur lors du chargement des commandes')
  } finally {
    loading.value = false
  }
})

const updateProfile = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Profil mis à jour avec succès')
  } catch (error) {
    toast.error('Erreur lors de la mise à jour du profil')
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <h1 class="text-2xl font-bold">Mon Profil</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Menu latéral -->
      <div class="space-y-4">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="space-y-4">
            <h2 class="font-semibold text-lg">{{ user.name }}</h2>
            <p class="text-gray-600">{{ user.email }}</p>
            <hr />
            <nav class="space-y-2">
              <a href="#profile" class="block text-amazone-accent hover:text-amazone-light">
                Informations personnelles
              </a>
              <a href="#orders" class="block text-amazone-accent hover:text-amazone-light">
                Mes commandes
              </a>
              <a href="#security" class="block text-amazone-accent hover:text-amazone-light">
                Sécurité
              </a>
            </nav>
          </div>
        </div>
      </div>

      <!-- Contenu principal -->
      <div class="md:col-span-2 space-y-6">
        <!-- Informations personnelles -->
        <div id="profile" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Informations personnelles</h2>
          <form @submit.prevent="updateProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                v-model="profileForm.name"
                type="text"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                v-model="profileForm.email"
                type="email"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                v-model="profileForm.phone"
                type="tel"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <textarea
                v-model="profileForm.address"
                rows="3"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              ></textarea>
            </div>
            <button
              type="submit"
              class="bg-amazone-accent hover:bg-amazone-light text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Mettre à jour
            </button>
          </form>
        </div>

        <!-- Commandes récentes -->
        <div id="orders" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Commandes récentes</h2>
          <div v-if="loading" class="flex justify-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-4 border-amazone-accent border-t-transparent"></div>
          </div>
          <div v-else-if="orders.length === 0" class="text-center py-4 text-gray-500">
            Aucune commande
          </div>
          <div v-else class="space-y-4">
            <div v-for="order in orders" :key="order.id"
              class="border rounded p-4 hover:shadow-md transition-shadow">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-semibold">Commande #{{ order.id }}</p>
                  <p class="text-sm text-gray-600">{{ order.date }}</p>
                </div>
                <span class="px-2 py-1 text-sm rounded"
                  :class="{
                    'bg-green-100 text-green-800': order.status === 'completed',
                    'bg-yellow-100 text-yellow-800': order.status === 'pending',
                    'bg-red-100 text-red-800': order.status === 'cancelled'
                  }"
                >
                  {{ order.status }}
                </span>
              </div>
              <div class="mt-2">
                <p class="text-gray-600">{{ order.items.length }} article(s)</p>
                <p class="font-semibold">Total: {{ order.total }}€</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sécurité -->
        <div id="security" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Sécurité</h2>
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Ancien mot de passe
              </label>
              <input
                type="password"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <button
              type="submit"
              class="bg-amazone-accent hover:bg-amazone-light text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Changer le mot de passe
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>