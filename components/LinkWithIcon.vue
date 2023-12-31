<template>
  <div>
    <a
      :href="data.url"
      class="flex gap-2 p-1 px-2 m-1 bg-teal-100 w-fit rounded-sm"
    >
      <img class="h-6 w-6 bg-gray-300" :src="data.img" />
      <span>{{ data.label }}</span>
    </a>
    <button @click="changeLink">Change Link</button>
    <button @click="changeImg">Change Image</button>
  </div>
</template>
<script setup>
import { getById, upsert } from '~/static/db';
import { cloudOverride } from '~/static/utils';
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
let data = reactive({
  url: '',
  img: '',
  label: props.name,
});
onMounted(() => {
  const _data = getById('cache', 'link_' + props.id);
  if (!_data) upsert('cache', { id: 'link_' + props.id, data });
  else cloudOverride(_data, data);
});
const changeImg = () => {
  const newImg = prompt('Enter new image URL', data.img);
  if (newImg) data.img = newImg;
};
const changeLink = () => {
  const newLink = prompt('Enter new link URL', data.url);
  if (newLink) data.url = newLink;
};
</script>
