<template>
  <div class="page-container">
    <nuxt-link :to="playgroundLink">
      <slot>
        <button v-t="'miscellaneous.playground'" class="playground-button" />
      </slot>
    </nuxt-link>
    <div>
      <h3 v-t="'pages.default.write_address'" />
      <input v-model="address" type="text" />
    </div>
    <BCTracks v-if="web3 && address" :data="web3" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import BCTracks from '~/components/BCTracks.vue'
import { D, M, C, P } from '~/pages/index.types'

export default Vue.extend<D, M, C, P>({
  components: {
    BCTracks,
  },
  data() {
    return {
      address: '',
      playgroundLink: '/playground/playground',
    }
  },
  computed: {
    ...mapState('tracks', ['web3']),
  },
  watch: {
    address(newVal: string) {
      if (newVal !== '') {
        this.registerWeb3!(this.address)
      }
    },
  },
  methods: {
    ...mapActions('tracks', ['registerWeb3']),
  },
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
