<template>
  <div>
    <slot></slot>
  </div>
</template>
<script setup>
import Liebesfreud from '~/assets/audio/music/Liebesfreud 1.mp3';
const audio = ref(null);
function playMusic(music) {
  audio.value = new Audio(music);
  audio.value.play();
}

const state = reactive({
  liebesfreud: true,
});

const events = reactive({
  liebesfreud: true,
});

watch(
  () => events.liebesfreud,
  () => {
    state.liebesfreud = true;
    playMusic(Liebesfreud);
  },
);

provide('state', state);
provide('events', events);
</script>
<style></style>
