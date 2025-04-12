import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

const messages = {
  'pt-BR': {
    app: {
      title: 'Giphy Explorer',
      search: 'Pesquisar',
      favorites: 'Favoritos',
      categories: 'Categorias',
      about: 'Sobre',
      loading: 'Carregando...',
      noResults: 'Nenhum resultado encontrado',
      noFavorites: 'Você ainda não tem GIFs favoritos',
      noCategories: 'Nenhuma categoria encontrada',
      error: 'Ocorreu um erro'
    }
  },
  'en-US': {
    app: {
      title: 'Giphy Explorer',
      search: 'Search',
      favorites: 'Favorites',
      categories: 'Categories',
      about: 'About',
      loading: 'Loading...',
      noResults: 'No results found',
      noFavorites: 'You don\'t have any favorite GIFs yet',
      noCategories: 'No categories found',
      error: 'An error occurred'
    }
  }
}

const i18n = createI18n({
  locale: 'pt-BR',
  fallbackLocale: 'en-US',
  messages
})

export default boot(({ app }) => {
  app.use(i18n)
})

export { i18n }
