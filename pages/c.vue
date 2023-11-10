<template>
  <div class="h-screen w-screen bg-indigo-800">
    <div
      class="h-screen w-screen flex flex-col justify-center items-center mb-10"
    >
      <span class="text-2xl font-bold text-white mb-6">Clipboard</span>
      <textarea
        class="w-1/2 h-1/2 border-2 border-gray-300 rounded-md p-2"
        resizable
        v-model="text"
      ></textarea>
    </div>
  </div>
</template>
<script setup>
import debounce from 'lodash.debounce';
import { cache } from '~/static/db';
const text = ref('');
onMounted(async () => {
  await nextTick();
  text.value = (await cache.get('clipboard')) || '';
  const updateText = debounce(async function () {
    await cache.set('clipboard', text);
  }, 500);
  watch(text, async () => {
    await updateText();
  });
});
</script>
<style></style>
