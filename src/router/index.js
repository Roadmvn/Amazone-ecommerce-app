import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

// Pages publiques
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import ProductList from '@/views/products/ProductList.vue'
import ProductDetail from '@/views/products/ProductDetail.vue'
import Cart from '@/views/cart/Cart.vue'
import Checkout from '@/views/checkout/Checkout.vue'

// Pages profil
import Profile from '@/views/profile/Profile.vue'
import Orders from '@/views/profile/Orders.vue'
import Invoices from '@/views/profile/Invoices.vue'
import Settings from '@/views/profile/Settings.vue'

// Pages admin
import AdminDashboard from '@/views/admin/Dashboard.vue'
import AdminProducts from '@/views/admin/Products.vue'
import AdminUsers from '@/views/admin/Users.vue'
import AdminOrders from '@/views/admin/Orders.vue'
import AdminReports from '@/views/admin/Reports.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auth/login',
    name: 'login',
    component: Login
  },
  {
    path: '/auth/register',
    name: 'register',
    component: Register
  },
  {
    path: '/products',
    name: 'products',
    component: ProductList
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/orders',
    name: 'orders',
    component: Orders,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/invoices',
    name: 'invoices',
    component: Invoices,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/settings',
    name: 'settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/products',
    name: 'admin-products',
    component: AdminProducts,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: AdminUsers,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/orders',
    name: 'admin-orders',
    component: AdminOrders,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/reports',
    name: 'admin-reports',
    component: AdminReports,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const store = useStore()
  const isAuthenticated = store.state.auth.isAuthenticated
  const isAdmin = store.state.auth.user?.role === 'admin'

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      })
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router