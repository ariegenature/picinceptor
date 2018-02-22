<template>
  <main class="hero is-fullheight">
  <div id="hero-map" class="hero-body">
    <div id="container-map" class="container is-fluid">
      <div id="map">
        <contribute-map></contribute-map>
      </div>
    </div>
  </div>
  </main>
</template>

<script>
import ContributeMap from './ContributeMap'

export default {
  name: 'ContributePage',
  components: {
    ContributeMap
  }
}
</script>

<style>
#hero-map, #container-map {
  height: 100%;
}
#map {
  height: 90%;
}
</style>
