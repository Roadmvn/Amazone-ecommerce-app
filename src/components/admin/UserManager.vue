<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Gestion des utilisateurs</h2>
      <button
        @click="showForm = !showForm"
        class="bg-amazone-accent hover:bg-amazone-light text-white px-4 py-2 rounded"
      >
        {{ showForm ? 'Annuler' : 'Nouvel utilisateur' }}
      </button>
    </div>

    <!-- Formulaire utilisateur -->
    <div v-if="showForm" class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom</label>
            <input
              v-model="userForm.name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="userForm.email"
              type="email"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Rôle</label>
            <select
              v-model="userForm.role"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-amazone-accent focus:border-amazone-accent"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="resetForm"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-amazone-accent hover:bg-amazone-light text-white rounded-md"
          >
            {{ editingUser ? 'Mettre à jour' : 'Créer' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Liste des utilisateurs -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rôle
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': user.role === 'admin',
                  'bg-gray-100 text-gray-800': user.role === 'user'
                }"
              >
                {{ user.role === 'admin' ? 'Administrateur' : 'Utilisateur' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="editUser(user)"
                class="text-amazone-accent hover:text-amazone-light mr-3"
              >
                Modifier
              </button>
              <button
                @click="deleteUser(user.id)"
                class="text-red-600 hover:text-red-900"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'

const store = useStore()
const toast = useToast()

const users = ref([])
const showForm = ref(false)
const editingUser = ref(null)

const userForm = ref({
  name: '',
  email: '',
  role: 'user'
})

onMounted(async () => {
  await fetchUsers()
})

const fetchUsers = async () => {
  try {
    const response = await store.dispatch('users/fetchUsers')
    users.value = response
  } catch (error) {
    toast.error('Erreur lors du chargement des utilisateurs')
  }
}

const handleSubmit = async () => {
  try {
    if (editingUser.value) {
      await store.dispatch('users/updateUser', {
        id: editingUser.value.id,
        ...userForm.value
      })
      toast.success('Utilisateur mis à jour')
    } else {
      await store.dispatch('users/createUser', userForm.value)
      toast.success('Utilisateur créé')
    }
    resetForm()
    await fetchUsers()
  } catch (error) {
    toast.error('Erreur lors de la sauvegarde')
  }
}

const editUser = (user) => {
  editingUser.value = user
  userForm.value = { ...user }
  showForm.value = true
}

const deleteUser = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return
  
  try {
    await store.dispatch('users/deleteUser', id)
    await fetchUsers()
    toast.success('Utilisateur supprimé')
  } catch (error) {
    toast.error('Erreur lors de la suppression')
  }
}

const resetForm = () => {
  userForm.value = {
    name: '',
    email: '',
    role: 'user'
  }
  editingUser.value = null
  showForm.value = false
}
</script>