<template>
  <RouterLink :to="linkTo">
    <div
      class="relative flex items-center w-full overflow-hidden sm:py-2.5 sm:px-8 h-fit"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    >
      <button
        class="relative flex items-center justify-center text-sm font-bold px-4 py-2.5 overflow-hidden text-white dark:text-stone-900 rounded-full magnetic-button bg-stone-900 dark:bg-stone-100 before:absolute before:bottom-0 before:left-[50%] before:w-[200%] before:h-[200%] before:bg-white dark:before:bg-stone-900 w-full h-fit border-2 border-stone-900 dark:border-white sm:w-fit"
        :style="buttonStyle"
        :class="{ sway: isSwaying, 'hover-effect text-zinc-900 dark:text-white': isHovering }"
        @mouseenter="onMouseEnter"
      >
        <!-- Icon slot controlled by props -->
        <div v-if="showIcon" class="mr-2" :style="textStyle">
          <component :is="icon" />
        </div>
        <span class="inline-block transition-transform duration-200 ease-out" :style="textStyle">
          {{ text }}
        </span>
      </button>
    </div>
  </RouterLink>
</template>


<script>
import { markRaw } from 'vue';

export default {
  props: {
    linkTo: {
      type: String,
      required: true,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: [Object, Function],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      buttonPosition: { x: 0, y: 0 },
      buttonOffset: { x: 0, y: 0 },
      textOffset: { x: 0, y: 0 },
      isSwaying: false,
      isHovering: false,
      rawIcon: markRaw(this.icon), // Ensure icon is marked raw here
    };
  },
  computed: {
    buttonStyle() {
      return {
        transform: `translate(${this.buttonOffset.x}px, ${this.buttonOffset.y}px)`,
      };
    },
    textStyle() {
      return {
        transform: `translate(${this.textOffset.x}px, ${this.textOffset.y}px)`,
      };
    },
  },
  methods: {
    onMouseMove(event) {
      const button = this.$el.querySelector('.magnetic-button');
      const buttonRect = button.getBoundingClientRect();
      const containerRect = this.$el.getBoundingClientRect();

      const mouseX = event.clientX - containerRect.left;
      const mouseY = event.clientY - containerRect.top;

      const buttonX = buttonRect.left + buttonRect.width / 2 - containerRect.left;
      const buttonY = buttonRect.top + buttonRect.height / 2 - containerRect.top;

      const distX = mouseX - buttonX;
      const distY = mouseY - buttonY;

      this.buttonOffset = {
        x: distX * 0.3,
        y: distY * 0.3,
      };

      this.textOffset = {
        x: distX * 0.15,
        y: distY * 0.15,
      };

      this.isSwaying = false;
      this.isHovering = true;
    },
    onMouseLeave() {
      this.buttonOffset = { x: 0, y: 0 };
      this.textOffset = { x: 0, y: 0 };
      this.isHovering = false;
      this.triggerSwayEffect();
    },
    onMouseEnter() {
      this.isHovering = true;
    },
    triggerSwayEffect() {
      this.isSwaying = true;
      setTimeout(() => {
        this.isSwaying = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.magnetic-button {
  transition: color 0.4s ease-out;
  z-index: 1;
}

.magnetic-button::before {
  border-radius: 50% 50% 0 0;
  transform: translate(-50%, 100%);
  transition: transform 0.4s ease-out;
  z-index: -1;
}

.magnetic-button.hover-effect::before {
  transform: translate(-50%, 0%);
}


.magnetic-button.sway {
  animation: sway 1s ease-out;
}

@keyframes sway {
  0% {
    transform: translate(0px, 0px);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(2px, -1px);
  }
  60% {
    transform: translate(-1px, 1px);
  }
  80% {
    transform: translate(1px, 0px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
</style>
