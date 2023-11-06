<template>
  <EffectShowOnHover>
    <li class="menu-parent-item relative">
      <NuxtLink v-if="!props.noLink" :to="url" class="cursor-pointer">{{
        props.name
      }}</NuxtLink>
      <a v-else class="no-link cursor-pointer">{{ props.name }}</a>
      <ul
        class="menu-drop-down absolute top-8 left-0 z-50 bg-white list-none border-2 border-gray-300 rounded-md shadow-md p-1 flex flex-col gap-2 can-toggle"
      >
        <li v-for="child in children" class="menu-child-item cursor-pointer">
          <NuxtLink v-if="child.link" :to="child.link">{{
            child.name
          }}</NuxtLink>
          <a v-else class="no-link">{{ child.name }}</a>
        </li>
      </ul>
    </li>
  </EffectShowOnHover>
</template>
<script setup>
const props = defineProps({
  title: String,
  link: String,
  name: String,
  children: Array,
  noLink: {
    type: Boolean,
    default: false,
  },
});

const url = props.link || '/' + props.name.toLowerCase().replace(' ', '-');
const children = ref([]);
for (let i = 0; i < props.children.length; i++) {
  const child = props.children[i];
  // chilren=['name1', 'name2', 'name3']
  if (typeof child === 'string') {
    children.value[i] = {
      name: child,
      link: url + '/' + child.toLowerCase().replace(' ', '-'),
    };
  }
  if (Array.isArray(child)) {
    // children=[['name1', 'link1'], ['name2', 'link2']]
    if (typeof child[0] === 'string') {
      let link;
      // absolute url
      if (child[1].includes('*')) link = child[1].replace('*', '');
      // relative url
      else link = url + '/' + child[1];
      children.value[i] = {
        name: child[0],
        link,
      };
    }
  }
  // children=[{name: 'name1', link: 'link1'}, {name: 'name2', link: 'link2'}]
  else if (typeof child === 'object') {
    // absolute url
    if (child.link.includes('*'))
      children.value[i] = {
        name: child.name,
        link: child.link.replace('*', ''),
      };
    // relative url
    else children.value[i] = { name: child.name, link: url + '/' + child.link };
  }
}
</script>
