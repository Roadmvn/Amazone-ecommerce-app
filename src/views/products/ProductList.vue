<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import ProductCard from '../../components/products/ProductCard.vue'

const store = useStore()
const router = useRouter()
const toast = useToast()

const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('default')
const isAuthenticated = computed(() => store.state.auth.isAuthenticated)

const products = ref([
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: 699.99,
    image: '/images/products/smartphone.jpg',
    category: 'electronics',
    rating: 4.5,
    stock: 15
  },
  {
    id: 2,
    name: 'Laptop Pro',
    price: 1299.99,
    image: '/images/products/laptop.jpg',
    category: 'electronics',
    rating: 4.8,
    stock: 8
  }
])

const categories = [
  { id: 'all', name: 'Toutes les catégories' },
  { id: 'electronics', name: 'Électronique' },
  { id: 'clothing', name: 'Vêtements' },
  { id: 'books', name: 'Livres' },
  { id: 'home', name: 'Maison' }
]

const sortOptions = [
  { id: 'default', name: 'Pertinence' },
  { id: 'price-asc', name: 'Prix croissant' },
  { id: 'price-desc', name: 'Prix décroissant' },
  { id: 'rating', name: 'Meilleures notes' }
]

// Computed properties
const filteredProducts = computed(() => {
  let result = [...products.value]

  // Filter by category
  if (selectedCategory.value !== 'all') {
    result = result.filter(product => product.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  }

  // Sort products
  switch (sortBy.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
  }

  return result
})

onMounted(async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    loading.value = false
  } catch (error) {
    toast.error('Erreur lors du chargement des produits')
  }
})

const handleProductClick = (productId) => {
  router.push(`/product/${productId}`)
}

const addToCart = (product) => {
  if (!isAuthenticated.value) {
    toast.info('Veuillez vous connecter ou créer un compte pour ajouter des produits au panier')
    router.push('/auth/login')
    return
  }
  store.dispatch('cart/addToCart', product)
  toast.success('Produit ajouté au panier')
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Filtres et recherche -->
    <div class="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
      <div class="flex-1 max-w-xl">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher des produits..."
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amazone-accent focus:border-transparent"
        />
      </div>

      <div class="flex space-x-4">
        <select
          v-model="selectedCategory"
          class="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amazone-accent focus:border-transparent"
        >
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>

        <select
          v-model="sortBy"
          class="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amazone-accent focus:border-transparent"
        >
          <option v-for="option in sortOptions" :key="option.id" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-amazone-accent border-t-transparent"></div>
    </div>

    <!-- Product grid -->
    <div v-else-if="filteredProducts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="product in filteredProducts" :key="product.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-48 object-cover rounded-t-lg cursor-pointer"
          @click="handleProductClick(product.id)"
        />
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-2 cursor-pointer" @click="handleProductClick(product.id)">
            {{ product.name }}
          </h3>
          <p class="text-amazone-accent font-bold">{{ product.price }}€</p>
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center">
              <span class="text-yellow-400 mr-1">★</span>
              <span class="text-sm text-gray-600">{{ product.rating }}/5</span>
            </div>
            <button
              @click="addToCart(product)"
              class="bg-amazone-accent hover:bg-amazone-light text-white px-4 py-2 rounded transition-colors"
              :disabled="product.stock === 0"
            >
              {{ product.stock > 0 ? 'Ajouter' : 'Rupture' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-12">
      <p class="text-gray-500 text-lg">Aucun produit ne correspond à votre recherche</p>
    </div>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}
</style>