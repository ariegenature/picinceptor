<template>
  <form id="contribute-form" method="POST" accept-charset="UTF-8" v-on:submit.prevent>
    <form-wizard ref="wizard" title="" subtitle="" step-size="xs"
                 next-button-text="Suivant" back-button-text="Retour"
                 finish-button-text="Terminer" @on-change="handleStepChange"
                 @on-complete="submitForm">
      <tab-content title="Date" :before-change="checkDateNotNull">
        <div class="columns is-mobile is-centered">
          <div class="column is-narrow has-text-centered">
            <b-field>
              <b-datepicker inline size="is-small" v-model="data.observationDate"
                            :month-names="monthNames" :day-names="dayNames"
                            :first-day-of-week="1" @input="nextTab"></b-datepicker>
            </b-field>
          </div>
        </div>
      </tab-content>
      <tab-content title="Espèce de pic" :before-change="checkWoodpeckerNotNull">
        <div class="columns is-multiline is-centered">
          <div class="column is-one-third has-text-centered" v-for="woodpecker in woodpeckers"
            :item="woodpecker" :key="woodpecker.id">
            <b-radio href="#" size="is-small" v-model="data.woodpeckerId"
                     :native-value="woodpecker.id" @input="nextTab">
              <figure class="image is-64x64 block-center">
                <img :alt="woodpecker.name" :src="woodpecker.img">
              </figure>
              <p class="is-size-7">{{ woodpecker.name }}</p>
            </b-radio>
          </div>
        </div>
        <hr>
        <div class="columns is-centered">
          <div class="column has-text-centered">
            <div class="content">
              <p class="is-size-7">
              Un doute&nbsp;? Téléchargez les
              <a target="_blank"
                 href="https://ariegenature.fr/wp-content/uploads/2017/03/identification_pics.pdf">
                fiches d'identification
              </a>&nbsp;!
              </p>
            </div>
          </div>
        </div>
      </tab-content>
      <tab-content title="Indice de nidification" :before-change="checkIndexNotNull">
        <div class="columns is-multiline is-centered">
          <div class="column is-half is-narrow" v-for="index in nestingIndices" :key="index.id">
            <b-radio href="#" size="is-small" v-model="data.nestingIndex"
                     :native-value="index.id" @input="nextTab">
              <p class="is-size-7">{{ index.name }}&nbsp;[IN{{ index.id }}]</p>
            </b-radio>
          </div>
        </div>
      </tab-content>
      <tab-content title="Habitat observé" :before-change="checkHabitatComplete">
        <div class="columns">
          <div class="column is-one-third is-narrow">
            <b-field label="Type d'habitat">
              <b-select placeholder="Sélectionnez un habitat" icon="view-list"
                        size="is-small" expanded v-model="data.habitat" @input="habitatChanged">
                <option v-for="hab in habitats" :value="hab" :key="hab">
                    {{ hab }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-one-third is-narrow" v-if="data.habitat === 'Forêt'">
            <b-field label="Espèce dominante">
              <b-select placeholder="Sélectionnez une espèce d'arbre" icon="view-list"
                        size="is-small" expanded v-model="data.dominant">
                <option v-for="treeType in dominantSpecies" :value="treeType" :key="treeType">
                    {{ treeType }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-one-third is-narrow" v-if="data.habitat === 'Forêt'">
            <div class="field">
              <b-switch  size="is-small" v-model="data.hasDeadTrees">
                {{ deadTreesStr }}
              </b-switch>
            </div>
            <div class="field">
              <b-switch  size="is-small" v-model="data.hasConifer">
                {{ coniferStr }}
              </b-switch>
            </div>
          </div>
        </div>
      </tab-content>
      <tab-content title="Coordonnées" :before-change="checkContactComplete">
        <b-field grouped group-multiline>
          <b-field label="Votre prénom" expanded>
            <b-input expanded id="first-name" ref="firstFieldInTab4"
                     v-model="data.firstName" autocomplete="given-name"
                     @keyup.native.enter="giveFocusToField('surname')"></b-input>
          </b-field>
          <b-field label="Votre nom" expanded>
            <b-input expanded id="surname" ref="surname" v-model="data.surname"
                     autocomplete="family-name"
                     @keyup.native.enter="giveFocusToField('email')"></b-input>
          </b-field>
        </b-field>
        <b-field label="Votre adresse électronique" expanded>
          <b-input type="email" id="email" ref="email" placeholder="prenom.nom@example.org"
                   autocomplete="email" v-model="data.email"
                   @keyup.native.enter="giveFocusToField('school')"></b-input>
        </b-field>
        <b-field label="Établissement (si scolaire)" expanded>
          <b-input ref="school" autocomplete="organization" v-model="data.school"></b-input>
        </b-field>
      </tab-content>
    </form-wizard>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const MONTH_NAMES = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août',
  'Septembre', 'Octobre', 'Novembre', 'Décembre']
const DAY_NAMES = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.']

export default {
  name: 'ContributeForm',
  data () {
    return {
      monthNames: MONTH_NAMES,
      dayNames: DAY_NAMES,
      data: {}
    }
  },
  computed: {
    deadTreesStr () {
      return this.data.hasDeadTrees ? 'Arbres morts au sol' : "Pas d'arbre mort au sol"
    },
    coniferStr () {
      return this.data.hasConifer ? 'Présence de conifères' : 'Pas de conifère'
    },
    ...mapGetters([
      'dominantSpecies',
      'habitats',
      'nestingIndices',
      'woodpeckers'
    ]),
    ...mapGetters('contribution', [
      'contribution',
      'eWkt'
    ])
  },
  methods: {
    checkContactComplete () {
      return (this.data.firstName !== '' && this.data.firstName !== null &&
        this.data.surname !== '' && this.data.surname !== null &&
        this.data.email !== '' && this.data.email !== null)
    },
    checkDateNotNull () {
      return this.data.observationDate !== null
    },
    checkHabitatComplete () {
      if (this.data.habitat === null) {
        return false
      }
      if (this.data.habitat === 'Forêt' && this.data.dominant === null) {
        return false
      }
      if (this.data.dominant === 'Conifères' && this.data.hasConifer === false) {
        return false
      }
      return true
    },
    checkIndexNotNull () {
      return this.data.nestingIndex !== null
    },
    checkWoodpeckerNotNull () {
      return this.data.woodpeckerId !== null
    },
    giveFocusToField (ref) {
      var field = this.$refs[ref]
      if (field && field.hasOwnProperty('focus')) {
        field.focus()
      }
    },
    giveFocusToFirstField (tabIndex) {
      var firstField = this.$refs[`firstFieldInTab${tabIndex}`]
      if (firstField && firstField.hasOwnProperty('focus')) {
        firstField.focus()
      }
    },
    habitatChanged () {
      if (this.data.habitat !== 'Forêt') {
        this.$refs.wizard.nextTab()
      }
    },
    handleStepChange (prevIndex, nextIndex) {
      this.giveFocusToFirstField(nextIndex)
    },
    nextTab () {
      this.$refs.wizard.nextTab()
    },
    async submitForm () {
      try {
        await this.$post('api/observation', Object.assign({}, this.contribution, { eWkt: this.eWkt }))
        this.$toast.open({
          duration: 5000,
          message: 'Votre observation a bien été enregistrée. Merci !',
          type: 'is-success'
        })
      } catch (e) {
        console.log(e)
        this.$toast.open({
          duration: 5000,
          message: "Une erreur s'est produite. Veuillez contacter un administrateur.",
          type: 'is-danger'
        })
      }
      this.$emit('form-complete')
    },
    updateContribution () {
      var data = Object.assign({}, this.data)
      var observationDate = data.observationDate
      data.observationDate = `${observationDate.getFullYear()}-${observationDate.getMonth() + 1}-${observationDate.getDate()}`
      if (data.habitat !== 'Forêt') {
        data.dominant = null
        data.hasDeadTrees = null
        data.hasConifer = null
      }
      this.setContribution(data)
    },
    ...mapActions('contribution', [
      'setContribution'
    ])
  },
  watch: {
    data: {
      handler (val, oldVal) {
        if (val.dominant === 'Conifères') {
          this.data.hasConifer = true
        }
        this.updateContribution()
      },
      deep: true
    }
  },
  created () {
    if (this.contribution) {
      this.data = Object.assign({}, this.contribution,
        { observationDate: new Date(this.contribution.observationDate) })
    } else {
      this.$set(this.data, 'observationDate', new Date())
      this.$set(this.data, 'woodpeckerId', null)
      this.$set(this.data, 'nestingIndex', null)
      this.$set(this.data, 'habitat', null)
      this.$set(this.data, 'dominant', null)
      this.$set(this.data, 'hasDeadTrees', false)
      this.$set(this.data, 'hasConifer', false)
      this.$set(this.data, 'firstName', '')
      this.$set(this.data, 'surname', '')
      this.$set(this.data, 'email', '')
      this.$set(this.data, 'school', '')
    }
  }
}
</script>

<style>
@media screen and (max-width: 767px) {
  #contribute-form .vue-form-wizard .wizard-nav > li,
  .wizard-progress-with-circle {
    display: none
  }
  #contribute-form .vue-form-wizard .wizard-nav > li.active {
    display: block
  }
}
</style>
