<template>
  <main class="hero is-fullheight">
  <div id="hero-map" class="hero-body">
    <div id="container-map" class="container is-fluid">
      <div id="map">
        <contribute-map @marker-created="openForm"></contribute-map>
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
    async updateContributions () {
      try {
        var response = await this.$get('observation')
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
    },
    ...mapActions([
      'setContributions'
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
  height: 90%;
}
.modal {
  z-index: 1000 !important;
}
.modal-content {
  background-color: rgba(245, 245, 245, 1);
}
</style>
