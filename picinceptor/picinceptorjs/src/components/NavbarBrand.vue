<template>
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="static/silhouette-woodpecker.png"
           alt="Logo enquête" height="64">
      <div style="margin-left: .5rem;">
        <h1 class="title is-5">Pics des Pyrénées</h1>
        <h2 class="subtitle is-7">Étude participative</h2>
      </div>
    </a>
    <div class="button navbar-burger" :class="{ 'is-active': menuActive }"
         @click="emitBurgerClick">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarBrand',
  props: ['menuActive'],
  methods: {
    emitBurgerClick (ev) {
      this.$emit('burger-click')
    }
  }
}
</script>
