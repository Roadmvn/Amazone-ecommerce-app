export default {
  namespaced: true,

  state: () => ({
    products: [],
    categories: [],
    currentProduct: null,
    loading: false,
    error: null,
    filters: {
      category: null,
      minPrice: null,
      maxPrice: null,
      search: ''
    }
  }),

  getters: {
    allProducts: state => state.products,
    currentProduct: state => state.currentProduct,
    categories: state => state.categories,
    isLoading: state => state.loading,
    error: state => state.error,
    filteredProducts: state => {
      return state.products.filter(product => {
        const matchesCategory = !state.filters.category || product.category === state.filters.category
        const matchesPrice = (!state.filters.minPrice || product.price >= state.filters.minPrice) &&
                           (!state.filters.maxPrice || product.price <= state.filters.maxPrice)
        const matchesSearch = !state.filters.search || 
                            product.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                            product.description.toLowerCase().includes(state.filters.search.toLowerCase())
        
        return matchesCategory && matchesPrice && matchesSearch
      })
    }
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },

    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },

    SET_CURRENT_PRODUCT(state, product) {
      state.currentProduct = product
    },

    SET_LOADING(state, status) {
      state.loading = status
    },

    SET_ERROR(state, error) {
      state.error = error
    },

    SET_FILTER(state, { key, value }) {
      state.filters[key] = value
    },

    CLEAR_FILTERS(state) {
      state.filters = {
        category: null,
        minPrice: null,
        maxPrice: null,
        search: ''
      }
    }
  },

  actions: {
    async fetchProducts({ commit }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        const response = await new Promise(resolve => {
          setTimeout(() => {
            resolve([
              {
                id: 1,
                name: 'Produit 1',
                description: 'Description du produit 1',
                price: 99.99,
                category: 'Électronique',
                image: '/images/product1.jpg'
              },
              // Add more mock products as needed
            ])
          }, 1000)
        })

        commit('SET_PRODUCTS', response)
      } catch (error) {
        commit('SET_ERROR', 'Erreur lors du chargement des produits')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchCategories({ commit }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        const response = await new Promise(resolve => {
          setTimeout(() => {
            resolve(['Électronique', 'Vêtements', 'Livres', 'Sports'])
          }, 500)
        })

        commit('SET_CATEGORIES', response)
      } catch (error) {
        commit('SET_ERROR', 'Erreur lors du chargement des catégories')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchProductById({ commit }, productId) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        const response = await new Promise(resolve => {
          setTimeout(() => {
            resolve({
              id: productId,
              name: `Produit ${productId}`,
              description: `Description détaillée du produit ${productId}`,
              price: 99.99,
              category: 'Électronique',
              image: `/images/product${productId}.jpg`
            })
          }, 500)
        })

        commit('SET_CURRENT_PRODUCT', response)
      } catch (error) {
        commit('SET_ERROR', 'Erreur lors du chargement du produit')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    setFilter({ commit }, filter) {
      commit('SET_FILTER', filter)
    },

    clearFilters({ commit }) {
      commit('CLEAR_FILTERS')
    }
  }
}