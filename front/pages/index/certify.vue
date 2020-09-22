<template>
  <div class="child-page">
    <h1 v-t="'pages.index.certify.title'" />
    <div class="bloc-container">
      <div class="bloc">
        <div v-t="'pages.index.certify.bundleId'" />
        <div>
          <input v-model="bundleId" type="number" />
        </div>
      </div>
      <BundleElement
        v-if="hasBundleAvailable"
        :bundle-id="bundleId"
        :bundle-data="bundle"
      />
      <div v-else class="no-bundle">{{ noBundle }}</div>
    </div>
    <button
      v-t="'pages.index.certify.certify_bundle'"
      :disabled="!hasBundleAvailable || isCertified || isUnsalable"
      class="certify-button"
      :class="{ clickable: hasBundleAvailable && !isCertified && !isUnsalable }"
      @click="setBundleCertified()"
    />
    <button
      v-t="'pages.index.certify.unsable_bundle'"
      :disabled="!hasBundleAvailable || isUnsalable"
      class="unsalable-button"
      :class="{ clickable: hasBundleAvailable && !isUnsalable }"
      @click="setBundleUnsalable()"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import BundleElement from '~/components/BundleElement.vue'
import { D, M, C, P } from '~/pages/index/certify.types'

export default Vue.extend<D, M, C, P>({
  components: {
    BundleElement,
  },
  props: {},
  data() {
    return {
      bundleId: 0,
      bundle: undefined,
    }
  },
  computed: {
    ...mapState('tracks', ['web3', 'contractInstance']),
    hasBundleAvailable() {
      if (this.bundle && this.bundle.length === 11 && this.bundle[6] !== '') {
        return true
      }
      return false
    },
    isCertified() {
      if (
        this.bundle &&
        this.bundle.length === 11 &&
        this.bundle[10] === 'Certified'
      ) {
        return true
      }
      return false
    },
    isUnsalable() {
      if (
        this.bundle &&
        this.bundle.length === 11 &&
        this.bundle[10] === 'Unsalable'
      ) {
        return true
      }
      return false
    },
    noBundle() {
      return this.$t('pages.index.certify.no_bundle') as string
    },
  },
  watch: {
    bundleId(newVal: number) {
      if (newVal > 0) {
        this.getBundle()
      } else if (newVal <= 0) {
        this.bundle = undefined
      }
    },
  },
  methods: {
    async getBundle() {
      try {
        await this.contractInstance().bundles.call(
          this.bundleId,
          (err, result) => {
            if (err) {
              const errorMsg = this.$t('miscellaneous.error') as string
              this.$notify(errorMsg, err.message, 'error', 5_000)
            } else {
              this.bundle = result
            }
          }
        )
      } catch (e) {
        const errorMsg = this.$t('miscellaneous.error') as string
        this.$notify(errorMsg, e, 'error', 5_000)
      }
    },
    async setBundleCertified() {
      try {
        await this.contractInstance().Change_BundleState(
          this.bundle[0],
          this.bundle[4].c[0],
          'Certified',
          {
            gas: 300000,
            from: this.web3!.coinbase,
          },
          (err, result) => {
            if (err) {
              const errorMsg = this.$t('miscellaneous.error') as string
              this.$notify(errorMsg, err.message, 'error', 5_000)
            } else {
              const msg = this.$t(
                'pages.index.certify.changing_state_in_process'
              ) as string
              this.$notify(msg, '', 'info', 2_000)
            }
          }
        )
      } catch (e) {
        const errorMsg = this.$t('miscellaneous.error') as string
        this.$notify(errorMsg, e, 'error', 5_000)
      }
    },
    async setBundleUnsalable() {
      try {
        await this.contractInstance().Change_BundleState(
          this.bundle[0],
          this.bundle[4].c[0],
          'Unsalable',
          {
            gas: 300000,
            from: this.web3!.coinbase,
          },
          (err, result) => {
            if (err) {
              const errorMsg = this.$t('miscellaneous.error') as string
              this.$notify(errorMsg, err.message, 'error', 5_000)
            } else {
              const msg = this.$t(
                'pages.index.certify.changing_state_in_process'
              ) as string
              this.$notify(msg, '', 'info', 2_000)
            }
          }
        )
      } catch (e) {
        const errorMsg = this.$t('miscellaneous.error') as string
        this.$notify(errorMsg, e, 'error', 5_000)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.child-page {
  .bloc-container {
    display: flex;
    margin-bottom: 15px;
    height: 200px;
    .bloc {
      width: 25%;
      margin-bottom: 10px;
      margin-right: 300px;
    }
    .bloc-bundle {
      border: solid;
      border-radius: 30px;
      text-align: center;
    }
    .no-bundle {
      align-self: center;
      font-size: 18px;
    }
  }
  .certify-button,
  .unsalable-button {
    width: 150px;
    height: 35px;
    background-color: $grey;
    color: $white;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    opacity: 0.5;
    cursor: not-allowed;
    &.clickable {
      background-color: $red;
      opacity: 0.7;
      cursor: pointer;
    }
  }
}
</style>
