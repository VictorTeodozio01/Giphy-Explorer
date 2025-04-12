<template>
  <q-page class="q-pa-md">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-xl font-bold mb-6 text-center">Categorias</h1>

      <div
        v-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      >
        <p>{{ error }}</p>
      </div>

      <div v-if="loading" class="flex justify-center items-center h-64">
        <q-spinner color="primary" size="3em" />
      </div>

      <div v-else-if="selectedCategory && searchResults.length > 0">
        <div class="mb-4">
          <q-btn
            icon="arrow_back"
            label="Voltar para Categorias"
            color="primary"
            flat
            @click="clearSelectedCategory"
          />
        </div>

        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold">GIFs em {{ selectedCategory }}</h2>
          <q-btn icon="close" flat round color="grey" @click="clearSelectedCategory" />
        </div>
        <div class="giphy-grid">
          <div v-for="gif in searchResults" :key="gif.id" class="giphy-item">
            <div class="giphy-image-container">
              <img
                :src="gif.previewUrl"
                :alt="gif.title"
                class="giphy-image"
                loading="lazy"
                fetchpriority="low"
              />
              <div class="giphy-overlay">
                <div class="giphy-actions">
                  <q-btn
                    :icon="isFavorite(gif.id) ? 'favorite' : 'favorite_border'"
                    :color="isFavorite(gif.id) ? 'red' : 'white'"
                    flat
                    round
                    @click.stop="toggleFavorite(gif)"
                  />
                  <q-btn icon="open_in_new" color="white" flat round @click.stop="openGif(gif)" />
                </div>
              </div>
            </div>
            <p class="giphy-title">{{ gif.title }}</p>
          </div>
        </div>
      </div>

      <div
        v-else-if="!loading && categories.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="category in categories"
          :key="category.name"
          class="category-item"
          @click.stop="selectCategory(category.name)"
        >
          <div class="category-content">
            <q-icon name="category" size="2em" color="primary" />
            <h3 class="text-base font-semibold text-gray-800 mt-2">{{ category.name }}</h3>
            <p class="text-xs text-gray-600 mt-1">{{ category.name_encoded }}</p>
          </div>
        </div>
      </div>

      <div v-else-if="!loading && categories.length === 0" class="text-center py-12">
        <q-icon name="category" size="4em" color="grey" />
        <p class="text-gray-600 mt-4">Nenhuma categoria encontrada</p>
      </div>

      <div
        v-else-if="selectedCategory && !loading && searchResults.length === 0"
        class="text-center py-12"
      >
        <q-icon name="search_off" size="4em" color="grey" />
        <p class="text-gray-600 mt-4">
          Nenhum GIF encontrado para a categoria "{{ selectedCategory }}"
        </p>
        <q-btn
          class="q-mt-md"
          color="primary"
          label="Voltar para categorias"
          @click="clearSelectedCategory"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useGiphyStore } from 'src/stores/giphy';
import type { GiphyImage } from 'src/stores/giphy';

const store = useGiphyStore();
const selectedCategory = ref('');

const categories = computed(() => store.categories);
const searchResults = computed(() => store.searchResults);
const loading = computed(() => store.loading);
const error = computed(() => store.error);

const selectCategory = (category: string) => {
  console.log('Selecionando categoria:', category);
  selectedCategory.value = category;
  void store.searchByCategory(category);
};

const clearSelectedCategory = () => {
  console.log('Limpando categoria selecionada');
  selectedCategory.value = '';
};

const toggleFavorite = (gif: GiphyImage) => {
  store.toggleFavorite(gif);
};

const isFavorite = (gifId: string) => {
  return store.isFavorite(gifId);
};

const openGif = (gif: GiphyImage) => {
  window.open(gif.url, '_blank');
};

onMounted(() => {
  store.loadFavorites();
  void store.fetchCategories();
  clearSelectedCategory();
});
</script>

<style>
.category-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f8f8;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.category-content {
  padding: 1.5rem;
  text-align: center;
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
