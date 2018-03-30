<template>
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="https://openclipart.org/image/64px/svg_to_png/235000/Birds-Silhouettes-Woodpecker.png"
           alt="Logo enquête" height="64">
      <div style="margin-left: 1rem;">
        <h1 class="title is-5">Étude participative</h1>
        <h2 class="subtitle is-7">Pics des Pyrénées</h2>
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
