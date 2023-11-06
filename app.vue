<template>
  <Data v-if="!redirect">
    <NuxtPage />
  </Data>
  <div v-if="urlAlias" class="text-center">
    <p class="text-sm pt-1">{{ url ? 'redirecting...' : 'checking...' }}</p>
  </div>
</template>
<script setup>
import { getByIdValue } from '~/static/db';

const redirect = ref(true);
let urlAlias;
const url = ref(null);
if (process.client) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlAlias = urlParams.get('link');
  if (!urlAlias) redirect.value = false;
}

onMounted(async () => {
  url.value = await getByIdValue('*url', urlAlias, 'url');
  if (url.value && redirect.value) window.location = url.value;
});
</script>

<style>
@import './assets/css/app.css';

body {
  background-color: #f3eedc10;
}

main {
  height: 100vh;
  width: 100vw;
  padding: 1.25rem;
}
</style>
