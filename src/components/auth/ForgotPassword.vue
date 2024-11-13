<template>
  <div class="min-h-[600px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-2">
          Mot de passe oublié
        </h2>
        <p class="text-center text-gray-600">
          Entrez votre adresse e-mail pour recevoir les instructions de réinitialisation
        </p>
      </div>

      <div v-if="sent" class="bg-green-50 border border-green-200 rounded-lg p-4">
        <p class="text-green-800 text-center">
          Si un compte existe avec cette adresse email, vous recevrez les instructions
          pour réinitialiser votre mot de passe.
        </p>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Adresse e-mail
          </label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-amazone-accent focus:border-amazone-accent focus:z-10 sm:text-sm"
            placeholder="exemple@email.com"
          />
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amazone-accent hover:bg-amazone-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazone-accent transition-colors"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Envoi en cours...' : 'Envoyer les instructions' }}
          </button>
        </div>
      </form>

      <div class="text-center">
        <router-link
          to="/auth/login"
          class="text-sm text-amazone-accent hover:text-amazone-light transition-colors"
        >
          Retour à la connexion
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

const toast = useToast()
const { t } = useI18n()

const email = ref('')
const loading = ref(false)
const sent = ref(false)

const handleSubmit = async () => {
  if (!email.value) {
    toast.error(t('errors.required'))
    return
  }

  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    sent.value = true
    toast.success('Instructions envoyées par email')
  } catch (error) {
    toast.error('Erreur lors de l\'envoi des instructions')
  } finally {
    loading.value = false
  }
}
</script>