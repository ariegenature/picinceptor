<template>
  <main class="hero is-fullheight">
  <div class="hero-head">
    <navbar></navbar>
  </div>
  <div id="hero-map" class="hero-body">
    <div id="container-map" class="container is-fluid">
      <div class="columns">
        <div class="column is-three-fifths">
          <div id="map">
            <contribute-map @marker-created="openForm"></contribute-map>
          </div>
        </div>
        <div class="column">
          <div class="content">
            <p class="title is-6">Observations récentes</p>
          </div>
          <contribution-table></contribution-table>
        </div>
      </div>
    </div>
  </div>
  <b-modal id="modal-form" :active.sync="isFormActive">
    <contribute-form @form-complete="closeForm"></contribute-form>
  </b-modal>
  <b-modal id="modal-help" :active.sync="isHelpShown" :onCancel="toggleHelp" has-modal-card>
    <help></help>
  </b-modal>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ContributeForm from './ContributeForm'
import ContributeMap from './ContributeMap'
import ContributionTable from './ContributionTable'
import Help from './Help'
import Navbar from './Navbar'

export default {
  name: 'ContributePage',
  components: {
    ContributeForm,
    ContributeMap,
    ContributionTable,
    Help,
    Navbar
  },
  data () {
    return {
      isFormActive: false
    }
  },
  computed: mapGetters([
    'isHelpShown'
  ]),
  methods: {
    async updateContributions () {
      try {
        var response = await this.$get('api/observation')
        this.setContributions(response.data)
      } catch (e) {
        console.log(e)
        this.$toast.open({
          duration: 5000,
          message: "Une erreur s'est produite. Veuillez contacter un administrateur.",
          type: 'is-danger'
        })
      }
    },
    openForm (ev) {
      this.isFormActive = true
    },
    closeForm (ev) {
      this.isFormActive = false
      this.updateContributions()
      this.clearClickLatLng()
    },
    ...mapActions([
      'setContributions',
      'toggleHelp'
    ]),
    ...mapActions('map', [
      'clearClickLatLng'
    ])
  },
  created () {
    this.updateContributions()
  }
}
</script>

<style>
#hero-map, #container-map {
  height: 100%;
}
#map {
  height: 80vh;
}
.modal {
  z-index: 1000 !important;
}
.modal-content {
  background-color: rgba(245, 245, 245, 1);
}
</style>
