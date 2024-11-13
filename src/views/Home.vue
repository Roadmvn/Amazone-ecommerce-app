<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <section class="bg-amazone-primary text-white py-16 -mx-6 px-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold mb-4">Bienvenue sur Amazone</h1>
        <p class="text-xl">Découvrez nos meilleures offres</p>
      </div>
    </section>

    <!-- Catégories -->
    <section class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">Catégories populaires</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="category in categories"
          :key="category.id"
          @click="navigateToCategory(category.id)"
          class="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer text-center"
        >
          <span class="text-3xl mb-2 block">{{ category.icon }}</span>
          <h3 class="font-medium">{{ category.name }}</h3>
        </div>
      </div>
    </section>

    <!-- Produits vedettes -->
    <section class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">Produits Vedettes</h2>
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-amazone-accent border-t-transparent"></div>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="product in featuredProducts" :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-2">{{ product.name }}</h3>
            <p class="text-amazone-accent font-bold">{{ formatPrice(product.price) }}</p>
            <button 
              @click="addToCart(product)"
              class="mt-4 w-full bg-amazone-accent hover:bg-amazone-light text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { formatPrice } from '../utils/validation'

const store = useStore()
const router = useRouter()
const toast = useToast()

const loading = ref(true)
const featuredProducts = ref([])

const categories = [
  { id: 'electronics', name: 'Électronique', icon: '📱' },
  { id: 'clothing', name: 'Vêtements', icon: '👕' },
  { id: 'books', name: 'Livres', icon: '📚' },
  { id: 'home', name: 'Maison', icon: '🏠' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'beauty', name: 'Beauté', icon: '💄' }
]

onMounted(async () => {
  try {
    // Simulate loading featured products
    await new Promise(resolve => setTimeout(resolve, 1000))
    featuredProducts.value = [
      {
        id: 1,
        name: 'Smartphone XYZ',
        price: 699.99,
        image: 'https://placehold.co/300x300'
      },
      {
        id: 2,
        name: 'Laptop ABC',
        price: 1299.99,
        image: 'https://placehold.co/300x300'
      },
      {
        id: 3,
        name: 'Tablette 123',
        price: 499.99,
        image: 'https://placehold.co/300x300'
      },
      {
        id: 4,
        name: 'Écouteurs Pro',
        price: 199.99,
        image: 'https://placehold.co/300x300'
      }
    ]
  } finally {
    loading.value = false
  }
})

const navigateToCategory = (categoryId) => {
  router.push({
    path: '/products',
    query: { category: categoryId }
  })
}

const addToCart = (product) => {
  store.dispatch('cart/addToCart', product)
  toast.success('Produit ajouté au panier')
}
</script>