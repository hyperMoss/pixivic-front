<script setup lang="ts">
import Item from './Item.vue';
import VirtualList from './VirtualList.vue';
import api from '@/api';

const dataComponent = Item;
const pictureList = ref([])


const getList = async ()=>{
   const res = await api.rank.getRank({
    page: 1,
    date: '2022-01-25',
    mode: 'day',
  });
  console.log(res.data.data);
  pictureList.value = res.data.data;
}

onMounted( async ()=>{
 await getList();
})

</script>

<template>
<div>{{JSON.stringify(pictureList)}}</div>
  <VirtualList :data="pictureList">
    <template v-slot="{ item, index }">
      <div class="item-container">
        <div class="cell cell-index">{{ index + 1 }}</div>
        <!-- <div class="cell cell-img"><img :src="item.img" /></div> -->
        <div class="cell">{{ item.id }}</div>
      </div>
    </template>
  </VirtualList>
</template>
