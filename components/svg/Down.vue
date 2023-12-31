<template>
  <div
    @click="handleClick"
    class="down-vote"
    ref="downvote"
    :class="highlighted ? 'accent' : ''"
  >
    <svg
      v-show="!highlighted && !value"
      fill="#99f6e4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      enable-background="new 0 0 52 52"
      xml:space="preserve"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          transform="rotate(180 26 26)"
          d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
        ></path>
      </g>
    </svg>
    <svg
      v-show="highlighted || value"
      fill="#0f766e"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      enable-background="new 0 0 52 52"
      xml:space="preserve"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          transform="rotate(180 26 26)"
          d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
        ></path>
      </g>
    </svg>
  </div>
</template>
<script setup>
const { value } = defineProps(['value']);

let highlighted = ref(false);

const downvote = ref(null);
const upvote = ref(null);
onMounted(() => {
  if (value !== undefined) return;
  upvote.value = downvote.value.parentNode.querySelector('.up-vote');
});
function handleClick() {
  if (value !== undefined) return;
  highlighted.value = !highlighted.value;
  if (
    highlighted.value &&
    upvote.value.classList.contains('accent') &&
    !upvote.value.classList.contains('inclusive')
  ) {
    upvote.value.click();
  }
}
</script>
