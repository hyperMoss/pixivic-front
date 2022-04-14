<template>
  <RecycleScroller  
    class="scroller"
    :items="pictureList"
    :item-size="32"
    key-field="id"
    v-slot="{ item }">
      <div class="user">
      {{ item.title }}
    </div>
  </RecycleScroller>
</template>

<script setup lang="ts">
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import Item from './Item.vue';
 
import api from '@/api';



const itemComponent = Item;
const pictureList = ref([]);

const getList = async () => {
  const res = await api.rank.getRank({
    page: 1,
    date: '2022-01-25',
    mode: 'day',
  });
  pictureList.value = res.data.data;
};

onMounted(async () => {
  await getList();
  console.log(pictureList);

});
</script>

<style scoped>
.scroller {
  height: 100%;
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>