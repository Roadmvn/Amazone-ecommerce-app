export default {
  namespaced: true,

  state: () => ({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
  }),

  getters: {
    allOrders: state => state.orders,
    currentOrder: state => state.currentOrder,
    isLoading: state => state.loading,
    error: state => state.error
  },

  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders
    },

    SET_CURRENT_ORDER(state, order) {
      state.currentOrder = order
    },

    ADD_ORDER(state, order) {
      state.orders.unshift(order)
    },

    UPDATE_ORDER_STATUS(state, { orderId, status }) {
      const order = state.orders.find(o => o.id === orderId)
      if (order) {
        order.status = status
      }
    },

    SET_LOADING(state, status) {
      state.loading = status
    },

    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    async fetchOrders({ commit }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        const response = await new Promise(resolve => {
          setTimeout(() => {
            resolve([
              {
                id: 1,
                date: new Date().toISOString(),
                total: 299.97,
                status: 'En cours',
                items: [
                  { id: 1, name: 'Produit 1', quantity: 2, price: 99.99 },
                  { id: 2, name: 'Produit 2', quantity: 1, price: 99.99 }
                ]
              }
              // Add more mock orders as needed
            ])
          }, 1000)
        })

        commit('SET_ORDERS', response)
      } catch (error) {
        commit('SET_ERROR', 'Erreur lors du chargement des commandes')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchOrderById({ commit }, orderId) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        const response = await new Promise(resolve => {
          setTimeout(() => {
            resolve({
              id: orderId,
              date: new Date().toISOString(),
              total: 299.97,
              status: 'En cours',
              items: [
                { id: 1, name: 'Produit 1', quantity: 2, price: 99.99 },
                { id: 2, name: 'Produit 2', quantity: 1, price: 99.99 }
              ]
            })
          }, 500)
        })

        commit('SET_CURRENT_ORDER', response)
      } catch (error) {
        commit('SET_ERROR', 'Erreur lors du chargement de la commande')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createOrder({ commit }, orderData) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        const response = await new Promise(resolve => {
          setTimeout(() => {
            resolve({
              id: Date.now(),
              date: new Date().toISOString(),
              status: 'En cours',
              ...orderData
            })
          }, 1000)
        })

        commit('ADD_ORDER', response)
        return response
      } catch (error) {
        commit('SET_ERROR', 'Erreur lors de la création de la commande')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateOrderStatus({ commit }, { orderId, status }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))

        commit('UPDATE_ORDER_STATUS', { orderId, status })
      } catch (error) {
        commit('SET_ERROR', 'Erreur lors de la mise à jour du statut')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}