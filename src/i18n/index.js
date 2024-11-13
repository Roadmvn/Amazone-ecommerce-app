import { createI18n } from 'vue-i18n'

const messages = {
  fr: {
    auth: {
      login: 'Connexion',
      register: 'Inscription',
      email: 'Adresse e-mail',
      password: 'Mot de passe',
      forgotPassword: 'Mot de passe oublié ?',
      noAccount: 'Pas encore de compte ?',
      hasAccount: 'Déjà un compte ?',
      submit: 'Valider',
      name: 'Nom complet',
      confirmPassword: 'Confirmer le mot de passe'
    },
    navigation: {
      home: 'Accueil',
      products: 'Produits',
      cart: 'Panier',
      profile: 'Profil',
      admin: 'Administration'
    },
    products: {
      search: 'Rechercher un produit',
      category: 'Catégorie',
      price: 'Prix',
      stock: 'Stock',
      addToCart: 'Ajouter au panier',
      outOfStock: 'Rupture de stock'
    },
    cart: {
      empty: 'Votre panier est vide',
      total: 'Total',
      checkout: 'Passer la commande',
      remove: 'Retirer'
    },
    profile: {
      orders: 'Mes commandes',
      settings: 'Paramètres',
      logout: 'Déconnexion'
    },
    errors: {
      required: 'Ce champ est requis',
      invalidEmail: 'Adresse e-mail invalide',
      passwordLength: 'Le mot de passe doit contenir au moins 8 caractères',
      passwordMatch: 'Les mots de passe ne correspondent pas',
      serverError: 'Une erreur est survenue, veuillez réessayer'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  messages
})