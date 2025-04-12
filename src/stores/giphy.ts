import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export interface GiphyImage {
  id: string;
  title: string;
  url: string;
  previewUrl: string;
  width: string;
  height: string;
}

interface GiphyCategory {
  name: string;
  name_encoded: string;
}

interface GiphyResponse {
  data: Array<{
    id: string;
    title: string;
    images: {
      original: { url: string; width: string; height: string };
      preview_gif: { url: string };
    };
  }>;
  pagination: {
    total_count: number;
  };
}

export const useGiphyStore = defineStore('giphy', {
  state: () => ({
    favorites: [] as GiphyImage[],
    trending: [] as GiphyImage[],
    searchResults: [] as GiphyImage[],
    categories: [] as GiphyCategory[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    loadFavorites() {
      const stored = localStorage.getItem('giphy-favorites');
      if (stored) {
        this.favorites = JSON.parse(stored);
      }
    },

    saveFavorites() {
      localStorage.setItem('giphy-favorites', JSON.stringify(this.favorites));
    },

    toggleFavorite(gif: GiphyImage) {
      const index = this.favorites.findIndex((f) => f.id === gif.id);
      if (index === -1) {
        this.favorites.push(gif);
      } else {
        this.favorites.splice(index, 1);
      }
      this.saveFavorites();
    },

    isFavorite(gifId: string) {
      return this.favorites.some((f) => f.id === gifId);
    },

    async fetchTrending() {
      this.loading = true;
      this.error = null;
      try {
        console.log('Iniciando fetchTrending...');
        const response = await api.get<GiphyResponse>('/trending', {
          params: {
            limit: 25,
          },
        });
        console.log('Resposta do Giphy:', response);

        if (!response.data || !response.data.data) {
          throw new Error('Resposta inválida da API do Giphy');
        }

        this.trending = response.data.data.map((item) => ({
          id: item.id,
          title: item.title,
          url: item.images.original.url,
          previewUrl: item.images.preview_gif.url,
          width: item.images.original.width,
          height: item.images.original.height,
        }));
      } catch (error) {
        console.error('Erro detalhado:', error);
        this.error = error instanceof Error ? error.message : 'Erro ao carregar GIFs em tendência';
      } finally {
        this.loading = false;
      }
    },

    async searchGifs(query: string) {
      this.loading = true;
      this.error = null;
      try {
        console.log('Iniciando searchGifs...');
        const response = await api.get<GiphyResponse>('/search', {
          params: {
            q: query,
            limit: 25,
          },
        });
        console.log('Resposta do Giphy:', response);

        if (!response.data || !response.data.data) {
          throw new Error('Resposta inválida da API do Giphy');
        }

        this.searchResults = response.data.data.map((item) => ({
          id: item.id,
          title: item.title,
          url: item.images.original.url,
          previewUrl: item.images.preview_gif.url,
          width: item.images.original.width,
          height: item.images.original.height,
        }));
      } catch (error) {
        console.error('Erro detalhado:', error);
        this.error = error instanceof Error ? error.message : 'Erro ao pesquisar GIFs';
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get<{ data: GiphyCategory[] }>('/categories');
        this.categories = response.data.data;
      } catch (error) {
        this.error = 'Erro ao carregar categorias';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async searchByCategory(category: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get<GiphyResponse>('/search', {
          params: {
            q: category,
            limit: 25,
          },
        });
        this.searchResults = response.data.data.map((item) => ({
          id: item.id,
          title: item.title,
          url: item.images.original.url,
          previewUrl: item.images.preview_gif.url,
          width: item.images.original.width,
          height: item.images.original.height,
        }));
      } catch (error) {
        this.error = 'Erro ao carregar GIFs da categoria';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
