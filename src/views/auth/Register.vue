<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

const store = useStore()
const router = useRouter()
const toast = useToast()
const { t } = useI18n()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    toast.error(t('errors.required'))
    return
  }

  if (password.value !== confirmPassword.value) {
    toast.error(t('errors.passwordMismatch'))
    return
  }

  loading.value = true
  try {
    await store.dispatch('auth/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    router.push('/')
    toast.success('Inscription réussie')
  } catch (error) {
    toast.error(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[600px] flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">{{ t('auth.register') }}</h1>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">
            {{ t('auth.name') }}
          </label>
          <input
            type="text"
            v-model="name"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazone-accent focus:ring focus:ring-amazone-light focus:ring-opacity-50"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            {{ t('auth.email') }}
          </label>
          <input
            type="email"
            v-model="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazone-accent focus:ring focus:ring-amazone-light focus:ring-opacity-50"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            {{ t('auth.password') }}
          </label>
          <input
            type="password"
            v-model="password"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazone-accent focus:ring focus:ring-amazone-light focus:ring-opacity-50"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            {{ t('auth.confirmPassword') }}
          </label>
          <input
            type="password"
            v-model="confirmPassword"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazone-accent focus:ring focus:ring-amazone-light focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-amazone-accent hover:bg-amazone-light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
        >
          {{ loading ? 'Chargement...' : t('auth.submit') }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link
          to="/auth/login"
          class="text-sm text-amazone-accent hover:text-amazone-light"
        >
          {{ t('auth.hasAccount') }}
        </router-link>
      </div>
    </div>
  </div>
</template>