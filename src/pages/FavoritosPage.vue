<template>
  <q-page class="q-pa-md">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Meus Favoritos</h1>

      <!-- Lista de GIFs favoritos -->
      <div v-if="!loading && favorites.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="gif in favorites"
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
                icon="favorite"
                color="red"
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

      <!-- Mensagem quando não há favoritos -->
      <div v-else-if="!loading && favorites.length === 0" class="text-center py-12">
        <q-icon name="favorite_border" size="4em" color="grey" />
        <p class="text-gray-600 mt-4">Você ainda não tem GIFs favoritos</p>
      </div>

      <!-- Loading -->
      <div v-else class="flex justify-center items-center h-64">
        <q-spinner color="primary" size="3em" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useGiphyStore } from 'src/stores/giphy'

const store = useGiphyStore()

const favorites = computed(() => store.favorites)
const loading = computed(() => store.loading)

const toggleFavorite = (gif: any) => {
  store.toggleFavorite(gif)
}

const openGif = (gif: any) => {
  window.open(gif.url, '_blank')
}

onMounted(() => {
  store.loadFavorites()
})
</script>
