<template>
  <main class="hero is-fullheight">
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
            <contribution-table></contribution-table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <b-modal id="modal-form" :active.sync="isFormActive">
    <contribute-form @form-complete="closeForm"></contribute-form>
  </b-modal>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import ContributeForm from './ContributeForm'
import ContributeMap from './ContributeMap'
import ContributionTable from './ContributionTable'

export default {
  name: 'ContributePage',
  components: {
    ContributeForm,
    ContributeMap,
    ContributionTable
  },
  data () {
    return {
      isFormActive: false
    }
  },
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
      'setContributions'
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
