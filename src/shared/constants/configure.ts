const env = import.meta.env.VITE_DEPLOY_ENV
const apiUrl = import.meta.env.VITE_API_URL || '/api'

export { env, apiUrl }
