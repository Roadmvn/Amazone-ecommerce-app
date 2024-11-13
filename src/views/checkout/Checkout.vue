<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const store = useStore()
const router = useRouter()
const toast = useToast()

const cartItems = computed(() => store.state.cart.items)
const total = computed(() => store.getters['cart/cartTotal'])
const loading = ref(false)

const shippingForm = ref({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: '',
  phone: ''
})

const paymentForm = ref({
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: ''
})

const validateForms = () => {
  if (!shippingForm.value.firstName || !shippingForm.value.lastName || 
      !shippingForm.value.address || !shippingForm.value.city || 
      !shippingForm.value.postalCode || !shippingForm.value.phone) {
    toast.error('Veuillez remplir tous les champs de livraison')
    return false
  }

  if (!paymentForm.value.cardNumber || !paymentForm.value.cardName || 
      !paymentForm.value.expiryDate || !paymentForm.value.cvv) {
    toast.error('Veuillez remplir tous les champs de paiement')
    return false
  }

  return true
}

const handleSubmit = async () => {
  if (!validateForms()) return

  loading.value = true
  try {
    const orderData = {
      items: cartItems.value,
      total: total.value,
      shipping: shippingForm.value,
      payment: {
        last4: paymentForm.value.cardNumber.slice(-4)
      }
    }

    await store.dispatch('orders/createOrder', orderData)
    store.commit('cart/CLEAR_CART')
    router.push('/profile/orders')
    toast.success('Commande effectuée avec succès')
  } catch (error) {
    toast.error('Erreur lors du traitement de la commande')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <h1 class="text-2xl font-bold">Paiement</h1>

    <div v-if="cartItems.length === 0" class="text-center py-12">
      <p class="text-gray-500 mb-4">Votre panier est vide</p>
      <router-link
        to="/products"
        class="inline-block bg-amazone-accent hover:bg-amazone-light text-white font-bold py-2 px-6 rounded transition-colors"
      >
        Retour aux produits
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Formulaire principal -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Adresse de livraison -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Adresse de livraison</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                v-model="shippingForm.firstName"
                type="text"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                v-model="shippingForm.lastName"
                type="text"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <input
                v-model="shippingForm.address"
                type="text"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Ville
              </label>
              <input
                v-model="shippingForm.city"
                type="text"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Code postal
              </label>
              <input
                v-model="shippingForm.postalCode"
                type="text"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                v-model="shippingForm.phone"
                type="tel"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
          </div>
        </div>

        <!-- Informations de paiement -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Paiement</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Numéro de carte
              </label>
              <input
                v-model="paymentForm.cardNumber"
                type="text"
                maxlength="16"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nom sur la carte
              </label>
              <input
                v-model="paymentForm.cardName"
                type="text"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Date d'expiration
                </label>
                <input
                  v-model="paymentForm.expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  maxlength="5"
                  class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  v-model="paymentForm.cvv"
                  type="text"
                  maxlength="3"
                  class="w-full p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Récapitulatif de la commande -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow p-6 sticky top-4">
          <h2 class="text-xl font-semibold mb-4">Récapitulatif</h2>
          <div class="space-y-4">
            <div v-for="item in cartItems" :key="item.id" class="flex justify-between">
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span>{{ (item.price * item.quantity).toFixed(2) }}€</span>
            </div>
            <div class="border-t pt-4">
              <div class="flex justify-between font-semibold">
                <span>Sous-total</span>
                <span>{{ total.toFixed(2) }}€</span>
              </div>
              <div class="flex justify-between text-sm text-gray-600">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div class="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                <span>Total</span>
                <span>{{ total.toFixed(2) }}€</span>
              </div>
            </div>
            <button
              @click="handleSubmit"
              :disabled="loading"
              class="w-full bg-amazone-accent hover:bg-amazone-light text-white font-bold py-3 px-6 rounded transition-colors disabled:opacity-50"
            >
              {{ loading ? 'Traitement...' : 'Confirmer la commande' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>