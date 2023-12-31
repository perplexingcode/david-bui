<template>
  <main class="bg-teal-50">
    <h1 class="text-3xl font-bold text-center mb-10 mt-8 select-none">
      Notes of Phase II
    </h1>
    <div class="flex items-center fixed bottom-5 right-5 z-50">
      <span class="text-xl select-none">Filter</span>
      <div class="flex gap-2">
        <div class="flex">
          <SvgUp
            @click="filter('up')"
            class="w-10 h-10 cursor-pointer inclusive"
            :value="filters.up"
            :ok="filters.up"
          />
          <SvgDown
            @click="filter('down')"
            class="w-10 h-10 cursor-pointer inclusive"
            :value="filters.down"
          />
        </div>
        <SvgStar
          @click="filter('star')"
          :value="filters.star"
          class="w-8 h-8 cursor-pointer"
        />
        <SvgHeart
          @click="filter('heart')"
          :value="filters.heart"
          class="w-8 h-8 cursor-pointer"
        />
        <SvgAngry
          @click="filter('angry')"
          :value="filters.angry"
          class="w-8 h-8 cursor-pointer"
        />
        <SvgSad
          @click="filter('sad')"
          :value="filters.sad"
          class="w-8 h-8 cursor-pointer"
        />
        <SvgResetFilter
          :class="hasFilter ? 'opacity-100' : 'opacity-0'"
          @click="resetFilter"
          class="w-8 h-8 cursor-pointer"
        />
      </div>
    </div>
    <div class="flex flex-col gap-5 w-fit mx-auto">
      <div v-for="note in notes" :key="note.id">
        <div class="flex gap-5">
          <div>
            <div>
              <div>{{ note.date }}</div>
              <div>{{ note.title || 'Untitled' }}</div>
              <div>{{ note.content }}</div>
            </div>
          </div>
          <div class="flex gap-5 select-none">
            <div>
              <SvgUp
                @click="vote('up', note)"
                class="w-10 h-10 cursor-pointer"
              />
              <SvgDown
                class="w-10 h-10 cursor-pointer"
                @click="vote('down', note)"
              />
            </div>
            <div class="grid grid-cols-2 gap-2 items-center justify-center">
              <SvgHeart
                class="w-8 h-8 cursor-pointer"
                @click="vote('heart', note)"
              />
              <SvgStar
                class="w-8 h-8 -mt-1 cursor-pointer"
                @click="vote('star', note)"
              />

              <SvgSad
                class="w-7 h-7 cursor-pointer"
                @click="vote('sad', note)"
              />
              <SvgAngry
                class="w-7 h-7 cursor-pointer"
                @click="vote('angry', note)"
              />
            </div>
          </div>
          <div v-if="admin" class="">
            <div class="flex gap-2">
              <span>Up: {{ note.up }}</span>
              <span>Down: {{ note.down }}</span>
              <span>Heart: {{ note.heart }}</span>
              <span>Star: {{ note.star }}</span>
              <span>Sad: {{ note.sad }}</span>
              <span>Angry: {{ note.angry }}</span>
            </div>
            <div class="flex gap-2 mt-3">
              <button
                @click="editNote(note.id)"
                class="border border-teal-500 hover:border-teal-700 font-bold text-sm py-1 px-2 rounded-full h-fit"
              >
                Edit
              </button>
              <button
                @click="() => dbDelete('note', note.id)"
                class="border border-red-500 hover:border-red-700 font-bold text-sm py-1 px-2 rounded-full h-fit"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="admin" class="add-note mt-10 w-fit mx-auto">
      <div class="flex justify-between mb-3 gap-3">
        <input
          v-model="note.title"
          class="w-full rounded ps-2 py-1"
          placeholder="Title (optional)"
        />
        <input
          v-model="note.date"
          class="w-64 rounded ps-2 py-1"
          placeholder="Date (optional)"
        />
      </div>
      <textarea
        v-model="note.content"
        class="w-[50vw] h-32 rounded ps-2 pt-1"
        placeholder="Write your note here..."
      ></textarea>

      <div class="flex justify-center mt-3">
        <button
          @click="handleSaveNote"
          class="border border-teal-500 hover:border-teal-700 font-bold text-sm py-1 px-2 rounded-full"
        >
          {{ state.isEditing ? 'Lưu thay đổi' : ' Thêm ghi chú' }}
        </button>
      </div>
    </div>
  </main>
</template>
<script setup>
import moment from 'moment';
import { v4 } from 'uuid';
import { cache, dbDelete, getAll, query, upsert } from '~/static/db';
import { deepClone } from '~/static/utils';

const admin = true;

const state = reactive({
  isEditing: false,
});

const notes = ref([]);

const filters = reactive({
  up: false,
  down: false,
  heart: false,
  star: false,
  angry: false,
  sad: false,
});
const hasFilter = computed(() => {
  return Object.keys(filters).some((reaction) => {
    return filters[reaction];
  });
});
const _notes = ref([]);

function filter(reaction) {
  filters[reaction] = !filters[reaction];
  if (
    Object.keys(filters).every((reaction) => {
      return !filters[reaction];
    })
  ) {
    resetFilter();
    return;
  }
  // filter all true reactions
  notes.value = _notes.value.filter((note) => {
    return Object.keys(filters).some((reaction) => {
      return filters[reaction] && note[reaction];
    });
  });
  sortNotesByScore();
}

function calcScore(note) {
  const points = {
    up: 1,
    down: -1,
    heart: 2,
    star: 3,
    angry: -3,
    sad: -2,
  };

  const score = Object.keys(points).reduce((acc, reaction) => {
    return acc + note[reaction] * points[reaction];
  }, 0);
  return score;
}

function sortNotesByScore() {
  notes.value.sort((a, b) => {
    return calcScore(b) - calcScore(a);
  });
}

async function resetFilter() {
  Object.keys(filters).forEach((reaction) => {
    filters[reaction] = false;
  });
  notes.value = _notes.value;
}

const _note = {
  id: v4(),
  title: '',
  content: '',
  date: '',
  up: 0,
  down: 0,
  heart: 0,
  star: 0,
  angry: 0,
  sad: 0,
};

onMounted(async () => {
  await nextTick();
  notes.value = (await getAll('note')) || [];
  notes.value.forEach((note) => {
    note.state = {
      up: false,
      down: false,
      heart: false,
      star: false,
      angry: false,
      sad: false,
    };
    note.up = 0;
    note.down = 0;
    note.heart = 0;
    note.star = 0;
    note.angry = 0;
    note.sad = 0;
  });

  _notes.value = deepClone(notes.value);

  const noteReactions = (await getAll('reaction')) || [];
  noteReactions.forEach((reaction) => {
    const { type, session, note } = reaction;
    const index = notes.value.findIndex((_note) => _note.id == note);
    notes.value[index][type]++;
  });
  sortNotesByScore();
});

const note = reactive(deepClone(_note));

function handleSaveNote() {
  if (state.isEditing) {
    const index = notes.value.findIndex((_note) => _note.id == note.id);
    notes.value[index] = deepClone(note);
    upsert('note', note);
    state.isEditing = false;
  } else {
    addNote();
  }
}

function editNote(id) {
  state.isEditing = true;
  Object.assign(
    note,
    notes.value.find((note) => note.id == id),
  );
}

function addNote() {
  if (!note.content) return;
  note.id = v4();
  note.date = moment().format('YYYY-MM-DD');
  notes.value.push(deepClone(note));
  upsert('note', note);
  note.content = '';
  note.title = '';
  note.date = '';
}

const sessionId = inject('sessionId');

function vote(reaction, note) {
  note.state[reaction] = !note.state[reaction];
  if (note.state[reaction]) {
    upsert('reaction', {
      id: reaction + '-' + sessionId + '-' + note.id,
      type: reaction,
      session: sessionId,
      note: note.id.toString(),
    });
    if (reaction == 'up')
      dbDelete('reaction', 'down-' + sessionId + '-' + note.id);
    if (reaction == 'down')
      dbDelete('reaction', 'up-' + sessionId + '-' + note.id);
  } else {
    dbDelete('reaction', reaction + '-' + sessionId + '-' + note.id);
  }
}
</script>
<style>
main * {
  font-family: 'Comfortaa', cursive !important ;
}
</style>
