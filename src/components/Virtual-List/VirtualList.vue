<template>
  <VirtualCollection
    :cell-size-and-position-getter="cellSizeAndPositionGetter"
    :collection="list"
    :identifier="identifier"
    :width="width"
    :height="height"
    :column="column"
    @infinite="infinite"
  >
    <slot />
    <template v-slot:cell="props">
      <Item
        :column="props.data"
        @handleLike="handleLike"
        @handle-collect="setCollect"
      />
    </template>
  </VirtualCollection>
</template>

<script>
import dayjs from 'dayjs';
import { mapGetters } from 'vuex';
import VirtualCollection from './VirtualCollection.vue';
import throttle from 'lodash/throttle';
import { randomColor, replaceBigImg, replaceSmallImg } from '@/util';
import { getClient } from '@/util/dom';
import Item from './Item.vue';

const columnWidth = 252;

export default {
  components: {
    VirtualCollection,
    Item,
  },
  props: {
    listWidth: {
      type: Number,
      default: 0,
    },
    listHeight: {
      type: Number,
      default: getClient().height - 60,
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    identifier: {
      type: Number,
      default: +new Date(),
    },
  },
  data() {
    return {
      scrollY: 0,
      columnHeight: [],
      column: 0,
      width: this.listWidth || getClient().width,
      height: this.listHeight || getClient().height,
    };
  },
  computed: {
    ...mapGetters(['user']),
    listMap() {
      const map = new Map();
      for (const item of this.list) {
        map.set(item.id, item);
      }
      return map;
    },
  },
  watch: {
    list: {
      handler(val, old) {
        try {
          if (val.length === 0) {
            this.columnHeight = new Array(this.column).fill(0);
          } else {
            const list = val.filter((e) => !old.includes(e));
            this.handleList(list);
          }
        } catch (error) {
          console.log(error, '*******');
        }
      },
    },
    likeStatus(val) {
      // 注意 List不一定找得到item 要判断下
      const { illustId, like } = val;
      const item = this.listMap.get(illustId);
      // this.$set(item, 'isLiked', like);
      if (item) {
        this.$set(item, 'isLiked', like);
      }
    },
  },
  mounted() {
    this.waterFall();
    window.addEventListener('resize', throttle(this.waterFall));
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.waterFall);
  },
  methods: {
    setCollect(column) {
      if (!this.user.id) {
        this.$message.closeAll();
        this.$message.info('请先登录');
        return;
      }
      this.$store.dispatch('setCollectBoolean', column);
    },
    infinite($state) {
      this.$emit('infinite', $state);
    },
    cellSizeAndPositionGetter(item) {
      return {
        width: item.width,
        height: item.height,
        x: item.x,
        y: item.y,
      };
    },
    handleLike(data) {
      if (!this.user.id) {
        this.$message.closeAll();
        this.$message.info('请先登录');
        return;
      }
      const item = this.listMap.get(data.id);
      const flag = item.isLiked;
      const params = {
        userId: this.user.id,
        illustId: data.id,
        username: this.user.username,
      };
      if (!flag) {
        this.$set(item, 'isLiked', true); // 先强制视图更新 防止网络延迟不动
        this.$store
          .dispatch('handleCollectIllust', params)
          .then(() => {})
          .catch(() => {
            this.$set(item, 'isLiked', false); // 失败的话在改回去
            this.$message.closeAll();
            this.$message.error('收藏失败');
          });
      } else {
        this.$set(item, 'isLiked', false);
        this.$store
          .dispatch('deleteCollectIllust', params)
          .then(() => {})
          .catch(() => {
            this.$set(item, 'isLiked', true);
            this.$message.closeAll();
            this.$message.error('取消收藏失败');
          });
      }
    },
    waterFall() {
      this.width = this.listWidth || getClient().width;
      this.height = this.listHeight || getClient().height;
      const column = parseInt(localStorage.getItem('waterfull-column'));
      if (column) {
        this.column = column;
      } else {
        this.column = Math.min(Math.floor(this.width / columnWidth), 4);
      }
      this.columnHeight = new Array(this.column).fill(0);
      this.handleList(this.list);
    },
    handleList(list) {
      for (let i = 0; i < list.length; i++) {
        try {
          const tmp = list[i];
          const per = tmp.height / tmp.width;
          // const width = Math.floor((this.width - 100) / this.column);
          const width = 252;
          // const height = Math.max(Math.min(width * per, 400), 100);
          const height = width * per;
          // 找出最小列
          let minHeight = this.columnHeight[0];
          let index = 0;
          for (let j = 0; j < this.columnHeight.length; j++) {
            if (minHeight > this.columnHeight[j]) {
              minHeight = this.columnHeight[j];
              index = j;
            }
          }
          tmp.x = index * width;
          tmp.y = this.columnHeight[index];
          this.columnHeight[index] += height;

          tmp.height = height;
          tmp.width = width;
          tmp.src = replaceSmallImg(tmp.imageUrls[0].medium);
          tmp.style = {
            backgroundColor: randomColor(),
          };
          tmp.itemHeight = parseInt(per * this.width);
          tmp.avatarSrc = replaceBigImg(tmp.artistPreView.avatar);
          tmp.createDate = dayjs(tmp.createDate).format('YYYY-MM-DD');
          tmp.imgs = tmp.imageUrls.reduce(
            (pre, cur) => pre.concat(replaceBigImg(cur.original)),
            []
          );
          tmp.originalSrc = replaceBigImg(tmp.imageUrls[0].original);
          tmp.isad = tmp.type === 'ad_image' || tmp.type === 'donate';
        } catch (error) {
          console.log(error, '*******_!');
        }
      }
    },
  },
};
</script>

<style lang="less" scope>
.list {
  position: relative;
  background-color: #fff;
}
</style>
