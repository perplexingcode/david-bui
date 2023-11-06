import { Transition } from 'nuxt/dist/app/compat/capi';
<template>
  <div>
    <div class="relative w-[100vw] h-[18vh]">
      <div class="absolute top-0 left-0 w-[100vw] h-[18vh]">
        <div
          class="strip relative bg-[#bcbcbc] text-[#faf5e9] h-[18vh] text-[12rem] text-center font-bold leading-none"
          :class="{ 'opacity-0': state.liebesfreud }"
        >
          <h1
            class="title absolute bottom-[-2.25rem] left-1/2 -translate-x-1/2"
          >
            David-Bui
          </h1>
        </div>
      </div>
      <Transition>
        <div
          class="absolute top-0 left-0 w-[100vw] h-[18vh]"
          v-show="state.liebesfreud"
        >
          <div
            style="background: url('Gucci floral pattern green.jpg')"
            class="strip relative text-[#0f766e] h-[18vh] text-[12rem] text-center font-bold leading-none"
          >
            <h1
              class="title absolute bottom-[-2.25rem] left-1/2 -translate-x-1/2 text"
              :style="{ opacity: state.liebesfreud ? 0.2 : '1' }"
              style="
                text-shadow: -1px 0 #faf5e930, 0 1px #faf5e930, 1px 0 #faf5e930,
                  0 -1px #faf5e930;
              "
            >
              David-Bui
            </h1>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
const state = inject('state');
const events = inject('events');
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
