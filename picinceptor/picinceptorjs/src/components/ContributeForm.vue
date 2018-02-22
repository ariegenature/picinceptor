<template>
  <form id="contribute-form" method="POST" accept-charset="UTF-8" v-on:submit.prevent>
    <form-wizard ref="wizard" title="Pics des Pyrénées" subtitle="Nouvelle observation"
                 step-size="xs" next-button-text="Suivant" back-button-text="Retour"
                 finish-button-text="Terminer">
      <tab-content title="Date">
        <p>Choix de la date.</p>
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
export default {
  name: 'ContributeForm'
}
</script>
