<template>
  <footer class="bg-amazone-primary text-white mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="font-bold text-lg mb-4">À propos</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/about" class="hover:text-amazone-light">
                Qui sommes-nous
              </router-link>
            </li>
            <li>
              <router-link to="/careers" class="hover:text-amazone-light">
                Carrières
              </router-link>
            </li>
            <li>
              <router-link to="/sustainability" class="hover:text-amazone-light">
                Durabilité
              </router-link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-bold text-lg mb-4">Service Client</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/help" class="hover:text-amazone-light">
                Centre d'aide
              </router-link>
            </li>
            <li>
              <router-link to="/returns" class="hover:text-amazone-light">
                Retours
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="hover:text-amazone-light">
                Contact
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-4">Légal</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/privacy" class="hover:text-amazone-light">
                Confidentialité
              </router-link>
            </li>
            <li>
              <router-link to="/terms" class="hover:text-amazone-light">
                CGV
              </router-link>
            </li>
            <li>
              <router-link to="/cookies" class="hover:text-amazone-light">
                Cookies
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-lg mb-4">Suivez-nous</h3>
          <ul class="space-y-2">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener" class="hover:text-amazone-light">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener" class="hover:text-amazone-light">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener" class="hover:text-amazone-light">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-700 text-center">
        <p>&copy; {{ currentYear }} Amazone. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>