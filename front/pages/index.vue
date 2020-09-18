<template>
  <div class="page-container">
    <div class="enable">
      <button
        v-if="connection.status === 'disconnected'"
        v-t="'miscellaneous.enable_eth'"
        class="enable-button"
        @click="getAccount()"
      />
      <button
        v-t="'miscellaneous.contract'"
        class="enable-button"
        @click="contract()"
      />
    </div>
    <div v-t="`pages.default.${connection.status}`" :class="connection.class" />
    <BCTracks v-if="web3 && connection.status === 'connected'" :data="web3" />
    <div class="route">
      <div class="links">
        <nuxt-link v-t="'pages.default.links.add_bundle'" :to="'/add'" />
        <nuxt-link v-t="'pages.default.links.buy_bundle'" :to="'/buy'" />
        <nuxt-link
          v-t="'pages.default.links.certify_bundle'"
          :to="'/certify'"
        />
        <nuxt-link v-t="'pages.default.links.takeover'" :to="'/takeover'" />
      </div>
      <div class="route-content">
        <nuxt-child />
      </div>
    </div>
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
    return {}
  },
  computed: {
    ...mapState('tracks', ['web3', 'contractInstance']),
    connection() {
      if (this.web3!.coinbase) {
        return { status: 'connected', class: 'connected' }
      } else {
        return { status: 'disconnected', class: 'disconnected' }
      }
    },
  },
  mounted() {
    this.getContractInstance!()
  },
  methods: {
    ...mapActions('tracks', ['getAccount', 'getContractInstance']),
    contract() {
      try {
        console.log(this.contractInstance())
      } catch {}
    },
  },
  head() {
    return {
      title: this.$t('pages.default.title') as string,
    }
  },
})
</script>

<style lang="scss" scoped>
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
.disconnected,
.connected {
  margin-bottom: 10px;
  font-size: 18px;
}

.disconnected {
  color: $red;
}
.connected {
  color: $green;
}
.route {
  background-color: $background-color;
  .links {
    margin-top: 50px;
    display: flex;
    height: 50px;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      text-decoration: none;
      color: $grey;
      padding: 0 48px;
      box-sizing: content-box;
      border-top: 3px solid $background-color;
      border-bottom: 3px solid $background-color;
      white-space: nowrap;
      &.nuxt-link-exact-active,
      &:hover {
        color: $black;
        text-shadow: 0 0 0.65px $black;
        border-bottom: 3px solid $red;
      }
    }
  }
  .route-content {
    position: relative;
    overflow: hidden;
    z-index: 0;
    margin-bottom: 15px;
  }
}
</style>
