<template>
  <q-page class="q-pa-md">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Categorias</h1>

      <!-- Lista de categorias -->
      <div v-if="!loading && categories.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="category in categories"
          :key="category.name"
          class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          @click="selectCategory(category.name)"
        >
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800">{{ category.name }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ category.name_encoded }}</p>
          </div>
        </div>
      </div>

      <!-- GIFs da categoria selecionada -->
      <div v-if="selectedCategory && searchResults.length > 0" class="mt-8">
        <h2 class="text-xl font-bold mb-4">GIFs em {{ selectedCategory }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="gif in searchResults"
            :key="gif.id"
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              :src="gif.previewUrl"
              :alt="gif.title"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <p class="text-sm text-gray-600 truncate">{{ gif.title }}</p>
              <div class="mt-2 flex justify-between items-center">
                <q-btn
                  :icon="isFavorite(gif.id) ? 'favorite' : 'favorite_border'"
                  :color="isFavorite(gif.id) ? 'red' : 'grey'"
                  flat
                  round
                  @click="toggleFavorite(gif)"
                />
                <q-btn
                  icon="open_in_new"
                  flat
                  round
                  @click="openGif(gif)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <q-spinner color="primary" size="3em" />
      </div>

      <!-- Mensagem quando não há categorias -->
      <div v-else-if="!loading && categories.length === 0" class="text-center py-12">
        <q-icon name="category" size="4em" color="grey" />
        <p class="text-gray-600 mt-4">Nenhuma categoria encontrada</p>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useGiphyStore } from 'src/stores/giphy'

const store = useGiphyStore()
const selectedCategory = ref('')

const categories = computed(() => store.categories)
const searchResults = computed(() => store.searchResults)
const loading = computed(() => store.loading)

const selectCategory = (category: string) => {
  selectedCategory.value = category
  store.searchByCategory(category)
}

const toggleFavorite = (gif: any) => {
  store.toggleFavorite(gif)
}

const isFavorite = (gifId: string) => {
  return store.isFavorite(gifId)
}

const openGif = (gif: any) => {
  window.open(gif.url, '_blank')
}

onMounted(() => {
  store.loadFavorites()
  store.fetchCategories()
})
</script>
