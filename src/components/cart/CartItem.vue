<content><script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:quantity', 'remove'])

const updateQuantity = (event) => {
  const quantity = parseInt(event.target.value)
  if (quantity > 0) {
    emit('update:quantity', quantity)
  }
}

const removeItem = () => {
  emit('remove')
}
</script>

<template>
  <div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
    <img
      :src="item.image"
      :alt="item.name"
      class="w-24 h-24 object-cover rounded"
    />
    
    <div class="flex-grow">
      <h3 class="font-semibold">{{ item.name }}</h3>
      <p class="text-amazone-accent font-bold">{{ item.price }}€</p>
    </div>

    <div class="flex items-center gap-4">
      <input
        type="number"
        :value="item.quantity"
        min="1"
        @change="updateQuantity"
        class="w-20 p-2 border rounded focus:ring-2 focus:ring-amazone-accent"
      />
      <button
        @click="removeItem"
        class="text-red-500 hover:text-red-700"
      >
        Supprimer
      </button>
    </div>
  </div>
</template></content>