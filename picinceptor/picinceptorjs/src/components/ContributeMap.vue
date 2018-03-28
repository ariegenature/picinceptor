<template>
  <v-map ref="map" :zoom="zoom" :center="center"
         @l-draw-created="emitMarkerCreated">
    <v-tilelayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution="OpenStreetMap contributors"></v-tilelayer>
    <v-marker :lat-lng="clickLatLng" v-if="hasBeenClicked"></v-marker>
    <leaflet-draw :marker="true" :polyline="false" :polygon="false" :rectangle="false"
                  :circle="false" :circle-marker="false"></leaflet-draw>
  </v-map>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
  },
  computed: {
    hasBeenClicked () {
      return this.clickLatLng !== null
    },
    ...mapGetters('map', [
      'clickLatLng'
    ])
  },
  methods: {
    emitMarkerCreated (ev) {
      this.setClickLatLng(ev.layer._latlng)
      this.$emit('marker-created', ev)
    },
    ...mapActions('map', [
      'setClickLatLng'
    ])
  }
}
</script>
