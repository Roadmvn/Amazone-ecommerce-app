<template>
  <header class="bg-amazone-primary sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex items-center justify-between h-16">
        <!-- Menu burger et logo -->
        <div class="flex items-center">
          <button 
            @click="$emit('toggle-sidebar')"
            class="text-white p-2 hover:bg-amazone-light rounded-lg transition-colors mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <router-link to="/" class="flex items-center">
            <span class="text-2xl font-bold text-white">Amazone</span>
          </router-link>
        </div>

        <!-- Barre de recherche -->
        <div class="flex-1 max-w-2xl mx-8 hidden md:block">
          <div class="relative">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              class="w-full pl-10 pr-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-amazone-accent"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <router-link
            to="/cart"
            class="relative p-2 text-white hover:text-amazone-light transition-colors"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartItemsCount > 0"
              class="absolute -top-1 -right-1 bg-amazone-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartItemsCount }}
            </span>
          </router-link>

          <template v-if="!isAuthenticated">
            <router-link
              to="/auth/login"
              class="text-white hover:text-amazone-light transition-colors"
            >
              Connexion
            </router-link>
            <router-link
              to="/auth/register"
              class="bg-amazone-accent hover:bg-amazone-light text-white px-4 py-2 rounded-lg transition-colors"
            >
              Inscription
            </router-link>
          </template>

          <div v-else class="relative" @click="showUserMenu = !showUserMenu">
            <button class="flex items-center text-white hover:text-amazone-light transition-colors">
              <span class="mr-2">{{ user?.name }}</span>
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Menu utilisateur -->
            <div v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
            >
              <router-link
                to="/profile"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                @click="showUserMenu = false"
              >
                Mon profil
              </router-link>
              <router-link
                to="/profile/orders"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                @click="showUserMenu = false"
              >
                Mes commandes
              </router-link>
              <template v-if="isAdmin">
                <div class="border-t border-gray-100 my-1"></div>
                <router-link
                  to="/admin"
                  class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  @click="showUserMenu = false"
                >
                  Administration
                </router-link>
              </template>
              <div class="border-t border-gray-100 my-1"></div>
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu mobile -->
      <div class="md:hidden py-2">
        <div class="relative">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            class="w-full pl-10 pr-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-amazone-accent"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const store = useStore()
const router = useRouter()
const toast = useToast()

const showUserMenu = ref(false)

const isAuthenticated = computed(() => store.state.auth.isAuthenticated)
const isAdmin = computed(() => store.state.auth.user?.role === 'admin')
const user = computed(() => store.state.auth.user)
const cartItemsCount = computed(() => store.state.cart.items.length)

const handleLogout = async () => {
  try {
    await store.dispatch('auth/logout')
    showUserMenu.value = false
    router.push('/auth/login')
    toast.success('Déconnexion réussie')
  } catch (error) {
    toast.error('Erreur lors de la déconnexion')
  }
}
</script>