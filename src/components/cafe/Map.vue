<template>
    <div :id="mapId" class="aspect-video"></div>
  </template>
  
  <script setup>
  import { onMounted, ref, onBeforeUnmount, watch } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css'; // 引入 Leaflet 樣式
  
  const props = defineProps({
    cafes: {
      type: Array,
      default: () => [],
    },
  });
  
  // 設定唯一的 mapId 以避免多重初始化衝突
  const mapId = `map-${Math.random().toString(36).substr(2, 9)}`;
  const mapInstance = ref(null);
  const marker = ref(null);
  
  // 自訂圖示的路徑
  const customIcon = L.icon({
    iconUrl: '/icons/marker-icon.png', // 這裡是相對於 public 文件夾的路徑
    iconSize: [25, 41], // 圖示的尺寸
    iconAnchor: [12, 41], // 圖示的錨點位置
    popupAnchor: [1, -34] // 彈出框的錨點位置
  });
  
  // 初始化地圖
  const initMap = () => {
    if (props.cafes.length === 0) return;
  
    // 取得第一筆餐廳資料作為地圖中心點
    const cafe = props.cafes[0];
    const latitude = parseFloat(cafe.latitude);
    const longitude = parseFloat(cafe.longitude);
  
    // 初始化地圖
    mapInstance.value = L.map(mapId).setView([latitude, longitude], 15);
  
    // 添加地圖圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance.value);
  
    // 添加標記
    marker.value = L.marker([latitude, longitude], { icon: customIcon })
      .addTo(mapInstance.value)
      .bindPopup(`<strong>${cafe.name}</strong><br>${cafe.address}<br><a href="${cafe.url}" target="_blank">更多資訊</a>`)
      .openPopup();
  };
  
  onMounted(() => {
    initMap();
  });
  
  watch(
    () => props.cafes,
    (newCafes) => {
      // 當 cafes 資料更新時，重新設定標記
      if (newCafes.length > 0 && mapInstance.value) {
        const cafe = newCafes[0];
        const latitude = parseFloat(cafe.latitude);
        const longitude = parseFloat(cafe.longitude);
  
        mapInstance.value.setView([latitude, longitude], 15);
  
        // 移除舊的標記
        if (marker.value) {
          mapInstance.value.removeLayer(marker.value);
        }
  
        // 添加新的標記
        marker.value = L.marker([latitude, longitude], { icon: customIcon })
          .addTo(mapInstance.value)
          .bindPopup(`<strong>${cafe.name}</strong><br>${cafe.address}<br><a href="${cafe.url}" target="_blank">更多資訊</a>`)
          .openPopup();
      }
    }
  );
  
  onBeforeUnmount(() => {
    // 銷毀地圖實例以防止內存洩漏
    if (mapInstance.value) {
      mapInstance.value.remove();
      mapInstance.value = null;
    }
  });
  </script>

  