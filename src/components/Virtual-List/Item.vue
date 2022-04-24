<template>
  <div class="my-item">
    <div class="my-item-content" @click="goDetail">
      <image
        :src="illust?.imageUrls[0].medium | replaceSmall"
        fit="cover"
        style="height: 100%; width: 100%"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline" />
        </div>
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </image>
      <div v-if="illust?.pageCount > 1" class="count">
        <img src="../../assets/images/count.svg" />
        <span>{{ illust.pageCount }}</span>
      </div>

      <!--      <el-dropdown>-->
      <Like :like="illust?.isLiked" @handleLike="handleLike" />
      <!--        <el-dropdown-menu slot="dropdown">-->
      <!--          <el-dropdown-item @click.native="handleCollect">-->
      <!--            加到画集-->
      <!--          </el-dropdown-item>-->
      <!--        </el-dropdown-menu>-->
      <!--      </el-dropdown>-->
    </div>
  </div>
</template>

<script>
import Like from '@/components/Like/Like.vue';

export default {
  name: 'MyItem',
  components: {
    Like,
  },
  props: {
    illust: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 180,
    },
  },
  data() {
    return {
      opacity: 0,
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    handleCollect() {
      this.$emit('handle-collect', this.column);
    },
    handleLike() {
      this.$emit('handleLike', this.illust);
    },
    goDetail() {
      if (this.illust.isad) {
        window.open(this.illust.link);
      } else {
        this.$store.dispatch('setDetail', this.illust);
        if (localStorage.getItem('openNew') === 'true') {
          const routeUrl = this.$router.resolve(`/illusts/${this.illust.id}`);
          window.open(routeUrl.href, '_blank');
        } else {
          this.$router.push(`/illusts/${this.illust.id}`);
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.my-item {
  box-sizing: border-box;
  overflow: hidden;

  &-content {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 1em;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      transition: opacity 0.3s, transform 0.3s ease;
      object-fit: cover;
      border-radius: 16px;
    }
  }
  .count {
    position: absolute;
    display: inline-block;
    top: 8px;
    right: 8px;
    color: white;
    background-color: #0000009e;
    padding: 2px;
    border-radius: 4px;

    img {
      float: left;
      fill: white;
      height: 20px;
      width: 20px;
    }

    span {
      float: right;
      padding: 0 2px;
      line-height: 20px;
    }
  }
}
</style>
