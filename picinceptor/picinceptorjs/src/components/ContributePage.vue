<template>
  <main class="hero is-fullheight">
  <div id="hero-map" class="hero-body">
    <div id="container-map" class="container is-fluid">
      <div id="map">
        <contribute-map @marker-created="showForm"></contribute-map>
      </div>
    </div>
  </div>
  <b-modal id="modal-form" :active.sync="isFormActive">
    <contribute-form @form-complete="closeForm"></contribute-form>
  </b-modal>
  </main>
</template>

<script>
import ContributeForm from './ContributeForm'
import ContributeMap from './ContributeMap'

export default {
  name: 'ContributePage',
  components: {
    ContributeForm,
    ContributeMap
  },
  data () {
    return {
      isFormActive: false
    }
  },
  methods: {
    showForm (lEv) {
      this.isFormActive = true
    },
    closeForm (ev) {
      this.isFormActive = false
    }
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
.modal {
  z-index: 1000 !important;
}
.modal-content {
  background-color: rgba(245, 245, 245, 1);
}
</style>
