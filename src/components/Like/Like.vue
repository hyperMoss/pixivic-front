<template>
  <div :class="['like', { 'is-like': like }]" @click.stop.prevent="handleLike">
    <svg
      id="heart-svg"
      :style="{ width: width + 'px' }"
      viewBox="467 392 58 57"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Group"
        fill="none"
        fill-rule="evenodd"
        transform="translate(467 392)"
      >
        <path
          id="heart"
          d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
          fill="#AAB8C2"
        />
        <circle
          id="main-circ"
          fill="#E2264D"
          opacity="0"
          cx="29.5"
          cy="29.5"
          r="1.5"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Like',
  props: {
    like: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 50,
    },
  },
  methods: {
    handleLike() {
      this.$emit('handleLike');
    },
  },
};
</script>
<style lang="less" scoped>
.like {
  position: absolute;
  bottom: -10px;
  right: -5px;
  will-change: transform;
  svg {
    width: 50px;
    overflow: visible;

    #heart {
      transform-origin: center;
      animation: animateHeartOut 0.3s linear forwards;
    }

    #main-circ {
      transform-origin: 29.5px 29.5px;
    }
  }
}

.is-like {
  svg {
    width: 50px;

    #heart {
      fill: #e2264d;
      animation: animateHeart 0.3s linear forwards 0.25s;
    }

    #main-circ {
      transition: all 2s;
      animation: animateCircle 0.3s linear forwards;
    }
  }
}
</style>
