<template>
  <virtual-list :key="identifier" :list="pictureList" @infinite="infinite">
  </virtual-list>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import VirtualList from '@/components/Virtual-List/VirtualList.vue';
import { getClient } from '@/util/dom';
import api from '@/api';
import { ref, onMounted, computed } from 'vue';

let scrollHeight = computed(() => getClient().height - 60);

let pictureList = ref([]);
let user = ref([]);
let fatherMounted = false;
let page = 1;
let mode = 'day';
let date = dayjs(new Date()).add(-3, 'days').format('YYYY-MM-DD');
const identifier = new Date();

async function infinite($state) {
  const res = await api.rank.getRank({
    page: page++,
    date: date,
    mode: mode,
  });
  if (!res.data.data) {
    $state.complete();
  } else {
    pictureList.value = pictureList.value.concat(
      res.data.data.filter(
        (e) => e.xrestrict === 0 && e.sanityLevel <= (user ? 3 : 3)
      )
    );
    $state.loaded();
  }
}

onMounted(async () => {
  fatherMounted = true;
});
</script>

<style scoped>
.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
