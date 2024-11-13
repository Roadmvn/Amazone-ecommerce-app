export default {
  namespaced: true,
  
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || [],
    loading: false,
    error: null
  }),

  getters: {
    cartItems: state => state.items,
    cartTotal: state => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    cartCount: state => state.items.reduce((count, item) => count + item.quantity, 0),
    isLoading: state => state.loading,
    error: state => state.error
  },

  mutations: {
    ADD_TO_CART(state, product) {
      const existingItem = state.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },

    REMOVE_FROM_CART(state, productId) {
      state.items = state.items.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },

    UPDATE_QUANTITY(state, { productId, quantity }) {
      const item = state.items.find(item => item.id === productId)
      if (item) {
        item.quantity = Math.max(1, quantity)
        localStorage.setItem('cart', JSON.stringify(state.items))
      }
    },

    CLEAR_CART(state) {
      state.items = []
      localStorage.removeItem('cart')
    },

    SET_LOADING(state, status) {
      state.loading = status
    },

    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product)
    },

    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    },

    updateQuantity({ commit }, payload) {
      commit('UPDATE_QUANTITY', payload)
    },

    clearCart({ commit }) {
      commit('CLEAR_CART')
    },

    async checkout({ commit, state }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        commit('CLEAR_CART')
        return true
      } catch (error) {
        commit('SET_ERROR', 'Erreur lors du paiement')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}