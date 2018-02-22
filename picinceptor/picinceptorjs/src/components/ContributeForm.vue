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
      observationDate: new Date(),
      woodpeckerId: null
    }
  },
  methods: {
    submitForm () {
      this.$emit('form-complete')
    }
  }
}
</script>
