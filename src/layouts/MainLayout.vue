<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Giphy Explorer
        </q-toolbar-title>

        <q-btn flat round dense icon="search" aria-label="Pesquisar" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header class="text-white">
          Navegação
        </q-item-label>

        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="home" class="text-white" />
          </q-item-section>
          <q-item-section class="text-white">
            Home
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/favoritos" class="text-white">
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section class="text-white">
            Favoritos
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/sobre" class="text-white">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section class="text-white">
            Sobre
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const leftDrawerOpen = ref(true)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss">
.q-drawer {
  background: #1a237e !important;
}

.q-item.q-router-link--active {
  background: #1976d2 !important;
}

.q-header {
  background: #1976d2 !important;
}

</style>