<template>
  <div class="child-page">
    <h1 v-t="'pages.index.add.title'" />
    <div class="bloc">
      <div v-t="'pages.index.add.bundleId'" />
      <div>
        <input v-model="data.bundleId" type="number" />
      </div>
    </div>
    <div class="bloc">
      <div v-t="'pages.index.add.bundleNumber'" />
      <div>
        <input v-model="data.bundleNumber" type="number" />
      </div>
    </div>
    <div class="bloc">
      <div v-t="'pages.index.add.productName'" />
      <div>
        <input v-model="data.productName" type="text" />
      </div>
    </div>
    <div class="bloc">
      <div v-t="'pages.index.add.productNumber'" />
      <div>
        <input v-model="data.productNumber" type="number" />
      </div>
    </div>
    <button
      v-t="'pages.index.add.add_bundle'"
      class="add-button"
      @click="addBundle()"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { D, M, C, P } from '~/pages/index/add.types'

export default Vue.extend<D, M, C, P>({
  components: {},
  props: {},
  data() {
    return {
      data: {
        bundleId: 0,
        bundleNumber: 0,
        productName: '',
        productNumber: 0,
      },
    }
  },
  computed: {
    ...mapState('tracks', ['web3', 'contractInstance']),
  },
  methods: {
    async addBundle() {
      try {
        if (this.web3!.coinbase) {
          await this.contractInstance().Add_Bundle(
            this.data.bundleId,
            this.data.bundleNumber,
            this.data.productName,
            this.data.productNumber,
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
                  'pages.index.add.add_success'
                ) as string
                this.$notify(successMsg, '', 'success', 5_000)
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

<style lang="scss" scoped>
.child-page {
  .bloc {
    margin-bottom: 10px;
  }
  .add-button {
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
}
</style>
