<template>
  <div class="nav">
    <div class="h-[22vh]">
      <div class="text-center mt-5">
        <p>David-Bui</p>
      </div>
      <nav class="flex justify-center mt-2">
        <ul class="flex gap-3">
          <li @click="liebesfreud">
            <a>Liebesfreud</a>
          </li>
          <li class="link-trinity">
            <a href="https://trinityinc.asia" target="_blank">Trinity Inc</a>
          </li>
        </ul>
      </nav>
    </div>
    <ul class="fixed bottom-5 right-5">
      <li><NuxtLink to="/mint">Mints</NuxtLink></li>
    </ul>
  </div>
</template>
<script setup>
const events = inject('events');
function liebesfreud() {
  events.liebesfreud = !events.liebesfreud;
}
</script>
<style>
.nav ul li a,
.nav ul li {
  @apply bg-gray-100 rounded-full block;
}
.nav ul li a {
  @apply w-full  px-3 py-[1px];
  -moz-user-select: none; /* Firefox */
  -webkit-user-select: none; /* Safari and Chrome */
  -ms-user-select: none; /* IE/Edge */
  user-select: none;
}
.nav ul li a:not(.no-link) {
  @apply hover:bg-teal-400;
}
.nav ul > li a {
  @apply cursor-pointer;
}

.link-trinity:hover,
.link-trinity:hover a {
  background-color: #ffdb00 !important ;
}
</style>
