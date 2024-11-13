export default {
  namespaced: true,

  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null
  }),

  getters: {
    user: state => state.user,
    token: state => state.token,
    isAuthenticated: state => state.isAuthenticated,
    isLoading: state => state.loading,
    error: state => state.error,
    isAdmin: state => state.user?.role === 'admin'
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = !!user
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    },

    SET_TOKEN(state, token) {
      state.token = token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
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
    async checkAuth({ commit, state }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        const token = state.token
        if (!token) {
          commit('SET_USER', null)
          commit('SET_TOKEN', null)
          return null
        }

        // Simulate API call to validate token
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            if (token === 'mock-jwt-token') {
              resolve(state.user)
            } else {
              throw new Error('Token invalide')
            }
          }, 500)
        })

        commit('SET_USER', response)
        return response
      } catch (error) {
        commit('SET_USER', null)
        commit('SET_TOKEN', null)
        commit('SET_ERROR', error.message || 'Session expirée')
        return null
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async login({ commit }, credentials) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            if (credentials.email === 'admin@amazone.fr' && credentials.password === 'admin') {
              resolve({
                user: {
                  id: 1,
                  email: 'admin@amazone.fr',
                  name: 'Admin',
                  role: 'admin'
                },
                token: 'mock-jwt-token'
              })
            } else if (credentials.email === 'user@amazone.fr' && credentials.password === 'user') {
              resolve({
                user: {
                  id: 2,
                  email: 'user@amazone.fr',
                  name: 'User',
                  role: 'user'
                },
                token: 'mock-jwt-token'
              })
            } else {
              throw new Error('Identifiants invalides')
            }
          }, 1000)
        })

        commit('SET_USER', response.user)
        commit('SET_TOKEN', response.token)
        return response.user
      } catch (error) {
        commit('SET_ERROR', error.message || 'Erreur lors de la connexion')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async register({ commit }, userData) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              user: {
                id: Date.now(),
                email: userData.email,
                name: userData.name,
                role: 'user'
              },
              token: 'mock-jwt-token'
            })
          }, 1000)
        })

        commit('SET_USER', response.user)
        commit('SET_TOKEN', response.token)
        return response.user
      } catch (error) {
        commit('SET_ERROR', error.message || 'Erreur lors de l\'inscription')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async logout({ commit }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))

        commit('SET_USER', null)
        commit('SET_TOKEN', null)
      } catch (error) {
        commit('SET_ERROR', error.message || 'Erreur lors de la déconnexion')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateProfile({ commit, state }, profileData) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ...state.user,
              ...profileData
            })
          }, 1000)
        })

        commit('SET_USER', response)
        return response
      } catch (error) {
        commit('SET_ERROR', error.message || 'Erreur lors de la mise à jour du profil')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async forgotPassword({ commit }, email) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        return true
      } catch (error) {
        commit('SET_ERROR', error.message || 'Erreur lors de la réinitialisation du mot de passe')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async resetPassword({ commit }, { token, password }) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        return true
      } catch (error) {
        commit('SET_ERROR', error.message || 'Erreur lors du changement de mot de passe')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
}