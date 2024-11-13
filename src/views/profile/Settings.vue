<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { validatePassword } from '../../utils/validation'

const store = useStore()
const toast = useToast()

const loading = ref(false)
const showPassword = ref(false)

const form = ref({
  notifications: {
    email: true,
    sms: false,
    promotions: true
  },
  privacy: {
    shareData: false,
    newsletter: true
  },
  security: {
    twoFactor: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
})

const updateSettings = async () => {
  loading.value = true
  try {
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Paramètres mis à jour')
  } catch (error) {
    toast.error('Erreur lors de la mise à jour')
  } finally {
    loading.value = false
  }
}

const updatePassword = async () => {
  if (!form.value.security.currentPassword || 
      !form.value.security.newPassword || 
      !form.value.security.confirmPassword) {
    toast.error('Tous les champs sont requis')
    return
  }

  if (!validatePassword(form.value.security.newPassword)) {
    toast.error('Le mot de passe doit contenir au moins 8 caractères')
    return
  }

  if (form.value.security.newPassword !== form.value.security.confirmPassword) {
    toast.error('Les mots de passe ne correspondent pas')
    return
  }

  loading.value = true
  try {
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Mot de passe mis à jour')
    form.value.security.currentPassword = ''
    form.value.security.newPassword = ''
    form.value.security.confirmPassword = ''
  } catch (error) {
    toast.error('Erreur lors de la mise à jour du mot de passe')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Paramètres</h2>

    <div class="bg-white rounded-lg shadow divide-y">
      <!-- Notifications -->
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">Notifications</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Notifications par email</p>
              <p class="text-sm text-gray-500">Recevoir des mises à jour par email</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="form.notifications.email"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amazone-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amazone-accent"></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Notifications SMS</p>
              <p class="text-sm text-gray-500">Recevoir des alertes par SMS</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="form.notifications.sms"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amazone-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amazone-accent"></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Offres promotionnelles</p>
              <p class="text-sm text-gray-500">Recevoir des offres spéciales</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="form.notifications.promotions"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amazone-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amazone-accent"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Confidentialité -->
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">Confidentialité</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Partage des données</p>
              <p class="text-sm text-gray-500">Autoriser le partage des données d'utilisation</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="form.privacy.shareData"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amazone-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amazone-accent"></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Newsletter</p>
              <p class="text-sm text-gray-500">S'abonner à notre newsletter</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="form.privacy.newsletter"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amazone-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amazone-accent"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Sécurité -->
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-4">Sécurité</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-6">
            <div>
              <p class="font-medium">Authentification à deux facteurs</p>
              <p class="text-sm text-gray-500">Ajouter une couche de sécurité supplémentaire</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="form.security.twoFactor"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amazone-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amazone-accent"></div>
            </label>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Mot de passe actuel
              </label>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.security.currentPassword"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazone-accent focus:ring focus:ring-amazone-light focus:ring-opacity-50"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Nouveau mot de passe
              </label>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.security.newPassword"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazone-accent focus:ring focus:ring-amazone-light focus:ring-opacity-50"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Confirmer le nouveau mot de passe
              </label>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.security.confirmPassword"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amazone-accent focus:ring focus:ring-amazone-light focus:ring-opacity-50"
              />
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                v-model="showPassword"
                id="showPassword"
                class="rounded border-gray-300 text-amazone-accent focus:ring-amazone-light"
              />
              <label for="showPassword" class="ml-2 text-sm text-gray-600">
                Afficher le mot de passe
              </label>
            </div>

            <button
              @click="updatePassword"
              :disabled="loading"
              class="w-full bg-amazone-accent hover:bg-amazone-light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              {{ loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button
        @click="updateSettings"
        :disabled="loading"
        class="bg-amazone-accent hover:bg-amazone-light text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors"
      >
        {{ loading ? 'Enregistrement...' : 'Enregistrer les modifications' }}
      </button>
    </div>
  </div>
</template>