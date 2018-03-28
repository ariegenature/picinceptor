<template>
  <v-map ref="map" :zoom="zoom" :center="center"
         @l-draw-created="emitMarkerCreated">
    <v-tilelayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution="OpenStreetMap contributors"></v-tilelayer>
    <v-geojson-layer ref="contribution" :geojson="contributions"
                     :options="contributionLayerOptions"></v-geojson-layer>
    <v-marker :lat-lng="clickLatLng" v-if="hasBeenClicked"></v-marker>
    <leaflet-draw :marker="true" :polyline="false" :polygon="false" :rectangle="false"
                  :circle="false" :circle-marker="false"></leaflet-draw>
  </v-map>
</template>

<script>
import L from 'leaflet'
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
      zoom: 8,
      contributionLayerOptions: {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 4,
            weight: 1,
            color: '#7A3432',
            opacity: 1,
            fillColor: feature.properties.color,
            fillOpacity: 1,
            className: 'contribution'
          })
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup(`<div class="media">
            <div class="media-left">
            <figure class="image is-32x32">
            <img alt="${feature.properties.woodpeckerName}" src="${feature.properties.woodpeckerImg}">
            </figure>
            </div>
            <div class="media-content">
            <div class="content">
            <p style="margin-top: 0; margin-bottom: 0">
            <strong><span style="color: ${feature.properties.color}">${feature.properties.woodpeckerName}</span></strong>&nbsp;<small>[<span class="has-text-info">IN${feature.properties.breedingCode}]</span></small>
            <br>
            <small>
            <span class="has-text-info">${feature.properties.observationDate.toLocaleDateString()}&nbsp;</span>
            <span class="has-text-grey">&ndash;&nbsp;</span>
            <span class="has-text-grey">habitat&nbsp;:&nbsp;</span>
            <span class="has-text-info">${feature.properties.habitat}</span>
            </small>
            </p>
            </div>
            </div>
            </div>`)
        }
      }
    }
  },
  computed: {
    hasBeenClicked () {
      return this.clickLatLng !== null
    },
    ...mapGetters([
      'contributions'
    ]),
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
