// Validation des emails
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Validation des mots de passe
export const validatePassword = (password) => {
  return password.length >= 8
}

// Validation des noms
export const validateName = (name) => {
  return name.length >= 2
}

// Validation des numéros de téléphone français
export const validatePhone = (phone) => {
  const re = /^(\+33|0)[1-9](\d{2}){4}$/
  return re.test(phone)
}

// Validation des codes postaux français
export const validatePostalCode = (code) => {
  const re = /^[0-9]{5}$/
  return re.test(code)
}

// Formatage des prix
export const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

// Formatage des dates
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}