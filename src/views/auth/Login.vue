<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ t('auth.login') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ t('auth.noAccount') }}
          <router-link to="/auth/register" class="font-medium text-amazone-accent hover:text-amazone-light">
            {{ t('auth.register') }}
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">{{ t('auth.email') }}</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amazone-accent focus:border-amazone-accent focus:z-10 sm:text-sm"
              :placeholder="t('auth.email')"
            />
          </div>
          <div>
            <label for="password" class="sr-only">{{ t('auth.password') }}</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amazone-accent focus:border-amazone-accent focus:z-10 sm:text-sm"
              :placeholder="t('auth.password')"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <router-link to="/auth/forgot-password" class="font-medium text-amazone-accent hover:text-amazone-light">
              {{ t('auth.forgotPassword') }}
            </router-link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amazone-accent hover:bg-amazone-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazone-accent"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon v-if="!loading" class="h-5 w-5 text-amazone-light group-hover:text-amazone-accent" />
              <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Chargement...' : t('auth.submit') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import { validateEmail } from '@/utils/validation'

const { t } = useI18n()
const router = useRouter()
const store = useStore()
const toast = useToast()

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  if (!validateEmail(email.value)) {
    toast.error(t('errors.invalidEmail'))
    return
  }

  loading.value = true
  try {
    await store.dispatch('auth/login', {
      email: email.value,
      password: password.value
    })
    router.push('/')
    toast.success('Connexion réussie')
  } catch (error) {
    toast.error(t('errors.serverError'))
  } finally {
    loading.value = false
  }
}
</script>