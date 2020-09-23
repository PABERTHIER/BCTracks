<template>
  <div class="child-page">
    <h1 v-t="'pages.index.takeover.title'" />
    <div class="bloc-container">
      <div class="bloc">
        <div v-t="'pages.index.takeover.bundleId'" />
        <div>
          <input v-model="bundleId" type="number" />
        </div>
        <div v-t="'pages.index.takeover.addressdelivery'" />
        <div>
          <input v-model="addressDelivery" type="string" />
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
      v-t="'pages.index.takeover.submit_takeover_bundle'"
      :disabled="!hasBundleSubmit"
      class="submit-button"
      :class="{ clickable: hasBundleSubmit }"
      @click="submitTakeover()"
    />
    <button
      v-t="'pages.index.takeover.delivery_takeover_bundle'"
      :disabled="!hasBundleDelivery"
      class="delivery-button"
      :class="{ clickable: hasBundleDelivery }"
      @click="deliveryTakeover()"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import BundleElement from '~/components/BundleElement.vue'
import { D, M, C, P } from '~/pages/index/takeover.types'

export default Vue.extend<D, M, C, P>({
  components: {
    BundleElement,
  },
  props: {},
  data() {
    return {
      bundleId: 0,
      bundle: undefined,
      addressDelivery: '',
    }
  },
  computed: {
    ...mapState('tracks', ['web3', 'contractInstance']),
    hasBundleAvailable() {
      if (
        this.bundle &&
        this.bundle.length === 11 &&
        this.bundle[6] !== '' &&
        (this.bundle[9] === 'In Process' ||
          this.bundle[9] === 'Issued' ||
          this.bundle[9] === 'Sent' ||
          this.bundle[9] === 'Bundle Recall')
      ) {
        return true
      }
      return false
    },
    hasBundleSubmit() {
      if (
        this.bundle &&
        this.bundle.length === 11 &&
        this.bundle[6] !== '' &&
        this.addressDelivery !== '' &&
        (this.bundle[9] === 'In Process' ||
          this.bundle[9] === 'Issued' ||
          this.bundle[9] === 'Bundle Recall')
      ) {
        return true
      }
      return false
    },
    hasBundleDelivery() {
      if (
        this.bundle &&
        this.bundle.length === 11 &&
        this.bundle[6] !== '' &&
        this.bundle[2] === this.web3!.coinbase &&
        (this.bundle[9] === 'In Process' ||
          this.bundle[9] === 'Sent' ||
          this.bundle[9] === 'Bundle Recall') &&
        this.addressDelivery === ''
      ) {
        return true
      }
      return false
    },
    noBundle() {
      return this.$t('miscellaneous.no_bundle') as string
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
    ...mapActions('tracks', ['getContractInstance']),
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
    async submitTakeover() {
      try {
        if (this.web3!.coinbase) {
          await this.contractInstance().Submit_takeOver_Bundle(
            this.bundleId,
            this.addressDelivery,
            {
              gas: 300000,
              from: this.web3!.coinbase,
            },
            (err, result) => {
              if (err) {
                const errorMsg = this.$t('miscellaneous.error') as string
                this.$notify(errorMsg, err.message, 'error', 5_000)
              } else {
                const successMsg = this.$t(
                  'pages.index.takeover.submit_success'
                ) as string
                this.$notify(successMsg, '', 'info', 5_000)
                this.getContractInstance!()
              }
            }
          )
        } else {
          const msg = this.$t('miscellaneous.sould_be_connected') as string
          this.$notify(msg, '', 'info', 5_000)
        }
      } catch (e) {
        const errorMsg = this.$t('miscellaneous.error') as string
        this.$notify(errorMsg, e, 'error', 5_000)
      }
    },
    async deliveryTakeover() {
      try {
        if (this.web3!.coinbase) {
          await this.contractInstance().Delivery_takeOver_Bundle(
            this.bundleId,
            {
              gas: 300000,
              from: this.web3!.coinbase,
            },
            (err, result) => {
              if (err) {
                const errorMsg = this.$t('miscellaneous.error') as string
                this.$notify(errorMsg, err.message, 'error', 5_000)
              } else {
                const successMsg = this.$t(
                  'pages.index.takeover.delivery_success'
                ) as string
                this.$notify(successMsg, '', 'info', 5_000)
                this.getContractInstance!()
              }
            }
          )
        } else {
          const msg = this.$t('miscellaneous.sould_be_connected') as string
          this.$notify(msg, '', 'info', 5_000)
        }
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
  .delivery-button {
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
  .submit-button {
    width: 200px;
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
