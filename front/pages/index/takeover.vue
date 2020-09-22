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
          <input v-model="bundleaddressdelivery" type="string" />
        </div>
      </div>
      <div v-if="hasBundleAvailable" class="bloc bloc-bundle">
        <div>
          <span v-t="'pages.index.takeover.name'" />
          {{ bundle[6] }}
        </div>
        <div>
          <span v-t="'pages.index.takeover.status'" />
          {{ bundle[9] }}
        </div>
        <div>
          <span v-t="'pages.index.takeover.certification'" />
          {{ bundle[10] }}
        </div>
      </div>
      <div v-else class="no-bundle">{{ noBundle }}</div>
    </div>
    <button
      v-t="'pages.index.takeover.submit_takeover_bundle'"
      :disabled="hasBundleAvailable"
      class="submit-button"
      :class="{ clickable: !hasBundleAvailable }"
      @click="submitTakeover()"
    />
    <button
      v-t="'pages.index.takeover.delivery_takeover_bundle'"
      :disabled="hasBundleAvailable"
      class="delivery-button"
      :class="{ clickable: !hasBundleAvailable }"
      @click="deliveryTakeover()"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { D, M, C, P } from '~/pages/index/takeover.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  props: {},
  data() {
    return {
      bundleId: 0,
      addressDelivery: '',
    }
  },
  computed: {
    ...mapState('tracks', ['web3', 'contractInstance']),
    hasBundleSubmit() {
      if (
        this.bundle &&
        this.bundle.length === 11 &&
        this.bundle[6] !== '' &&
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
        (this.bundle[9] === 'In Process' ||
          this.bundle[9] === 'Sent' ||
          this.bundle[9] === 'Bundle Recall') &&
        this.bundle[3] !== '0x0000000000000000000000000000000000000000'
      ) {
        return true
      }
      return false
    },
  },
  methods: {
    ...mapActions('tracks', ['getContractInstance']),
    async submitBundle() {
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
                this.$notify(successMsg, '', 'success', 5_000)
                this.getContractInstance!()
              }
            }
          )
        }
      } catch (e) {
        const errorMsg = this.$t('miscellaneous.error') as string
        this.$notify(errorMsg, e, 'error', 5_000)
      }
    },
    async DeliveryBundle() {
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
                this.$notify(successMsg, '', 'success', 5_000)
                this.getContractInstance!()
              }
            }
          )
        }
      } catch (e) {
        const errorMsg = this.$t('miscellaneous.error') as string
        this.$notify(errorMsg, e, 'error', 5_000)
      }
    },
  },
})
</script>

<style lang="scss" scoped></style>
