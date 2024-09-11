<template>
    <div ref="card" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter" class="drop-shadow-xl">
        <slot></slot>
    </div>
  </template>
  
  <script>
  import { gsap } from 'gsap';
  
  export default {
    name: 'TiltCard',
    mounted() {
      this.card = this.$refs.card;
      this.mouseHover = false;
      this.mousePosition = { x: 0, y: 0 };
      this.cardSize = { width: 0, height: 0 };
      this.SCALE_X = 4;
      this.SCALE_Y = 8;
    },
    methods: {
      handleMouseMove(event) {
        if (!this.mouseHover) return;
        const rect = this.card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.mousePosition = { x, y };
        this.cardSize = {
          width: this.card.offsetWidth || 0,
          height: this.card.offsetHeight || 0,
        };
        gsap.to(this.card, {
          duration: 0.3,
          ease: 'power2.out',
          rotationX: ((this.mousePosition.y / this.cardSize.height) * -(this.SCALE_Y * 3) + this.SCALE_Y) + 'deg',
          rotationY: ((this.mousePosition.x / this.cardSize.width) * (this.SCALE_X * 3) - this.SCALE_X) + 'deg',
          z: 10,
        });
      },
      handleMouseLeave() {
        this.mouseHover = false;
        gsap.to(this.card, {
          duration: 0.3,
          ease: 'power2.out',
          rotationX: 0,
          rotationY: 0,
          z: 0,
        });
      },
      handleMouseEnter() {
        this.mouseHover = true;
      },
    },
  };
  </script>
  
  