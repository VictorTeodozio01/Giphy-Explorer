import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Criando uma instância do Axios
const api = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  timeout: 5000
})

// Interceptor para adicionar a chave da API em todas as requisições
api.interceptors.request.use(config => {
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY
  if (apiKey) {
    config.params = {
      ...config.params,
      api_key: apiKey
    }
  }
  return config
})

export default boot(({ app }) => {
  // Disponibilizando o Axios globalmente na aplicação
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
