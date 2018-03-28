import Vue from 'vue'
import Vuex from 'vuex'
import contribution from './contribution'
import map from './map'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      dominantSpecies: [
        'Hêtre',
        'Chêne',
        'Conifères'
      ],
      habitats: [
        'Bosquet',
        'Haie',
        'Forêt'
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
      ]
    }
  },
  getters: {
    dominantSpecies: (state) => state.dominantSpecies,
    habitats: (state) => state.habitats,
    nestingIndices: (state) => state.nestingIndices,
    woodpeckers: (state) => state.woodpeckers
  },
  modules: {
    contribution,
    map
  }
})
