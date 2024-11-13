<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const store = useStore()
const toast = useToast()

const product = ref(null)
const loading = ref(true)
const quantity = ref(1)
const isAuthenticated = computed(() => store.state.auth.isAuthenticated)

onMounted(async () => {
  try {
    await store.dispatch('products/fetchProducts')
    product.value = store.getters['products/getProductById'](parseInt(route.params.id))
    if (!product.value) {
      router.push('/products')
      toast.error('Produit non trouvé')
    }
  } catch (error) {
    toast.error('Erreur lors du chargement du produit')
  } finally {
    loading.value = false
  }
})

const addToCart = () => {
  if (!isAuthenticated.value) {
    toast.info('Veuillez vous connecter ou créer un compte pour ajouter des produits au panier')
    router.push('/auth/login')
    return
  }

  if (quantity.value < 1) {
    toast.error('La quantité doit être supérieure à 0')
    return
  }
  
  const productToAdd = {
    ...product.value,
    quantity: quantity.value
  }
  
  store.commit('cart/ADD_TO_CART', productToAdd)
  toast.success('Produit ajouté au panier')
}
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center h-64">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-amazone-accent border-t-transparent"></div>
  </div>

  <div v-else-if="product" class="bg-white rounded-lg shadow-lg p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img :src="product.image" :alt="product.name" class="w-full rounded-lg" />
      </div>

      <div class="space-y-6">
        <h1 class="text-3xl font-bold">{{ product.name }}</h1>
        <p class="text-gray-600">{{ product.description }}</p>
        <p class="text-2xl font-bold text-amazone-accent">{{ product.price }}€</p>

        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <label class="font-medium">Quantité:</label>
            <input
              v-model="quantity"
              type="number"
              min="1"
              class="w-20 p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
            />
          </div>

          <button
            @click="addToCart"
            class="w-full bg-amazone-accent hover:bg-amazone-light text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Ajouter au panier
          </button>
        </div>

        <div class="border-t pt-6 mt-6">
          <h3 class="font-bold mb-4">Caractéristiques du produit</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>Garantie 2 ans</li>
            <li>Livraison gratuite</li>
            <li>Retour sous 30 jours</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>