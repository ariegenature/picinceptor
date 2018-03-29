import Vue from 'vue'
import Vuex from 'vuex'
import contribution from './contribution'
import map from './map'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      contributions: null,
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
          id: 0,
          name: 'Absence de réponse à la repasse'
        },
        {
          id: 1,
          name: 'Oiseau retrouvé mort, écrasé'
        },
        {
          id: 2,
          name: 'Oiseau vu en période de nidification (février à juillet) dans un milieu favorable'
        },
        {
          id: 3,
          name: 'Mâle chanteur (et/ou cris nuptiaux et/ou tambourinage) présent en période de nidification dans un milieu favorable'
        },
        {
          id: 4,
          name: 'Couple présent en période de reproduction dans un milieu favorable'
        },
        {
          id: 5,
          name: 'Comportement territorial (chant, querelles avec des voisins, etc.) observé sur un même site à au moins une semaine d\'intervalle. Observation simultanée de deux mâles chanteurs ou plus sur un même site'
        },
        {
          id: 6,
          name: 'Parades, accouplement ou échange de nourriture entre adultes'
        },
        {
          id: 7,
          name: 'Cri d\'alarme ou tout autre comportement agité indiquant la proximité d\'un nid ou de jeunes'
        },
        {
          id: 9,
          name: 'Transport de matériel ou construction d\'un nid ; forage d\'une cavité'
        },
        {
          id: 11,
          name: 'Nid vide ayant été utilisé ou contenant des coquilles d’œufs'
        },
        {
          id: 12,
          name: 'Jeunes en duvet ou jeunes venant de quitter le nid et incapables de soutenir le vol sur de longues distances'
        },
        {
          id: 13,
          name: 'Adulte gagnant, occupant ou quittant le site d\'un nid ; comportement révélateur d\'un nid occupé dont le contenu ne peut être vérifié (trop haut ou dans une cavité)'
        },
        {
          id: 14,
          name: 'Adulte transportant de la nourriture pour les jeunes'
        },
        {
          id: 15,
          name: 'Adulte couvant'
        },
        {
          id: 16,
          name: 'Nid avec des œufs ou des jeunes (vus ou entendus)'
        },
        {
          id: 17,
          name: 'Oiseau vu hors période de nidification, août à janvier'
        }
      ],
      woodpeckers: [
        {
          id: 3608,
          name: 'Pic noir',
          img: 'static/pic-noir.png',
          color: '#000000'
        },
        {
          id: 3611,
          name: 'Pic épeiche',
          img: 'static/pic-epeiche.png',
          color: '#ff0000'
        },
        {
          id: 3619,
          name: 'Pic mar',
          img: 'static/pic-mar.png',
          color: '#ffc0cb'
        },
        {
          id: 3630,
          name: 'Pic épeichette',
          img: 'static/pic-epeichette.png',
          color: '#ffffff'
        },
        {
          id: 3603,
          name: 'Pic vert',
          img: 'static/pic-vert.png',
          color: '#00ff00'
        },
        {
          id: 3595,
          name: 'Torcol fourmilier',
          img: 'static/torcol.png',
          color: '#a52a2a'
        },
        {
          id: 3605,
          name: 'Pic de Sharpe',
          img: 'static/pic-de-sharpe.png',
          color: '#ffff00'
        },
        {
          id: 3625,
          name: 'Pic à dos blanc',
          img: 'static/pic-a-dos-blanc.png',
          color: '#ee82ee'
        }
      ]
    }
  },
  getters: {
    contributions: (state) => state.contributions,
    dominantSpecies: (state) => state.dominantSpecies,
    habitats: (state) => state.habitats,
    nestingIndices: (state) => state.nestingIndices,
    woodpeckers: (state) => state.woodpeckers
  },
  mutations: {
    contributions: (state, contribs) => {
      state.contributions = contribs
    }
  },
  actions: {
    setContributions: ({ commit, state }, contribs) => {
      contribs.features.forEach((feature) => {
        feature.properties.observationDate = new Date(Date.parse(feature.properties.observationDate))
        var woodpecker = state.woodpeckers.find((woodpecker) => woodpecker.id === feature.properties.woodpeckerId)
        feature.properties.woodpeckerName = woodpecker.name
        feature.properties.woodpeckerImg = woodpecker.img
        feature.properties.color = woodpecker.color
        var breedingCode = state.nestingIndices.find((code) => code.id === feature.properties.breedingCode)
        feature.properties.breedingDesc = breedingCode.name
      })
      commit('contributions', contribs)
    }
  },
  modules: {
    contribution,
    map
  }
})
