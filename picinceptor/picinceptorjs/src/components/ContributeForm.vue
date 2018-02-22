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
        <div class="columns is-multiline is-centered">
          <div class="column is-one-third has-text-centered" v-for="woodpecker in woodpeckers"
            :item="woodpecker" :key="woodpecker.id">
            <b-radio href="#" size="is-small" v-model="woodpeckerId"
                     :native-value="woodpecker.id">
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
      <tab-content title="Indice de nidification">
        <div class="columns is-centered">
          <div class="column is-narrow">
            <b-field>
              <b-select placeholder="Sélectionnez un indice" icon="view-list" size="is-small"
                        expanded v-model="nestingIndex">
                <option v-for="index in nestingIndices"
                        :value="index.id"
                        :key="index.id">
                    {{ index.name }}
                </option>
              </b-select>
            </b-field>
          </div>
        </div>
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
      woodpeckers: [
        {
          id: 1,
          name: 'Pic noir',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 2,
          name: 'Pic épeiche',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 3,
          name: 'Pic mar',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 4,
          name: 'Pic épeichette',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 5,
          name: 'Pic vert',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 6,
          name: 'Torcol fourmilier',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 7,
          name: 'Pic de Sharpe',
          img: 'https://openclipart.org/image/64px/svg_to_png/170814/yaffle.png'
        },
        {
          id: 8,
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
      observationDate: new Date(),
      woodpeckerId: null,
      nestingIndex: null
    }
  },
  methods: {
    submitForm () {
      this.$emit('form-complete')
    }
  }
}
</script>
