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
          class="w-full search-input"
          @keyup.enter="handleSearch"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <!-- Lista de GIFs -->
      <div v-if="!loading" class="giphy-grid">
        <div
          v-for="gif in displayedGifs"
          :key="gif.id"
          class="giphy-item"
        >
          <div class="giphy-image-container">
            <img
              :src="gif.previewUrl"
              :alt="gif.title"
              class="giphy-image"
            />
            <div class="giphy-overlay">
              <div class="giphy-actions">
                <q-btn
                  :icon="isFavorite(gif.id) ? 'favorite' : 'favorite_border'"
                  :color="isFavorite(gif.id) ? 'red' : 'white'"
                  flat
                  round
                  @click="toggleFavorite(gif)"
                />
                <q-btn
                  icon="open_in_new"
                  color="white"
                  flat
                  round
                  @click="openGif(gif)"
                />
              </div>
            </div>
          </div>
          <p class="giphy-title">{{ gif.title }}</p>
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

<style>
.search-input {
  max-width: 600px;
  margin: 0 auto;
}

.giphy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.giphy-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f8f8;
}

.giphy-image-container {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
}

.giphy-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.giphy-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.giphy-item:hover .giphy-overlay {
  opacity: 1;
}

.giphy-item:hover .giphy-image {
  transform: scale(1.05);
}

.giphy-actions {
  display: flex;
  gap: 1rem;
}

.giphy-title {
  padding: 0.5rem;
  font-size: 0.875rem;
  color: #666;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 640px) {
  .giphy-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .giphy-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
