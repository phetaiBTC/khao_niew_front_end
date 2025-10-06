<template>
  <div id="map" style="height: 100%; width: 100%"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import L from "leaflet";

const props = defineProps<{
  modelValueLat: number | null;
  modelValueLng: number | null;
}>();
const emit = defineEmits<{
  (e: "update:modelValueLat", val: number): void;
  (e: "update:modelValueLng", val: number): void;
}>();

onMounted(() => {
  const map = L.map("map");
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  let marker: L.Marker | null = null;

  // initial position
  const initLat = props.modelValueLat ?? 13.7563;
  const initLng = props.modelValueLng ?? 100.5018;
  map.setView([initLat, initLng], 13);

  marker = L.marker([initLat, initLng]).addTo(map);

  // geolocation only if props are null
  if (
    props.modelValueLat == 0 &&
    props.modelValueLng == 0 &&
    navigator.geolocation
  ) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      map.setView([lat, lng], 13);
      marker!.setLatLng([lat, lng]);
      emit("update:modelValueLat", lat);
      emit("update:modelValueLng", lng);
    });
  }

  // click map
  map.on("click", (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    marker!.setLatLng([lat, lng]);
    emit("update:modelValueLat", lat);
    emit("update:modelValueLng", lng);
  });

  // watch parent props → update marker
  watch(
    () => [props.modelValueLat, props.modelValueLng],
    ([lat, lng]) => {
      if (lat != null && lng != null && marker) {
        marker.setLatLng([lat, lng]);
        map.setView([lat, lng], map.getZoom());
      }
    }
  );
});
</script>
