<template>
  <v-map ref="map" :zoom="zoom" :center="center">
    <v-tilelayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution="OpenStreetMap contributors"></v-tilelayer>
    <leaflet-draw :marker="true" :polyline="false" :polygon="false" :rectangle="false"
                  :circle="false" :circle-marker="false"></leaflet-draw>
  </v-map>
</template>

<script>
import LeafletDraw from './LeafletDraw'

export default {
  name: 'ContributeMap',
  components: {
    LeafletDraw
  },
  data () {
    return {
      center: [42.857846, 0.626220],
      zoom: 8
    }
  }
}
</script>
