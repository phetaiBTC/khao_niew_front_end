<template>
  <div id="map" style="height: 100%; width: 100%"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import L from "leaflet";

const emit = defineEmits<{
  (e: "onClick", lat: number, lng: number): void;
  (e: "location", lat: number, lng: number): void;
}>();

const clickedLat = ref<number | null>(null);
const clickedLng = ref<number | null>(null);

onMounted(() => {
  const map = L.map("map");

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  let marker: L.Marker | null = null;

  // Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        clickedLat.value = lat;
        clickedLng.value = lng;
        emit("location",lat,lng);

        map.setView([lat, lng], 13);

        marker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`คุณอยู่ที่นี่: [${lat.toFixed(5)}, ${lng.toFixed(5)}]`)
          .openPopup();
      },
      () => {
        map.setView([13.7563, 100.5018], 13); // fallback
      }
    );
  } else {
    map.setView([13.7563, 100.5018], 13); // fallback
  }

  // click map
  map.on("click", (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    clickedLat.value = lat;
    clickedLng.value = lng;
    emit("onClick", lat, lng);

    if (marker) {
      marker
        .setLatLng([lat, lng])
        .setPopupContent(`ເລືອກ: [${lat.toFixed(5)}, ${lng.toFixed(5)}]`)
        .openPopup();
    } else {
      marker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`ເລືອກ: [${lat.toFixed(5)}, ${lng.toFixed(5)}]`)
        .openPopup();
    }
  });
});
</script>
