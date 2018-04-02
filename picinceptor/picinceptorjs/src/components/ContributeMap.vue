<template>
  <v-map ref="map" :zoom="zoom" :center="center"
         @l-draw-created="emitMarkerCreated"
         @l-popupopen="selectFeature" @l-popupclose="unselectFeature">
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
          if (feature.properties.breedingCode !== 0) {
            return L.circleMarker(latlng, {
              radius: 4,
              weight: 1,
              color: '#7A3432',
              opacity: 1,
              fillColor: feature.properties.color,
              fillOpacity: 1,
              className: 'contribution'
            })
          } else {
            return L.marker(latlng, { icon: L.divIcon({ className: 'icon', html: '<span style="color: #8b0000"><i class="mdi mdi-close mdi-12px"></i></span>' }) })
          }
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
      'contributions',
      'selectedFeatureId'
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
    selectFeature (ev) {
      this.$refs.contribution.mapObject.eachLayer((layer) => {
        if (layer.isPopupOpen()) {
          this.updateSelectedFeatureId(layer.feature.id)
        }
      })
    },
    unselectFeature (ev) {
      this.updateSelectedFeatureId(null)
    },
    ...mapActions([
      'updateSelectedFeatureId'
    ]),
    ...mapActions('map', [
      'setClickLatLng'
    ])
  },
  watch: {
    selectedFeatureId: {
      handler (val, oldVal) {
        this.$refs.contribution.mapObject.eachLayer((layer) => {
          if (layer.feature.id === this.selectedFeatureId) {
            layer.openPopup()
          }
        })
      }
    }
  }
}
</script>
