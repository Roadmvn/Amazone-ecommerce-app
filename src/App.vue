<template>
  <div class="min-h-screen flex flex-col">
    <Header @toggle-sidebar="toggleSidebar" />
    
    <div class="flex-1 flex">
      <!-- Sidebar avec transition -->
      <div 
        class="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg transition-transform duration-300 ease-in-out z-40 w-64 overflow-y-auto"
        :class="{
          'translate-x-0': isSidebarOpen,
          '-translate-x-full': !isSidebarOpen
        }"
      >
        <Sidebar @close="toggleSidebar" :isOpen="isSidebarOpen" />
      </div>

      <!-- Overlay pour mobile -->
      <div
        v-if="isSidebarOpen"
        @click="toggleSidebar"
        class="fixed inset-0 bg-black bg-opacity-50 z-30"
      ></div>
      
      <!-- Contenu principal -->
      <main 
        class="flex-1 p-6 transition-all duration-300"
        :class="{ 'ml-64': isSidebarOpen }"
      >
        <RouterView />
      </main>
    </div>

    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'
import Sidebar from './components/common/Sidebar.vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>