<template>
  <v-map ref="map" :zoom="zoom" :center="center">
    <v-tilelayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution="OpenStreetMap contributors"></v-tilelayer>
  </v-map>
</template>

<script>
export default {
  name: 'ContributeMap',
  data () {
    return {
      center: [42.857846, 0.626220],
      zoom: 8
    }
  }
}
</script>
