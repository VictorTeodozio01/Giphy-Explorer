<template>
  <q-page class="q-pa-md">
    <div class="max-w-7xl mx-auto">
      <!-- Barra de pesquisa -->
      <div class="mb-6">
        <q-input
          v-model="searchQuery"
          outlined
          dense
          placeholder="Pesquisar GIFs..."
          class="w-full"
          @keyup.enter="handleSearch"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <!-- Lista de GIFs -->
      <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="gif in displayedGifs"
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

      <!-- Loading -->
      <div v-else class="flex justify-center items-center h-64">
        <q-spinner color="primary" size="3em" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useGiphyStore } from 'src/stores/giphy'
import type { GiphyImage } from 'src/stores/giphy'

const store = useGiphyStore()
const searchQuery = ref('')

const displayedGifs = computed<GiphyImage[]>(() => {
  return searchQuery.value ? store.searchResults : store.trending
})

const loading = computed(() => store.loading)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    store.searchGifs(searchQuery.value)
  }
}

const toggleFavorite = (gif: GiphyImage) => {
  store.toggleFavorite(gif)
}

const isFavorite = (gifId: string) => {
  return store.isFavorite(gifId)
}

const openGif = (gif: GiphyImage) => {
  window.open(gif.url, '_blank')
}

onMounted(() => {
  store.loadFavorites()
  store.fetchTrending()
})
</script>
