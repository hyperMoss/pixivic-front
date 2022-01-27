<template>
  <div :style="{height:illust.height/10+'px'}">{{ illust.id }}</div>
</template>

<script  lang="ts">
  export default {
    name: 'item-component',
    props: {
    illust: {
      type: Object,
      required: true,
    },
    }
  }
</script>