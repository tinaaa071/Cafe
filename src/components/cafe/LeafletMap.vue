<!-- src/components/LeafletMap.vue -->
<template>
    <div id="map" class="map-container"></div>
  </template>
  
  <script setup>
  import { onMounted, defineProps } from 'vue';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';

  
  const props = defineProps({
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  });
  
  onMounted(() => {
    const { lat, lng } = props;
  
    // 初始化地圖
    const map = L.map('map').setView([lat, lng], 13); // 設置地圖中心和縮放級別
  
    // 添加 OpenStreetMap 瓷磚層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // 添加地點標記
    L.marker([lat, lng]).addTo(map)
      .bindPopup('This is your location')
      .openPopup();
  });
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 400px;
  }
  </style>
  