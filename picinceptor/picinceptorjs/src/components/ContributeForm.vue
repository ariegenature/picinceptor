<template>
  <form id="contribute-form" method="POST" accept-charset="UTF-8" v-on:submit.prevent>
    <form-wizard ref="wizard" title="Pics des Pyrénées" subtitle="Nouvelle observation"
                 step-size="xs" next-button-text="Suivant" back-button-text="Retour"
                 finish-button-text="Terminer" @on-complete="submitForm">
      <tab-content title="Date">
        <div class="columns is-mobile is-centered">
          <div class="column is-narrow has-text-centered">
            <b-field>
              <b-datepicker inline size="is-small" v-model="observationDate"
                            :month-names="monthNames" :day-names="dayNames"
                            :first-day-of-week="1"></b-datepicker>
            </b-field>
          </div>
        </div>
      </tab-content>
      <tab-content title="Espèce de pic">
        <p>Choix de l'espèce de pic.</p>
      </tab-content>
      <tab-content title="Indice de nidification">
        <p>Indice de nidification.</p>
      </tab-content>
      <tab-content title="Habitat observé">
        <p>Description de l'habitat observé.</p>
      </tab-content>
      <tab-content title="Coordonnées">
        <p>Coordonnées de l'observateur.</p>
      </tab-content>
    </form-wizard>
  </form>
</template>

<script>
const MONTH_NAMES = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août',
  'Septembre', 'Octobre', 'Novembre', 'Décembre']
const DAY_NAMES = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.']

export default {
  name: 'ContributeForm',
  data () {
    return {
      monthNames: MONTH_NAMES,
      dayNames: DAY_NAMES,
      observationDate: new Date()
    }
  },
  methods: {
    submitForm () {
      this.$emit('form-complete')
    }
  }
}
</script>
