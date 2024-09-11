<template>
    <div class="typewriter">
      <span :class="currentColorClass">{{ currentText }}</span>
      <span class="inline-block w-1 cursor">|</span>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        texts: [
            this.$t('hero.item3'),
            this.$t('hero.item4'),
            this.$t('hero.item5'),
        ],
        colors: [
        'text-red-500',    // Color class for item1
        'text-green-500',  // Color class for item2
        'text-blue-500',   // Color class for item3
        ],
        currentTextIndex: 0,
        currentText: '',
        currentIndex: 0,
        currentColorClass: 'text-red-500',
        typing: true,
        typingSpeed: 100, // Adjust typing speed (in milliseconds)
        erasingSpeed: 60, // Adjust erasing speed (in milliseconds)
        pauseDuration: 1200, // Duration to pause between typing and erasing (in milliseconds)
      };
    },
    mounted() {
      this.typeWriter();
    },
    methods: {
      typeWriter() {
        if (this.typing) {
          if (this.currentIndex < this.texts[this.currentTextIndex].length) {
            this.currentText += this.texts[this.currentTextIndex].charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(this.typeWriter, this.typingSpeed);
          } else {
            // Pause before starting erasing
            setTimeout(() => {
              this.typing = false;
              this.eraseText();
            }, this.pauseDuration);
          }
        } else {
          if (this.currentIndex > 0) {
            this.currentText = this.currentText.slice(0, -1);
            this.currentIndex--;
            setTimeout(this.eraseText, this.erasingSpeed);
          } else {
            // Move to the next text or loop back to the first text
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            this.currentColorClass = this.colors[this.currentTextIndex]; // Update Tailwind color class
            this.typing = true;
            setTimeout(this.typeWriter, this.typingSpeed);
          }
        }
      },
      eraseText() {
        this.typeWriter();
      },
    },
  };
  </script>
  
  <style scoped>
  .cursor {
    animation: blink 1s infinite; /* blinking animation */
  }
  
  @keyframes blink {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
  </style>
  