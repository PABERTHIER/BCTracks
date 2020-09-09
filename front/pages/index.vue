<template>
  <div class="page-container">
    <nuxt-link :to="playgroundLink">
      <slot>
        <button v-t="'miscellaneous.playground'" class="playground-button" />
      </slot>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { D, M, C, P } from '~/pages/index.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  data() {
    return {
      playgroundLink: '/playground/playground',
    }
  },
  computed: {},
  methods: {},
  head() {
    return {
      title: this.$t('pages.default.title') as string,
    }
  },
})
</script>

<style lang="scss" scoped>
.playground-button {
  width: 150px;
  height: 35px;
  background-color: $red;
  color: $white;
  border-radius: 5px;
  border: none;
  font-size: 15px;
  opacity: 0.7;
  cursor: pointer;
}
</style>
