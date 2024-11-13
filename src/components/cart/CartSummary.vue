<content><script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

const router = useRouter()

const checkout = () => {
  router.push('/checkout')
}
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-xl font-bold mb-4">Récapitulatif</h3>
    
    <div class="space-y-2 mb-4">
      <div class="flex justify-between">
        <span>Sous-total</span>
        <span>{{ total.toFixed(2) }}€</span>
      </div>
      <div class="flex justify-between">
        <span>Livraison</span>
        <span>Gratuite</span>
      </div>
      <div class="flex justify-between font-bold text-lg pt-2 border-t">
        <span>Total</span>
        <span>{{ total.toFixed(2) }}€</span>
      </div>
    </div>

    <button
      @click="checkout"
      class="w-full bg-amazone-accent hover:bg-amazone-light text-white font-bold py-3 px-6 rounded transition-colors"
    >
      Procéder au paiement
    </button>

    <div class="mt-4 text-sm text-gray-600">
      <p>Modes de paiement acceptés :</p>
      <div class="flex space-x-2 mt-2">
        <span class="px-2 py-1 bg-gray-100 rounded">Visa</span>
        <span class="px-2 py-1 bg-gray-100 rounded">Mastercard</span>
        <span class="px-2 py-1 bg-gray-100 rounded">PayPal</span>
      </div>
    </div>
  </div>
</template></content>