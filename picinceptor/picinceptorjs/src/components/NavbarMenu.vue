<template>
  <div class="navbar-menu" :class="{ 'is-active': menuActive }">
    <div class="navbar-end">
      <a href="#" class="navbar-item" @click="clickHelp">
        <b-icon icon="help"></b-icon>&nbsp;Aide
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'NavbarMenu',
  props: ['menuActive'],
  methods: {
    clickHelp (ev) {
      this.$emit('menu-click')
      this.toggleHelp()
    },
    ...mapActions([
      'toggleHelp'
    ])
  }
}
</script>
