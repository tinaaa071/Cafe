<template>
    <div class="frame h-[800px] bg-center bg-cover" :style="{ backgroundImage: imageUrl }">
        <Navbar />
    </div>
</template>

<script>
export default {
data() {
    return {
    imageUrl: 'https://unsplash.it/600/600', // Initial image URL
    alternateImageUrl: 'https://unsplash.it/601/601', // Alternate image URL
    animate: true // Whether to animate or not
    };
},
mounted() {
    if (this.animate) {
    setInterval(this.toggleImage, 2000); // Change image every 2 seconds
    }
},
methods: {
    toggleImage() {
    this.imageUrl = this.imageUrl === this.alternateImageUrl
        ? 'https://unsplash.it/600/600'
        : this.alternateImageUrl;
    }
}
};
</script>

<style scoped>
.frame {
animation: image 5s ease-in-out infinite alternate;
}

@keyframes image {
0% {
    background-image: url('https://unsplash.it/600/600');
}
50% {
    background-image: url('https://unsplash.it/602/602');
}
100% {
    background-image: url('https://unsplash.it/601/601');
}
}
</style>
  