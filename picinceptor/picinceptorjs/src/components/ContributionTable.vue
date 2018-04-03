<template>
  <b-table id="contributions" :data="data" :bordered="false" :striped="false" :narrowed="true"
           :hoverable="true" :mobile-cards="true" paginated :per-page="10" :current-page.sync="currentPage"
           pagination-size="is-small" detailed detail-key="id" :opened-detailed="openedObservations"
           :selected.sync="selectedFeature" focusable>
    <template slot-scope="props">
      <b-table-column label="id" :visible="false">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column label="Date" numeric>
        {{ props.row.observationDate.toLocaleDateString() }}
      </b-table-column>
      <b-table-column label="Espèce">
        <span :style="{ color: props.row.color }">&bull;</span>
        {{ props.row.woodpeckerName }}
      </b-table-column>
      <b-table-column label="IN">
        <b-tooltip :label="props.row.breedingDesc" type="is-info" position="is-left"
                   size="is-small" dashed animated multilined v-if="props.row.breedingCode !== null">
          IN{{ props.row.breedingCode }}
        </b-tooltip>
      </b-table-column>
      <b-table-column label="Habitat">
        {{ props.row.habitat }}
      </b-table-column>
    </template>
    <template slot="detail" slot-scope="props">
      <div class="media is-size-7">
        <div class="media-left">
          <figure class="image is-64x64">
            <img :alt="props.row.woodpeckerName" :src="props.row.woodpeckerImg">
          </figure>
        </div>
        <div class="media-content" v-if="hasRowDetails(props.row)">
          <div class="content">
            <p><strong>Précisions habitat forestier&nbsp;:</strong>
            <ul class="is-lowercase">
              <li>espèce dominante&nbsp;: {{ props.row.dominantTree }}&nbsp;;</li>
              <li>{{ deadTreesStr(props.row.hasDeadTrees) }}&nbsp;;</li>
              <li>{{ coniferStr(props.row.hasConifers) }}.</li>
            </ul></p>
          </div>
        </div>
      </div>
    </template>
  </b-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ContributionTable',
  data () {
    return {
      currentPage: 1,
      openedObservations: [],
      selectedFeature: null
    }
  },
  computed: {
    data () {
      if (!this.contributions || !this.contributions.features) {
        return []
      }
      var res = []
      this.contributions.features.forEach((feature) => {
        res.push(Object.assign({}, { id: feature.id }, feature.properties))
      })
      return res
    },
    ...mapGetters([
      'contributions',
      'selectedFeatureId'
    ])
  },
  methods: {
    displayCount (accuracy, count) {
      if (accuracy === '=') {
        return count
      } else {
        return `${accuracy} ${count}`
      }
    },
    deadTreesStr (val) {
      return val ? 'Arbres morts au sol' : "Pas d'arbre mort au sol"
    },
    coniferStr (val) {
      return val ? 'Présence de conifères' : 'Pas de conifère'
    },
    hasRowDetails (row) {
      return row.habitat === 'Forêt'
    },
    ...mapActions([
      'updateSelectedFeatureId'
    ])
  },
  watch: {
    selectedFeature: {
      handler (val, oldVal) {
        if (this.selectedFeature === null) {
          this.updateSelectedFeatureId(null)
        } else {
          this.updateSelectedFeatureId(this.selectedFeature.id)
        }
      }
    },
    selectedFeatureId: {
      handler (val, oldVal) {
        if (this.selectedFeatureId === null) {
          this.selectedFeature = null
        } else {
          var selectedFeature = this.data.find((feature) => feature.id === this.selectedFeatureId)
          this.selectedFeature = selectedFeature
        }
      }
    }
  }
}
</script>

<style>
#contributions {
  height: 75vh;
}
</style>
