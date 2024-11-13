<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const store = useStore()
const router = useRouter()
const toast = useToast()

const cartItems = computed(() => store.state.cart.items)
const total = computed(() => store.getters['cart/cartTotal'])

const updateQuantity = (productId, quantity) => {
  if (quantity < 1) {
    removeItem(productId)
    return
  }
  store.commit('cart/UPDATE_QUANTITY', { productId, quantity })
}

const removeItem = (productId) => {
  store.commit('cart/REMOVE_FROM_CART', productId)
  toast.success('Produit retiré du panier')
}

const checkout = () => {
  if (!store.state.auth.isAuthenticated) {
    router.push('/auth/login')
    toast.info('Veuillez vous connecter pour continuer')
    return
  }
  router.push('/checkout')
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Mon Panier</h1>

    <div v-if="cartItems.length === 0" class="text-center py-12">
      <p class="text-gray-500 mb-4">Votre panier est vide</p>
      <router-link
        to="/products"
        class="inline-block bg-amazone-accent hover:bg-amazone-light text-white font-bold py-2 px-6 rounded transition-colors"
      >
        Continuer mes achats
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-4">
        <div v-for="item in cartItems" :key="item.id"
          class="bg-white rounded-lg shadow p-4 flex items-center gap-4">
          <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded" />
          
          <div class="flex-grow">
            <h3 class="font-semibold">{{ item.name }}</h3>
            <p class="text-amazone-accent font-bold">{{ item.price }}€</p>
          </div>

          <div class="flex items-center gap-4">
            <input
              type="number"
              v-model="item.quantity"
              min="1"
              @change="updateQuantity(item.id, item.quantity)"
              class="w-20 p-2 border rounded"
            />
            <button
              @click="removeItem(item.id)"
              class="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6 h-fit">
        <h3 class="text-xl font-bold mb-4">Récapitulatif</h3>
        <div class="space-y-2 mb-4">
          <div class="flex justify-between">
            <span>Sous-total</span>
            <span>{{ total }}€</span>
          </div>
          <div class="flex justify-between">
            <span>Livraison</span>
            <span>Gratuite</span>
          </div>
          <div class="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>{{ total }}€</span>
          </div>
        </div>
        <button
          @click="checkout"
          class="w-full bg-amazone-accent hover:bg-amazone-light text-white font-bold py-3 px-6 rounded transition-colors"
        >
          Procéder au paiement
        </button>
      </div>
    </div>
  </div>
</template>