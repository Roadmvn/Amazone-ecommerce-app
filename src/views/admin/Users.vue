<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import UserManager from '../../components/admin/UserManager.vue'

const store = useStore()
const toast = useToast()

onMounted(() => {
  if (!store.getters['auth/isAdmin']) {
    router.push('/')
    toast.error('Accès non autorisé')
  }
})
</script>

<template>
  <UserManager />
</template>