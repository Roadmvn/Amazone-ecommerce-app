<template>
  <nav class="h-full bg-white p-4">
    <div class="space-y-4">
      <router-link
        v-for="category in categories"
        :key="category.id"
        :to="{ path: '/products', query: { category: category.id }}"
        class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        @click="$emit('close')"
      >
        <span class="text-2xl">{{ category.icon }}</span>
        <span class="font-medium">{{ category.name }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])

const categories = [
  { id: 'electronics', name: 'Électronique', icon: '📱' },
  { id: 'clothing', name: 'Vêtements', icon: '👕' },
  { id: 'books', name: 'Livres', icon: '📚' },
  { id: 'home', name: 'Maison', icon: '🏠' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'beauty', name: 'Beauté', icon: '💄' }
]
</script>