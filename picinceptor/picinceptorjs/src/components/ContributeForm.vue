<template>
  <form id="contribute-form" method="POST" accept-charset="UTF-8" v-on:submit.prevent>
    <form-wizard ref="wizard" title="Pics des Pyrénées" subtitle="Nouvelle observation"
                 step-size="xs" next-button-text="Suivant" back-button-text="Retour"
                 finish-button-text="Terminer" @on-change="handleStepChange"
                 @on-complete="submitForm">
      <tab-content title="Date" :before-change="checkDateNotNull">
        <div class="columns is-mobile is-centered">
          <div class="column is-narrow has-text-centered">
            <b-field>
              <b-datepicker inline size="is-small" v-model="observationDate"
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
            <b-radio href="#" size="is-small" v-model="woodpeckerId"
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
            <b-radio href="#" size="is-small" v-model="nestingIndex"
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
                        size="is-small" expanded v-model="habitat" @input="habitatChanged">
                <option v-for="hab in habitats" :value="hab" :key="hab">
                    {{ hab }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-one-third is-narrow" v-if="habitat === 'Forêt'">
            <b-field label="Espèce dominante">
              <b-select placeholder="Sélectionnez une espèce d'arbre" icon="view-list"
                        size="is-small" expanded v-model="dominant">
                <option v-for="treeType in dominantSpecies" :value="treeType" :key="treeType">
                    {{ treeType }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column is-one-third is-narrow" v-if="habitat === 'Forêt'">
            <div class="field">
              <b-switch  size="is-small" v-model="hasDeadTrees">
                {{ deadTreesStr }}
              </b-switch>
            </div>
            <div class="field">
              <b-switch  size="is-small" v-model="hasConifer">
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
                     v-model="firstName" autocomplete="given-name"
                     @keyup.native.enter="giveFocusToField('surname')"></b-input>
          </b-field>
          <b-field label="Votre nom" expanded>
            <b-input expanded id="surname" ref="surname" v-model="surname"
                     autocomplete="family-name"
                     @keyup.native.enter="giveFocusToField('email')"></b-input>
          </b-field>
        </b-field>
        <b-field label="Votre adresse électronique" expanded>
          <b-input type="email" id="email" ref="email" placeholder="prenom.nom@example.org"
                   autocomplete="email" v-model="email"
                   @keyup.native.enter="giveFocusToField('school')"></b-input>
        </b-field>
        <b-field label="Établissement (si scolaire)" expanded>
          <b-input ref="school" autocomplete="organization" v-model="school"></b-input>
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
      woodpeckers: [
        {
          id: 3608,
          name: 'Pic noir',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 3611,
          name: 'Pic épeiche',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 3619,
          name: 'Pic mar',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 3630,
          name: 'Pic épeichette',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 3603,
          name: 'Pic vert',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 3595,
          name: 'Torcol fourmilier',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 3605,
          name: 'Pic de Sharpe',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 3625,
          name: 'Pic à dos blanc',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        }
      ],
      nestingIndices: [
        {
          id: '00',
          name: 'Absence de réponse à la repasse'
        },
        {
          id: '01',
          name: 'Oiseau retrouvé mort, écrasé'
        },
        {
          id: '02',
          name: 'Oiseau vu en période de nidification (février à juillet) dans un milieu favorable'
        },
        {
          id: '03',
          name: 'Mâle chanteur (et/ou cris nuptiaux et/ou tambourinage) présent en période de nidification dans un milieu favorable'
        },
        {
          id: '04',
          name: 'Couple présent en période de reproduction dans un milieu favorable'
        },
        {
          id: '05',
          name: 'Comportement territorial (chant, querelles avec des voisins, etc.) observé sur un même site à au moins une semaine d\'intervalle. Observation simultanée de deux mâles chanteurs ou plus sur un même site'
        },
        {
          id: '06',
          name: 'Parades, accouplement ou échange de nourriture entre adultes'
        },
        {
          id: '07',
          name: 'Cri d\'alarme ou tout autre comportement agité indiquant la proximité d\'un nid ou de jeunes'
        },
        {
          id: '09',
          name: 'Transport de matériel ou construction d\'un nid ; forage d\'une cavité'
        },
        {
          id: '11',
          name: 'Nid vide ayant été utilisé ou contenant des coquilles d’œufs'
        },
        {
          id: '12',
          name: 'Jeunes en duvet ou jeunes venant de quitter le nid et incapables de soutenir le vol sur de longues distances'
        },
        {
          id: '13',
          name: 'Adulte gagnant, occupant ou quittant le site d\'un nid ; comportement révélateur d\'un nid occupé dont le contenu ne peut être vérifié (trop haut ou dans une cavité)'
        },
        {
          id: '14',
          name: 'Adulte transportant de la nourriture pour les jeunes'
        },
        {
          id: '15',
          name: 'Adulte couvant'
        },
        {
          id: '16',
          name: 'Nid avec des œufs ou des jeunes (vus ou entendus)'
        },
        {
          id: '17',
          name: 'Oiseau vu hors période de nidification, août à janvier'
        }
      ],
      habitats: [
        'Bosquet',
        'Haie',
        'Forêt'
      ],
      dominantSpecies: [
        'Hêtre',
        'Chêne',
        'Conifères'
      ],
      observationDate: new Date(),
      woodpeckerId: null,
      nestingIndex: null,
      habitat: null,
      dominant: null,
      hasDeadTrees: false,
      hasConifer: false,
      firstName: '',
      surname: '',
      email: '',
      school: ''
    }
  },
  computed: {
    deadTreesStr () {
      return this.hasDeadTrees ? 'Arbres morts au sol' : "Pas d'arbre mort au sol"
    },
    coniferStr () {
      return this.hasConifer ? 'Présence de conifères' : 'Pas de conifère'
    },
    ...mapGetters('contribution', [
      'contribution'
    ])
  },
  methods: {
    checkContactComplete () {
      return (this.firstName !== '' && this.firstName !== null &&
        this.surname !== '' && this.surname !== null &&
        this.email !== '' && this.email !== null)
    },
    checkDateNotNull () {
      return this.observationDate !== null
    },
    checkHabitatComplete () {
      if (this.habitat === null) {
        return false
      }
      if (this.habitat === 'Forêt' && this.dominant === null) {
        return false
      }
      return true
    },
    checkIndexNotNull () {
      return this.nestingIndex !== null
    },
    checkWoodpeckerNotNull () {
      return this.woodpeckerId !== null
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
      if (this.habitat !== 'Forêt') {
        this.$refs.wizard.nextTab()
      }
    },
    handleStepChange (prevIndex, nextIndex) {
      this.updateContribution()
      this.giveFocusToFirstField(nextIndex)
    },
    nextTab () {
      this.$refs.wizard.nextTab()
    },
    async submitForm () {
      var contribution = {
        observationDate: this.observationDate,
        woodpeckerId: this.woodpeckerId,
        nestingIndex: this.nestingIndex,
        habitat: this.habitat,
        dominant: this.dominant,
        hasDeadTrees: this.hasDeadTrees,
        hasConifer: this.hasConifer,
        firstName: this.firstName,
        surname: this.surname,
        email: this.email,
        school: this.school
      }
      try {
        await this.$post('observation', contribution)
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
      var contribution = {
        observationDate: this.observationDate,
        woodpeckerId: this.woodpeckerId,
        nestingIndex: this.nestingIndex,
        habitat: this.habitat,
        dominant: this.dominant,
        hasDeadTrees: this.hasDeadTrees,
        hasConifer: this.hasConifer,
        firstName: this.firstName,
        surname: this.surname,
        email: this.email,
        school: this.school
      }
      this.setContribution(contribution)
    },
    ...mapActions('contribution', [
      'setContribution'
    ])
  },
  created () {
    if (this.contribution) {
      this.observationDate = this.contribution.observationDate
      this.woodpeckerId = this.contribution.woodpeckerId
      this.nestingIndex = this.contribution.nestingIndex
      this.habitat = this.contribution.habitat
      this.dominant = this.contribution.dominant
      this.hasDeadTrees = this.contribution.hasDeadTrees
      this.hasConifer = this.contribution.hasConifer
      this.firstName = this.contribution.firstName
      this.surname = this.contribution.surname
      this.email = this.contribution.email
      this.school = this.contribution.school
    }
  }
}
</script>
