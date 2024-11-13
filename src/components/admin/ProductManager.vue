<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Gestion des produits</h2>
      <button
        @click="showForm = !showForm"
        class="bg-amazone-accent hover:bg-amazone-light text-white px-4 py-2 rounded"
      >
        {{ showForm ? 'Annuler' : 'Nouveau produit' }}
      </button>
    </div>

    <!-- Formulaire de produit -->
    <div v-if="showForm" class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom</label>
            <input
              v-model="productForm.name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Prix</label>
            <input
              v-model.number="productForm.price"
              type="number"
              step="0.01"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Stock</label>
            <input
              v-model.number="productForm.stock"
              type="number"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Catégorie</label>
            <select
              v-model="productForm.category"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="electronics">Électronique</option>
              <option value="clothing">Vêtements</option>
              <option value="books">Livres</option>
              <option value="home">Maison</option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="productForm.description"
              rows="3"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
            ></textarea>
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="resetForm"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-amazone-accent hover:bg-amazone-light text-white rounded-md"
          >
            {{ editingProduct ? 'Mettre à jour' : 'Créer' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Liste des produits -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produit
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prix
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Catégorie
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in products" :key="product.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ product.name }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ formatPrice(product.price) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ product.stock }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ product.category }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="editProduct(product)"
                class="text-amazone-accent hover:text-amazone-light mr-3"
              >
                Modifier
              </button>
              <button
                @click="deleteProduct(product.id)"
                class="text-red-600 hover:text-red-900"
              >
                Supprimer
              </button>
            </td>
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
import { formatPrice } from '@/utils/validation'

const store = useStore()
const toast = useToast()

const products = ref([])
const showForm = ref(false)
const editingProduct = ref(null)

const productForm = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: ''
})

onMounted(async () => {
  await fetchProducts()
})

const fetchProducts = async () => {
  try {
    const response = await store.dispatch('products/fetchProducts')
    products.value = response
  } catch (error) {
    toast.error('Erreur lors du chargement des produits')
  }
}

const handleSubmit = async () => {
  try {
    if (editingProduct.value) {
      await store.dispatch('products/updateProduct', {
        id: editingProduct.value.id,
        ...productForm.value
      })
      toast.success('Produit mis à jour')
    } else {
      await store.dispatch('products/createProduct', productForm.value)
      toast.success('Produit créé')
    }
    resetForm()
    await fetchProducts()
  } catch (error) {
    toast.error('Erreur lors de la sauvegarde')
  }
}

const editProduct = (product) => {
  editingProduct.value = product
  productForm.value = { ...product }
  showForm.value = true
}

const deleteProduct = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return
  
  try {
    await store.dispatch('products/deleteProduct', id)
    await fetchProducts()
    toast.success('Produit supprimé')
  } catch (error) {
    toast.error('Erreur lors de la suppression')
  }
}

const resetForm = () => {
  productForm.value = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: ''
  }
  editingProduct.value = null
  showForm.value = false
}
</script>