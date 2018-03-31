<template>
  <b-table id="contributions" :data="data" :bordered="false" :striped="false" :narrowed="true"
           :hoverable="false" :mobile-cards="true">
    <template slot-scope="props">
      <b-table-column label="id" :visible="false">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column label="Date" numeric>
        {{ props.row.observationDate.toLocaleDateString() }}
      </b-table-column>
      <b-table-column label="Espèce">
        {{ props.row.woodpeckerName }}
      </b-table-column>
      <b-table-column label="IN">
        <b-tooltip :label="props.row.breedingDesc" type="is-info" position="is-right"
                   size="is-small" dashed animated multilined v-if="props.row.breedingCode">
          IN{{ props.row.breedingCode }}
        </b-tooltip>
      </b-table-column>
      <b-table-column label="Habitat">
        {{ props.row.habitat }}
      </b-table-column>
      <b-table-column label="Dominant">
        {{ props.row.dominantTree }}
      </b-table-column>
      <b-table-column label="Arbres morts ?" centered>
        <b-icon :icon="boolIcon(props.row.hasDeadTrees)"></b-icon>
      </b-table-column>
      <b-table-column label="Conifères ?" centered>
        <b-icon :icon="boolIcon(props.row.hasConifers)"></b-icon>
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContributionTable',
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
    boolIcon (bool) {
      if (bool === true) {
        return 'check'
      } else if (bool === false) {
        return 'close'
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
#contributions {
  height: 70vh;
  overflow: scroll;
}
</style>
