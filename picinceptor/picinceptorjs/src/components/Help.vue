<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Comment utiliser la carte ?</p>
    </header>
    <section class="modal-card-body">
      <div class="content">
        <h2 class="title is-5">Ajouter une observation</h2>
        <p>Pour saisir une nouvelle observation, il suffit de cliquer sur
        le bouton <b-icon icon="map-marker"></b-icon> puis de placer le jalon à
        l'endroit où vous avez observé un pic.</p>
        <p>Un assistant vous guidera alors dans la saisie des détails de votre
        observation.</p>
        <h2 class="title is-5">Voir les observations</h2>
        <p>Sur la carte apparaissent les observations <em>déjà saisies</em> sous forme de
        points.</p>
        <p>Cliquez sur un point pour voir les détails.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Help'
}
</script>
