<template>
  <div class="page-container">
    <div v-t="`pages.default.${connection.status}`" :class="connection.class" />
    <div v-if="connection.status === 'connected'" class="header">
      <h1 v-t="'pages.default.last_elements'" />
      <div class="reload">
        <icon name="reload" class="svg-icon" @click="reload()" />
      </div>
    </div>
    <LastElements
      :connection="connection.status"
      :number-of-elements="5"
      :total-bundle="totalBundle"
      :is-reloading="isReloading"
      @reloaded="reloaded"
    />
    <div class="route">
      <div class="links">
        <nuxt-link v-t="'pages.default.links.add_bundle'" :to="'/add'" />
        <nuxt-link v-t="'pages.default.links.buy_bundle'" :to="'/buy'" />
        <nuxt-link
          v-t="'pages.default.links.certify_bundle'"
          :to="'/certify'"
        />
        <nuxt-link v-t="'pages.default.links.remove_bundle'" :to="'/remove'" />
        <nuxt-link v-t="'pages.default.links.takeover'" :to="'/takeover'" />
      </div>
      <div class="route-content">
        <nuxt-child />
      </div>
    </div>
    <button
      v-t="'miscellaneous.contract'"
      class="enable-button"
      @click="contract()"
    />
    <div class="enable">
      <button
        v-if="connection.status === 'disconnected'"
        v-t="'miscellaneous.enable_eth'"
        class="enable-button"
        @click="getAccount()"
      />
    </div>
    <BCTracks v-if="web3 && connection.status === 'connected'" :data="web3" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import BCTracks from '~/components/BCTracks.vue'
import LastElements from '~/components/LastElements.vue'
import { D, M, C, P } from '~/pages/index.types'

export default Vue.extend<D, M, C, P>({
  components: {
    BCTracks,
    LastElements,
  },
  data() {
    return {
      totalBundle: 0,
      isConnected: false,
      isReloading: false,
    }
  },
  computed: {
    ...mapState('tracks', ['web3', 'contractInstance']),
    connection() {
      if (this.web3!.coinbase) {
        this.getTotalBundle()
        return { status: 'connected', class: 'connected' }
      } else {
        return { status: 'disconnected', class: 'disconnected' }
      }
    },
  },
  watch: {
    async contractInstance(newVal) {
      if (newVal) {
        await this.getTotalBundle()
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
    async getTotalBundle() {
      try {
        await this.contractInstance().total_bundleId.call((err, result) => {
          if (err) {
            const errorMsg = this.$t('miscellaneous.error') as string
            this.$notify(errorMsg, err.message, 'error', 5_000)
          } else {
            this.totalBundle = result.c[0]
          }
        })
      } catch (e) {
        const errorMsg = this.$t('miscellaneous.error') as string
        this.$notify(errorMsg, e, 'error', 5_000)
      }
    },
    reload() {
      this.isReloading = true
    },
    reloaded() {
      this.isReloading = false
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
.page-container {
  .header {
    position: relative;
    .reload {
      position: absolute;
      top: 0px;
      left: 475px;
      cursor: pointer;
    }
  }
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
}

.svg-icon {
  height: 32px;
  width: 32px;
}
</style>
