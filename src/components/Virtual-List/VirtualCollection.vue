<style lang="less" scoped>
.vue-virtual-collection {
  overflow-y: scroll;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  &-container {
    position: relative;
    margin: 10px auto;
  }
  .cell-container {
    position: absolute;
    top: 0;
  }
}
</style>

<template>
  <div
    ref="outer"
    class="vue-virtual-collection"
    :style="outerStyle"
    @scroll.passive="onScroll"
  >
    <slot />
    <div
      ref="scrollContent"
      class="vue-virtual-collection-container"
      :style="containerStyle"
    >
      <div
        v-for="item in displayItems"
        :key="item.id"
        class="cell-container"
        :style="getComputedStyle(item)"
      >
        <slot name="cell" :data="item" />
      </div>
    </div>
    <infinite-loading :identifier="identifier" @infinite="infinite">
      <div slot="no-more" />
      <div slot="no-results" style="margin-top: 50px">
        <svg font-size="160" class="icon" aria-hidden="true">
          <use xlink:href="#pickongtai1" />
        </svg>
        <p style="color: #e3f2fa; font-size: 20px">没有内容</p>
      </div>
    </infinite-loading>
    <!-- <el-backtop target=".vue-virtual-collection" :bottom="64" /> -->
  </div>
</template>

<script>
import InfiniteLoading from 'v3-infinite-loading';
import throttle from 'lodash/throttle';
import GroupManager from './GroupManager';

export default {
  components: {
    InfiniteLoading,
  },
  props: {
    cellSizeAndPositionGetter: {
      type: Function,
      required: true,
    },
    collection: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 0;
      },
    },
    width: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 0;
      },
    },
    sectionSize: {
      type: Number,
      default: 300,
    },
    identifier: {
      type: Number,
      default: +new Date(),
    },
  },
  data() {
    return {
      totalHeight: 0,
      totalWidth: 0,
      displayItems: [],
      scrollY: 0,
    };
  },
  computed: {
    containerStyle() {
      return {
        height: `${this.totalHeight}px`,
        width: `${this.totalWidth}px`,
      };
    },
    outerStyle() {
      return {
        height: `${this.height}px`,
        width: `${this.width}px`,
      };
    },
  },
  watch: {
    collection() {
      this.resetCollection();
    },
    $route: {
      handler() {
        // 跳转其他页面后保持scroll高度
        this.$refs.outer.scrollTop = this.scrollY;
        // console.log(this.scrollY);
      },
    },
  },
  created() {
    this.groupManagers = [];
    this.onCollectionChanged();
  },
  mounted() {
    if (ResizeObserver) {
      this.resizeObserver = new ResizeObserver(this.onContainerResized);
      this.resizeObserver.observe(this.$refs.outer);
    } else {
      this.$refs.outer.addEventListener('resize', this.onContainerResized);
    }
    console.log(this.scrollY);
  },
  beforeDestroy() {
    if (ResizeObserver) {
      this.resizeObserver.disconnect();
    } else {
      this.$refs.outer.removeEventListener('resize', this.onContainerResized);
    }
  },
  methods: {
    infinite($state) {
      throttle(() => {
        this.$emit('infinite', $state);
      }, 1000);
      this.$emit('infinite', $state);
    },
    contentStyle() {
      return {
        width: `${252 * this.column}px`,
        height: `${this.totalHeight}px`,
      };
    },
    swipe(direction) {
      switch (direction) {
        case 'Up':
          if (!this.showTab || this.$refs.outer.scrollTop < 100) return;
          this.$store.dispatch('changeTab', false);
          break;
        case 'Down':
          if (this.showTab) return;
          this.$store.dispatch('changeTab', true);
          break;
      }
    },
    resetCollection() {
      // Dispose previous groups and reset associated data
      this.groupManagers.forEach((manager) => manager.dispose());
      this.groupManagers = [];
      this.totalHeight = 0;
      this.totalWidth = 0;

      this.onCollectionChanged();
    },
    onCollectionChanged() {
      let { collection } = this;

      // If the collection is flat, wrap it inside a single group
      if (collection.length > 0 && collection[0].group === undefined) {
        collection = [{ group: collection }];
      }

      // Create and store managers for each item group
      collection.forEach((groupContainer, i) => {
        const groupIndex = i; // Capture group index for closure
        const unwatch = this.$watch(
          () => groupContainer,
          () => this.onGroupChanged(groupContainer.group, groupIndex),
          { deep: true }
        );

        this.groupManagers.push(
          new GroupManager(
            groupContainer.group,
            groupIndex,
            this.sectionSize,
            this.cellSizeAndPositionGetter,
            unwatch
          )
        );
      });

      this.updateGridDimensions();
      this.flushDisplayItems();
    },
    updateGridDimensions() {
      this.totalHeight = Math.max(
        ...this.groupManagers.map((it) => it.totalHeight)
      );
      this.totalWidth = Math.max(
        ...this.groupManagers.map((it) => it.totalWidth)
      );
    },
    onGroupChanged(group, index) {
      this.groupManagers[index].updateGroup(group);
      this.updateGridDimensions();
      this.flushDisplayItems();
    },
    getComputedStyle(displayItem) {
      if (!displayItem) return;

      // Currently displayed items may no longer exist
      // if collection has been modified since
      const groupManager = this.groupManagers[displayItem.groupIndex];
      if (!groupManager) return;

      const cellMetadatum = groupManager.getCellMetadata(displayItem.itemIndex);
      if (!cellMetadatum) return;

      const { width, height, x, y } = cellMetadatum;
      return {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      };
    },
    scrollToTop() {
      this.$refs.outer.scrollTop = 0;
    },
    onScroll(e) {
      this.flushDisplayItems();
      this.scrollY = this.$refs.outer.scrollTop;
    },
    activated() {
      this.$refs.outer.scrollTop = this.scrollY;
    },
    onContainerResized() {
      this.resetCollection();
    },
    flushDisplayItems() {
      let scrollTop = 0;
      let scrollLeft = 0;
      if (this.$refs.outer) {
        scrollTop = this.$refs.outer.scrollTop;
        scrollLeft = this.$refs.outer.scrollLeft;
      }

      const displayItems = [];
      this.groupManagers.forEach((groupManager, groupIndex) => {
        const indices = groupManager.getCellIndices({
          height: this.height,
          width: this.width,
          x: scrollLeft,
          y: scrollTop,
        });

        indices.forEach((itemIndex) => {
          displayItems.push(
            Object.freeze({
              groupIndex,
              itemIndex,
              key: displayItems.length,
              ...groupManager.getItem(itemIndex),
            })
          );
        });
      });

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          this.displayItems = displayItems;
          this.$forceUpdate();
        });
      } else {
        this.displayItems = displayItems;
        this.$forceUpdate();
      }
    },
  },
};
</script>
