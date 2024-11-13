export default {
  namespaced: true,

  state: () => ({
    loading: false,
    error: null,
    toast: {
      show: false,
      message: '',
      type: 'info' // 'info', 'success', 'warning', 'error'
    },
    modal: {
      show: false,
      component: null,
      props: {}
    },
    sidebar: {
      show: false
    }
  }),

  getters: {
    isLoading: state => state.loading,
    error: state => state.error,
    toast: state => state.toast,
    modal: state => state.modal,
    isSidebarOpen: state => state.sidebar.show
  },

  mutations: {
    SET_LOADING(state, status) {
      state.loading = status
    },

    SET_ERROR(state, error) {
      state.error = error
    },

    SHOW_TOAST(state, { message, type = 'info' }) {
      state.toast = {
        show: true,
        message,
        type
      }
    },

    HIDE_TOAST(state) {
      state.toast.show = false
    },

    SHOW_MODAL(state, { component, props = {} }) {
      state.modal = {
        show: true,
        component,
        props
      }
    },

    HIDE_MODAL(state) {
      state.modal.show = false
      state.modal.component = null
      state.modal.props = {}
    },

    TOGGLE_SIDEBAR(state) {
      state.sidebar.show = !state.sidebar.show
    },

    SET_SIDEBAR(state, show) {
      state.sidebar.show = show
    }
  },

  actions: {
    showToast({ commit }, payload) {
      commit('SHOW_TOAST', payload)
      setTimeout(() => {
        commit('HIDE_TOAST')
      }, 3000)
    },

    showModal({ commit }, payload) {
      commit('SHOW_MODAL', payload)
    },

    hideModal({ commit }) {
      commit('HIDE_MODAL')
    },

    toggleSidebar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },

    setSidebar({ commit }, show) {
      commit('SET_SIDEBAR', show)
    }
  }
}