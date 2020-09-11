<template>
  <div class="page-container">
    <nuxt-link :to="playgroundLink">
      <slot>
        <button v-t="'miscellaneous.playground'" class="playground-button" />
      </slot>
    </nuxt-link>
    <div class="enable">
      <button
        v-t="'miscellaneous.enable_eth'"
        class="enable-button"
        @click="getAccount()"
      />
    </div>
    <BCTracks v-if="web3" :data="web3" />
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
      playgroundLink: '/playground/playground',
    }
  },
  computed: {
    ...mapState('tracks', ['web3']),
  },
  // mounted() {
  //   this.getContractInstance!()
  //   // Todo: virer
  // },
  methods: {
    ...mapActions('tracks', ['getAccount', 'getContractInstance']),
  },
  head() {
    return {
      title: this.$t('pages.default.title') as string,
    }
  },
})
</script>

<style lang="scss" scoped>
.playground-button,
.enable-button {
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
.enable {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
