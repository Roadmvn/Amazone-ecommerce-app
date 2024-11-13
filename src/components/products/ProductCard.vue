<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
    <div class="relative pb-[100%]">
      <img
        :src="product.image"
        :alt="product.name"
        class="absolute inset-0 w-full h-full object-cover rounded-t-lg"
      />
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2 line-clamp-2">{{ product.name }}</h3>
      
      <div class="flex items-center justify-between mb-2">
        <span class="text-xl font-bold text-amazone-accent">
          {{ formatPrice(product.price) }}
        </span>
        
        <div class="flex items-center">
          <span class="text-yellow-400 mr-1">★</span>
          <span class="text-sm text-gray-600">{{ product.rating }}/5</span>
        </div>
      </div>
      
      <div class="flex items-center justify-between">
        <span class="text-sm" :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
          {{ product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock' }}
        </span>
        
        <button
          class="px-4 py-2 bg-amazone-accent text-white rounded-lg hover:bg-amazone-accent-dark transition-colors duration-300"
          :disabled="product.stock === 0"
        >
          Ajouter
        </button>
      </div>
    </div>
  </div>
</template>