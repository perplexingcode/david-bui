<template>
  <div>
    <div id="nav-mint" class="mt-3 mb-5">
      <ul class="flex justify-center gap-3">
        <li>What are mints?</li>
        <li>Tell me more</li>
        <li>Show me some</li>
      </ul>
    </div>
    <div>
      <div v-show="state.page == 0">
        <h3>What are mints</h3>
        <p>
          Mints are candies that have ingredients derived from plants such as
          peppermint oil or spearmint oil, or wintergreen from the plant genus
          Gaultheria.
        </p>
      </div>
      <div v-show="state.page == 1" class="text-center">
        <textarea :value="mintHistory" class="w-[30rem] h-20rem resize p-3">
        </textarea>
      </div>
      <div v-show="state.page == 2"></div>
    </div>
  </div>
</template>
<script setup>
const state = reactive({
  page: 1,
});

const mintHistory =
  ref(`The production of mints as a discrete food item can be traced back to the 18th century with the invention of Altoids.

The popularity of mints took off in the early 20th century, with the advent of mass urbanization and mass marketing. Advertising for mints focused on their convenience, and on the socially isolating effects of bad breath. These advertisements targeted young people generally, and young women particularly.

Mints have been offered in a variety of packaging, usually in an effort to promote portability. Early producers used cardboard boxes and tins, which have remained popular.

More recent packaging solutions have included "rolls" containing many mints stacked in one package composed of paper or foil, plastic boxes, and individually wrapped mints. Mint sales have remained robust in the 21st century.
`);
</script>
<style></style>
