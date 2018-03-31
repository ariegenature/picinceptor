<template>
  <b-table id="contributions" :data="data" :bordered="false" :striped="false" :narrowed="true"
           :hoverable="false" :mobile-cards="true" paginated :per-page="10" :current-page.sync="currentPage"
           pagination-size="is-small" detailed detail-key="id" :opened-detailed="openedObservations">
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
                   size="is-small" dashed animated multilined v-if="props.row.breedingCode">
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
import { mapGetters } from 'vuex'

export default {
  name: 'ContributionTable',
  data () {
    return {
      currentPage: 1,
      openedObservations: []
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
      'contributions'
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
    }
  }
}
</script>

<style>
#contributions {
  height: 75vh;
}
</style>
