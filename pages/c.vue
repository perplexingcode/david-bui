<template>
  <div class="h-screen w-screen max-w-screen bg-indigo-800">
    <div
      class="h-screen w-full flex flex-col justify-center items-center mb-10 h-fit"
    >
      <span class="text-2xl font-bold text-white mb-6">Clipboard</span>
      <div class="flex items-center gap-3 mb-3 px-3 md:w-fit w-full">
        <label class="text-xl text-white">Link</label>
        <input
          v-model="link"
          class="border-2 border-gray-300 rounded-md px-2 w-[32rem] max-w-full"
        />
        <a :href="link" target="_blank">
          <SvgOpenLink @click="gotoLink" class="w-6 h-6 cursor-pointer" />
        </a>
      </div>
      <div class="w-full h-fit flex justify-center px-5 mb-10">
        <textarea
          class="md:w-1/2 w-full md:h-[60dvh] h-[68dvh] border-2 border-gray-300 rounded-md p-2"
          resizable
          v-model="text"
        ></textarea>
      </div>
    </div>
  </div>
</template>
<script setup>
import debounce from 'lodash.debounce';
import { cache } from '~/static/db';
const text = ref('');

const link = ref('');
onMounted(async () => {
  await nextTick();
  text.value = (await cache.get('clipboard')) || '';
  link.value = (await cache.get('link')) || '';
  const updateText = debounce(async function () {
    await cache.set('clipboard', text);
  }, 500);
  const updateLink = debounce(async function () {
    await cache.set('link', link);
  }, 500);
  watch(text, async () => {
    await updateText();
  });
  watch(link, async () => {
    await updateLink();
  });
  // Set interval to check for changes
  setInterval(async () => {
    const cachedText = await cache.get('clipboard');
    if (cachedText !== text.value) text.value = cachedText;
    const cachedLink = await cache.get('link');
    if (cachedLink !== link.value) link.value = cachedLink;
  }, 1000);
});
</script>
<style></style>
