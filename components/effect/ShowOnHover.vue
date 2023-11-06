<template>
  <div
    @mouseover="showTime = Infinity"
    @mouseleave="showTemp()"
    ref="wrapper"
    :class="id"
  >
    <component is="style" v-if="!id">
      .can-toggle { display: none !important; }
    </component>
    <component is="style">
      .{{ id }} .can-toggle { display: {{ showTime ? '' : 'none' }}; }
    </component>
    <slot></slot>
  </div>
</template>
<script setup>
import { v4 } from 'uuid';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  time: {
    type: Number,
    default: 500,
  },
  interval: {
    type: Number,
    default: 250,
  },
  forceHide: {
    type: Boolean,
    default: false,
  },
  displayType: {
    type: String,
    default: 'block',
  },
});
const wrapper = ref(null);
const showTime = ref(0);
let showInterval = null;

let id = ref(null);
onMounted(async () => {
  if (!id.value) id.value = 's' + v4();
  await nextTick();
});

// Handle dropdown menu
onClickOutside(wrapper, () => (showTime.value = 0));

function showTemp() {
  showTime.value = props.time;
  if (showInterval) clearInterval(showInterval);
  showInterval = setInterval(() => {
    showTime.value = showTime.value - props.interval;
    if (showTime.value < 0) {
      showTime.value = 0;
      clearInterval(showInterval);
    }
  }, props.interval);
}
</script>
<style></style>
